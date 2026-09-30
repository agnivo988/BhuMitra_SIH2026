import { isSupabaseConfigured, supabase } from './supabase'

export const demoResources = [
  { id: 'demo-1', title: 'Climate resilient land use planning in coastal districts', type: 'Research paper', organization: 'NIUA', year: 2025, tag: 'Climate', tone: 'mint', description: 'A district-level framework for aligning land use, coastal buffers, and climate adaptation investments.' },
  { id: 'demo-2', title: 'National framework for urban land value capture', type: 'Policy brief', organization: 'MoHUA', year: 2024, tag: 'Policy', tone: 'ochre', description: 'Evidence and implementation options for financing public infrastructure through land value capture.' },
  { id: 'demo-3', title: 'Bihar cadastral modernization: lessons from the field', type: 'Case study', organization: 'World Bank', year: 2024, tag: 'Reform', tone: 'coral', description: 'What worked, what stalled, and what local institutions need for sustainable cadastral reform.' },
  { id: 'demo-4', title: 'Land records and the last mile: a district playbook', type: 'Implementation guide', organization: 'DoLR', year: 2023, tag: 'Digital', tone: 'blue', description: 'A practical playbook for improving access, interoperability, and trust in digital land records.' },
]

export const demoExperiments = [
  { id: 'exp-1', title: 'Coastal Resilience Zoning', location: 'Odisha · Kendrapara', status: 'Pilot', owner: 'NIUA', progress: 68, focus: 'Climate adaptation' },
  { id: 'exp-2', title: 'Digital Mutation Express', location: 'Maharashtra · Pune', status: 'Evaluating', owner: 'DoLR', progress: 42, focus: 'Service delivery' },
  { id: 'exp-3', title: 'Inclusive Land Value Capture', location: 'Karnataka · Bengaluru', status: 'Scoping', owner: 'IIM Bangalore', progress: 24, focus: 'Urban finance' },
]

export const demoCalls = [
  { id: 'call-1', title: 'Open call: climate-ready districts', type: 'Pilot grant', deadline: '18 Oct 2026', applicants: 42, tone: 'mint' },
  { id: 'call-2', title: 'Land data innovation challenge', type: 'Hackathon', deadline: '02 Nov 2026', applicants: 118, tone: 'ochre' },
  { id: 'call-3', title: 'Young researchers fellowship', type: 'Research grant', deadline: '15 Nov 2026', applicants: 67, tone: 'coral' },
]

async function getTable(table, fallback) {
  if (!isSupabaseConfigured) return fallback
  const { data, error } = await supabase.from(table).select('*').order('created_at', { ascending: false })
  if (error) {
    console.warn(`Supabase ${table} query failed; using demo data.`, error.message)
    return fallback
  }
  return data?.length ? data : fallback
}

export const getResources = () => getTable('resources', demoResources)
export const getExperiments = () => getTable('policy_experiments', demoExperiments)
export const getInnovationCalls = () => getTable('innovation_calls', demoCalls)

export async function createWorkspace(name, description = '') {
  if (!isSupabaseConfigured) return { data: { id: `local-${Date.now()}`, name, description }, error: null }
  return supabase.from('workspaces').insert({ name, description }).select().single()
}

export async function saveResource(resourceId, userId = null) {
  if (!isSupabaseConfigured) return { data: { resource_id: resourceId, user_id: userId }, error: null }
  return supabase.from('saved_resources').upsert({ resource_id: resourceId, user_id: userId }).select().single()
}
