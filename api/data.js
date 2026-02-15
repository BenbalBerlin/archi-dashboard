// OpenClaw Dashboard API
// This simulates an API that OpenClaw would call to update dashboard data

const agents = [
  { name: 'Jason', role: 'Security', status: 'online', lastReport: 'Alles sicher', time: '03:00' },
  { name: 'Kaizen', role: 'Optimization', status: 'online', lastReport: 'QMD Index + Agent Browser', time: '04:00' },
  { name: 'Daedalus', role: 'Skills', status: 'online', lastReport: '54 Skills installiert', time: '05:00' },
  { name: 'Merlin', role: 'Advisor', status: 'online', 'lastReport': 'Round Table moderiert', time: '05:30' },
  { name: 'Marc', role: 'iOS Dev', status: 'waiting', lastReport: 'Wartet auf Ben', time: '08:00' },
  { name: 'Ada', role: 'Research', status: 'online', lastReport: 'Polymarket Research', time: '09:00' },
  { name: 'Da Vinci', role: 'Design', status: 'waiting', lastReport: 'Wartet auf Input', time: '-' }
]

const deployments = [
  { name: 'archi-dashboard', url: 'https://dashboard-sigma-nine-53.vercel.app', status: 'live', time: 'gerade' },
  { name: 'hello-world-test', url: 'https://test-app-seven-black.vercel.app', status: 'live', time: 'heute' }
]

const projects = [
  { name: 'KI-Band', status: 'research', description: 'Suno/Udio → Spotify' },
  { name: 'Value Betting', status: 'research', description: 'Automatisierte Wetten' },
  { name: 'Paper Trading', status: 'planned', description: 'TradingView' },
  { name: 'iOS App', status: 'waiting', description: 'OpenClaw Interface' }
]

const stats = {
  activeAgents: agents.filter(a => a.status === 'online').length,
  waitingAgents: agents.filter(a => a.status === 'waiting').length,
  skillsInstalled: 54,
  totalDeployments: deployments.length,
  uptime: '99.9%',
  apiCalls: Math.floor(Math.random() * 100) + 1200
}

module.exports = {
  agents,
  deployments,
  projects,
  stats,
  lastUpdate: new Date().toISOString()
}
