import { useState, useEffect } from 'react'
import './App.css'
import './styles/classic.css'
import './styles/futuristic.css'
import './styles/minimal.css'

function App() {
  const [data, setData] = useState(null)
  const [time, setTime] = useState(new Date())
  const [design, setDesign] = useState('classic')

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Remove all design classes first
    document.body.classList.remove('classic', 'futuristic', 'minimal')
    // Add the selected design class
    document.body.classList.add(design)
  }, [design])

  const getStatusColor = (status) => {
    switch(status) {
      case 'online': return '#10b981'
      case 'waiting': return '#f59e0b'
      case 'error': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const getProjectStatusColor = (status) => {
    switch(status) {
      case 'research': return '#3b82f6'
      case 'live': return '#10b981'
      case 'planned': return '#8b5cf6'
      case 'waiting': return '#f59e0b'
      default: return '#6b7280'
    }
  }

  if (!data) return <div className="loading">Loading...</div>

  return (
    <div className="dashboard">
      <header>
        <div className="header-left">
          <h1>🦞 Archi's Dashboard</h1>
          <span className="subtitle">OpenClaw Control Center</span>
        </div>
        <div className="header-right">
          <div className="design-toggle">
            <button 
              className={design === 'classic' ? 'active' : ''} 
              onClick={() => setDesign('classic')}
            >
              Classic
            </button>
            <button 
              className={design === 'futuristic' ? 'active' : ''} 
              onClick={() => setDesign('futuristic')}
            >
              Futuristic
            </button>
            <button 
              className={design === 'minimal' ? 'active' : ''} 
              onClick={() => setDesign('minimal')}
            >
              Minimal
            </button>
          </div>
          <div className="time">{time.toLocaleTimeString('de-DE')}</div>
        </div>
      </header>

      <main>
        <section className="stats">
          <div className="stat-card">
            <span className="stat-value">{data.stats.activeAgents}</span>
            <span className="stat-label">Active Agents</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{data.stats.waitingAgents}</span>
            <span className="stat-label">Waiting</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{data.stats.skillsInstalled}</span>
            <span className="stat-label">Skills</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{data.stats.totalDeployments}</span>
            <span className="stat-label">Deployments</span>
          </div>
        </section>

        <section className="agents">
          <h2>🛡️ Ritter Status</h2>
          <div className="agent-grid">
            {data.agents.map(agent => (
              <div key={agent.name} className="agent-card">
                <div 
                  className="agent-avatar" 
                  style={{ background: getStatusColor(agent.status) }}
                >
                  {agent.name[0]}
                </div>
                <div className="agent-info">
                  <h3>{agent.name}</h3>
                  <p className="role">{agent.role}</p>
                  <p className="report">{agent.lastReport}</p>
                </div>
                <div className="agent-meta">
                  <span className={`status-badge ${agent.status}`}>
                    {agent.status === 'online' ? '🟢' : '🟡'}
                  </span>
                  <span className="time">{agent.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="two-col">
          <section className="deployments">
            <h2>🚀 Deployments</h2>
            <div className="deploy-list">
              {data.deployments.map(deploy => (
                <div key={deploy.name} className="deploy-card">
                  <div className="deploy-info">
                    <h3>{deploy.name}</h3>
                    <a href={deploy.url} target="_blank" rel="noreferrer">{deploy.url}</a>
                  </div>
                  <div className="deploy-meta">
                    <span className={`deploy-status ${deploy.status}`}>
                      {deploy.status === 'live' ? '🟢 Live' : '🟡 Planned'}
                    </span>
                    <span className="time">{deploy.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="projects">
            <h2>📁 Projekte</h2>
            <div className="project-list">
              {data.projects.map(project => (
                <div key={project.name} className="project-card">
                  <div className="project-info">
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                  </div>
                  <span 
                    className="project-status"
                    style={{ background: getProjectStatusColor(project.status) }}
                  >
                    {project.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="actions">
          <h2>⚡ Quick Actions</h2>
          <div className="action-grid">
            <button className="action-btn">🚀 New Deployment</button>
            <button className="action-btn">🔍 Run Research</button>
            <button className="action-btn">📊 Generate Report</button>
            <button className="action-btn">⚙️ Optimization</button>
            <button className="action-btn">🛡️ Security Scan</button>
            <button className="action-btn">🎵 KI-Band Check</button>
          </div>
        </section>
      </main>

      <footer>
        <p>🦞 Archi's Dashboard • Letzte Aktualisierung: {new Date(data.lastUpdate).toLocaleString('de-DE')}</p>
      </footer>
    </div>
  )
}

export default App
