create extension if not exists pgcrypto;

create table if not exists resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null check (type in ('Research paper', 'Policy brief', 'Case study', 'Implementation guide', 'Dataset')),
  organization text not null,
  year integer not null,
  tag text not null,
  description text,
  url text,
  created_at timestamptz not null default now()
);

create table if not exists policy_experiments (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  location text not null,
  status text not null,
  owner text not null,
  progress integer not null default 0 check (progress between 0 and 100),
  focus text not null,
  created_at timestamptz not null default now()
);

create table if not exists workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists innovation_calls (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null,
  deadline date not null,
  applicants integer not null default 0,
  tone text not null default 'mint',
  created_at timestamptz not null default now()
);

create table if not exists saved_resources (
  user_id uuid references auth.users(id) on delete cascade,
  resource_id uuid references resources(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, resource_id)
);

alter table resources enable row level security;
alter table policy_experiments enable row level security;
alter table workspaces enable row level security;
alter table innovation_calls enable row level security;
alter table saved_resources enable row level security;

create policy "Public can read resources" on resources for select using (true);
create policy "Public can read experiments" on policy_experiments for select using (true);
create policy "Public can read innovation calls" on innovation_calls for select using (true);
create policy "Users can read their workspaces" on workspaces for select using (auth.uid() = created_by);
create policy "Users can create workspaces" on workspaces for insert with check (auth.uid() = created_by);
create policy "Users manage saved resources" on saved_resources for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

insert into resources (title, type, organization, year, tag, description)
select * from (values
  ('Climate resilient land use planning in coastal districts', 'Research paper', 'NIUA', 2025, 'Climate', 'A district-level framework for aligning land use, coastal buffers, and climate adaptation investments.'),
  ('National framework for urban land value capture', 'Policy brief', 'MoHUA', 2024, 'Policy', 'Evidence and implementation options for financing public infrastructure through land value capture.'),
  ('Bihar cadastral modernization: lessons from the field', 'Case study', 'World Bank', 2024, 'Reform', 'What worked, what stalled, and what local institutions need for sustainable cadastral reform.'),
  ('Land records and the last mile: a district playbook', 'Implementation guide', 'DoLR', 2023, 'Digital', 'A practical playbook for improving access, interoperability, and trust in digital land records.')
) as seed(title, type, organization, year, tag, description)
where not exists (select 1 from resources);
