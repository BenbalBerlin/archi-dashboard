import { useState, useEffect } from 'react'
import './App.css'

const agents = [
  { name: 'Jason', role: 'Security', status: 'online', color: '#10b981' },
  { name: 'Kaizen', role: 'Optimization', status: 'online', color: '#3b82f6' },
  { name: 'Daedalus', role: 'Skills', status: 'online', color: '#8b5cf6' },
  { name: 'Merlin', role: 'Advisor', status: 'online', color: '#f59e0b' },
  { name: 'Marc', role: 'iOS Dev', status: 'waiting', color: '#ef4444' },
  { name: 'Ada', role: 'Research', status: 'online', color: '#06b6d4' },
  { name: 'Da Vinci', role: 'Design', status: 'waiting', color: '#ec4899' },
]

const deployments = [
  { name: 'hello-world-test', url: 'https://test-app-seven-black.vercel.app', status: 'live', time: '2 min ago' },
  { name: 'dashboard-v1', url: '-', status: 'planned', time: '-' },
]

const quickActions = [
  { name: '🚀 New Deployment', action: 'deploy' },
  { name: '🔍 Run Research', action: 'research' },
  { name: '📊 Generate Report', action: 'report' },
  { name: '⚙️ Run Optimization', action: 'optimize' },
]

function App() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="dashboard">
      <header>
        <h1>🦞 Archi's Dashboard</h1>
        <div className="time">{time.toLocaleTimeString('de-DE')}</div>
      </header>

      <main>
        <section className="agents">
          <h2>🛡️ Ritter Status</h2>
          <div className="agent-grid">
            {agents.map(agent => (
              <div key={agent.name} className="agent-card">
                <div className="agent-avatar" style={{ background: agent.color }}>
                  {agent.name[0]}
                </div>
                <div className="agent-info">
                  <h3>{agent.name}</h3>
                  <p>{agent.role}</p>
                </div>
                <div className={`status ${agent.status}`}>
                  {agent.status === 'online' ? '✅' : '⏳'}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="deployments">
          <h2>🚀 Letzte Deployments</h2>
          <div className="deploy-list">
            {deployments.map(deploy => (
              <div key={deploy.name} className="deploy-card">
                <div className="deploy-info">
                  <h3>{deploy.name}</h3>
                  <a href={deploy.url} target="_blank" rel="noreferrer">{deploy.url}</a>
                </div>
                <div className={`deploy-status ${deploy.status}`}>
                  {deploy.status === 'live' ? '🟢 Live' : '🟡 Planned'}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="actions">
          <h2>⚡ Quick Actions</h2>
          <div className="action-grid">
            {quickActions.map(action => (
              <button key={action.action} className="action-btn">
                {action.name}
              </button>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <p>OpenClaw Dashboard • Version 1.0</p>
      </footer>
    </div>
  )
}

export default App
