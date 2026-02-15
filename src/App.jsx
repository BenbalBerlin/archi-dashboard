import { useState, useEffect } from 'react'
import './App.css'
import './styles/classic.css'
import './styles/futuristic.css'
import './styles/minimal.css'

// Simulated activity feed - in real version this would come from OpenClaw
const mockActivities = [
  { id: 1, type: 'agent', message: 'Jason completed security scan', time: '2 min ago', icon: '🛡️' },
  { id: 2, type: 'deploy', message: 'Dashboard deployed successfully', time: '5 min ago', icon: '🚀' },
  { id: 3, type: 'research', message: 'Ada found new Polymarket trends', time: '12 min ago', icon: '🔬' },
  { id: 4, type: 'system', message: 'QMD index refreshed', time: '15 min ago', icon: '📝' },
  { id: 5, type: 'skill', message: 'New skill installed: supermemory', time: '30 min ago', icon: '🧠' },
]

function App() {
  const [data, setData] = useState(null)
  const [time, setTime] = useState(new Date())
  const [design, setDesign] = useState('classic')
  const [actionStatus, setActionStatus] = useState(null)
  const [activities] = useState(mockActivities)

  // Fetch data every 30 seconds
  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Apply design class
  useEffect(() => {
    document.body.classList.remove('classic', 'futuristic', 'minimal')
    document.body.classList.add(design)
  }, [design])

  const fetchData = () => {
    fetch('/data.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }

  const handleAction = async (action) => {
    setActionStatus({ action, status: 'loading' })
    await new Promise(r => setTimeout(r, 1000))
    setActionStatus({ action, status: 'done' })
    setTimeout(() => setActionStatus(null), 2000)
  }

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

  const getActivityColor = (type) => {
    switch(type) {
      case 'agent': return '#10b981'
      case 'deploy': return '#3b82f6'
      case 'research': return '#8b5cf6'
      case 'system': return '#6b7280'
      case 'skill': return '#f59e0b'
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
          <div className="time-display">
            <div className="time">{time.toLocaleTimeString('de-DE')}</div>
            <div className="date">{time.toLocaleDateString('de-DE')}</div>
          </div>
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
            <span className="stat-value">{data.stats.uptime}</span>
            <span className="stat-label">Uptime</span>
          </div>
        </section>

        <div className="three-col">
          <section className="agents">
            <h2>🛡️ Ritter Status</h2>
            <div className="agent-grid-compact">
              {data.agents.map(agent => (
                <div key={agent.name} className="agent-card-compact">
                  <div 
                    className="agent-avatar-sm" 
                    style={{ background: getStatusColor(agent.status) }}
                  >
                    {agent.name[0]}
                  </div>
                  <div className="agent-info">
                    <h3>{agent.name}</h3>
                    <p>{agent.role}</p>
                  </div>
                  <span className={`status-dot ${agent.status}`}></span>
                </div>
              ))}
            </div>
          </section>

          <section className="activity">
            <h2>📡 Live Activity</h2>
            <div className="activity-list">
              {activities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <span className="activity-icon">{activity.icon}</span>
                  <div className="activity-content">
                    <p>{activity.message}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="quick-stats">
            <h2>📊 System</h2>
            <div className="quick-stat-grid">
              <div className="quick-stat">
                <span className="qs-value">{data.stats.apiCalls || 0}</span>
                <span className="qs-label">API Calls</span>
              </div>
              <div className="quick-stat">
                <span className="qs-value">{data.deployments.length}</span>
                <span className="qs-label">Deploys</span>
              </div>
              <div className="quick-stat">
                <span className="qs-value">{data.projects.length}</span>
                <span className="qs-label">Projects</span>
              </div>
              <div className="quick-stat">
                <span className="qs-value">9</span>
                <span className="qs-label">Cron Jobs</span>
              </div>
            </div>
          </section>
        </div>

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
            <button 
              className={`action-btn ${actionStatus?.action === 'deploy' ? 'loading' : ''}`}
              onClick={() => handleAction('deploy')}
              disabled={actionStatus?.status === 'loading'}
            >
              {actionStatus?.action === 'deploy' && actionStatus.status === 'loading' ? '⏳...' : '🚀 Deploy'}
            </button>
            <button 
              className={`action-btn ${actionStatus?.action === 'research' ? 'loading' : ''}`}
              onClick={() => handleAction('research')}
              disabled={actionStatus?.status === 'loading'}
            >
              {actionStatus?.action === 'research' && actionStatus.status === 'loading' ? '⏳...' : '🔍 Research'}
            </button>
            <button 
              className={`action-btn ${actionStatus?.action === 'report' ? 'loading' : ''}`}
              onClick={() => handleAction('report')}
              disabled={actionStatus?.status === 'loading'}
            >
              {actionStatus?.action === 'report' && actionStatus.status === 'loading' ? '⏳...' : '📊 Report'}
            </button>
            <button 
              className={`action-btn ${actionStatus?.action === 'optimize' ? 'loading' : ''}`}
              onClick={() => handleAction('optimize')}
              disabled={actionStatus?.status === 'loading'}
            >
              {actionStatus?.action === 'optimize' && actionStatus.status === 'loading' ? '⏳...' : '⚙️ Optimize'}
            </button>
            <button 
              className={`action-btn ${actionStatus?.action === 'security' ? 'loading' : ''}`}
              onClick={() => handleAction('security')}
              disabled={actionStatus?.status === 'loading'}
            >
              {actionStatus?.action === 'security' && actionStatus.status === 'loading' ? '⏳...' : '🛡️ Security'}
            </button>
            <button 
              className={`action-btn ${actionStatus?.action === 'kiband' ? 'loading' : ''}`}
              onClick={() => handleAction('kiband')}
              disabled={actionStatus?.status === 'loading'}
            >
              {actionStatus?.action === 'kiband' && actionStatus.status === 'loading' ? '⏳...' : '🎵 KI-Band'}
            </button>
          </div>
        </section>
      </main>

      <footer>
        <p>🦞 Archi's Dashboard • {new Date(data.lastUpdate).toLocaleString('de-DE')}</p>
        <p className="refresh-info">🔄 Auto-refresh 30s</p>
      </footer>
    </div>
  )
}

export default App
