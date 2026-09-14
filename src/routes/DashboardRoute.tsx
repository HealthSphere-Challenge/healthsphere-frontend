import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Alert } from '../components/ui'
import { useSession } from '../features/auth/useSession'
import { AssessmentCard } from '../features/assessments/AssessmentCard'
import { dashboardKey, displayValue, measurementApi, metricMeta, type Metric } from '../features/measurements/api'

const summaryMetrics: (Metric | 'bmi')[] = ['heart_rate', 'blood_pressure', 'weight', 'bmi', 'blood_glucose', 'sleep_duration']

export function DashboardRoute() {
  const session = useSession(); const dashboard = useQuery({ queryKey: dashboardKey, queryFn: measurementApi.dashboard })
  if (dashboard.isPending) return <main id="main-content" className="product-status" aria-live="polite"><span className="spinner" /> Loading your dashboard…</main>
  if (dashboard.isError) return <main id="main-content" className="product-status"><Alert tone="error">We could not load your health information.</Alert><button className="button button--secondary" onClick={() => void dashboard.refetch()}>Try again</button></main>
  const entries = dashboard.data.latest_measurements; const hasData = Object.values(entries).some(Boolean)
  return <main id="main-content" className="dashboard"><header className="product-heading"><div><p className="eyebrow">Your health overview</p><h1>Good to see you, {session.data?.user.display_name.split(' ')[0]}</h1><p>Here is the information you have recorded.</p></div><Link className="button button--primary" to="/app/measurements?add=1">Add health data</Link></header>{!hasData ? <section className="empty-health"><div className="empty-health__icon" aria-hidden="true">+</div><h2>Start your health record</h2><p>Add a measurement to see your latest information here. HealthSphere will never replace missing information with zero.</p><Link to="/app/measurements?add=1" className="button button--primary">Add your first measurement</Link></section> : <><section aria-labelledby="latest-title"><div className="section-heading"><div><p className="eyebrow">Latest readings</p><h2 id="latest-title">Health summary</h2></div><Link to="/app/measurements">View history</Link></div><div className="metric-grid">{summaryMetrics.map((metric) => <MetricCard key={metric} metric={metric} value={entries[metric]} />)}</div></section><section className="recent-panel"><div><p className="eyebrow">Your record</p><h2>Recent health information</h2><p>Review observation times and add new measurements from My health.</p></div><Link className="button button--secondary" to="/app/measurements">Open my health</Link></section></>}<AssessmentCard latestAssessment={dashboard.data.latest_assessment?.status === 'completed' ? dashboard.data.latest_assessment : null} /></main>
}

function MetricCard({ metric, value }: { metric: Metric | 'bmi'; value: unknown }) {
  const data = value && typeof value === 'object' ? value as { measured_at?: string } : null
  return <article className="metric-card"><span className="metric-card__icon" aria-hidden="true" /><div><h3>{metricMeta[metric].label}</h3><p className="metric-value">{displayValue(value)} <small>{displayValue(value) === '—' ? '' : metricMeta[metric].unit}</small></p><p className="metric-time">{data?.measured_at ? `Measured ${new Date(data.measured_at).toLocaleDateString()}` : 'No measurement yet'}</p></div></article>
}
