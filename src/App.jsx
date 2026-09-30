import { useEffect, useState } from 'react'
import './App.css'
import Dashboard from './Dashboard'
import { Collaborate, InnovationHub, LandIntelligence, PolicyLab, ResearchLibrary } from './pages'
import { isSupabaseConfigured } from './lib/supabase'

const navItems = [
  ['⌂', 'Overview', ''], ['◈', 'Research library', 'research'], ['⌁', 'Land intelligence', 'intelligence'], ['↗', 'Policy lab', 'policy'], ['◌', 'Collaborate', 'collaborate'], ['✦', 'Innovation hub', 'innovation'],
]

function pageFromHash() {
  return navItems.find(([, , slug]) => slug === window.location.hash.slice(1))?.[1] || 'Overview'
}

function App() {
  const [activeNav, setActiveNav] = useState(pageFromHash)
  const [savedNotice, setSavedNotice] = useState(false)

  useEffect(() => {
    const handleHashChange = () => setActiveNav(pageFromHash())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const goTo = (label, slug) => {
    setActiveNav(label)
    window.location.hash = slug
  }

  const handleSave = () => {
    setSavedNotice(true)
    window.setTimeout(() => setSavedNotice(false), 2200)
  }

  const page = activeNav === 'Overview' ? <Dashboard onOpenLibrary={() => goTo('Research library', 'research')} onSave={handleSave} /> : activeNav === 'Research library' ? <ResearchLibrary onSave={handleSave} /> : activeNav === 'Land intelligence' ? <LandIntelligence /> : activeNav === 'Policy lab' ? <PolicyLab /> : activeNav === 'Collaborate' ? <Collaborate /> : <InnovationHub />

  return <div className="app-shell"><aside className="sidebar"><div className="brand"><div className="brand-mark">B</div><div><strong>BhuMitra</strong><span>LAND GOVERNANCE LAB</span></div></div><div className="workspace-label">WORKSPACE</div><nav>{navItems.map(([icon, label, slug]) => <button className={activeNav === label ? 'nav-item active' : 'nav-item'} onClick={() => goTo(label, slug)} key={label}><span>{icon}</span>{label}{label === 'Collaborate' && <i>4</i>}</button>)}</nav><div className="sidebar-footer"><div className="workspace-label">YOUR WORKSPACE</div><div className="profile"><div className="avatar">AM</div><div><strong>Ananya Mehta</strong><small>Policy researcher</small></div><span>⋮</span></div><div className="privacy"><span className="green-dot"></span> {isSupabaseConfigured ? 'Supabase connected' : 'Demo data mode'} <b>↗</b></div></div></aside><main className="main-content"><header className="topbar"><div className="crumb"><button className="crumb-home" onClick={() => goTo('Overview', '')}>BhuMitra</button> <span>/</span> {activeNav}</div><div className="header-actions"><button className="icon-btn" title="Notifications">♧<em></em></button><button className="profile-mini"><span className="avatar small">AM</span> Ananya <span>⌄</span></button></div></header>{page}<footer><span>BHUMITRA NATIONAL RESEARCH NETWORK</span><span>Data refreshed 30 Sep 2026 · 09:42 IST</span><span>API status <i className="green-dot"></i></span></footer></main>{savedNotice && <div className="toast">Saved to your workspace <span>✓</span></div>}</div>
}

export default App
