import { useMutation, useQuery, useQueryClient, type UseQueryResult } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button } from '../../components/ui'
import { ApiError } from '../../lib/api'
import { dashboardKey, type Dashboard } from '../measurements/api'
import { assessmentApi, assessmentsKey, type Assessment, type CompletedAssessment } from './api'

export function AssessmentCard({ latestAssessment }: { latestAssessment: CompletedAssessment | null }) {
  const queryClient = useQueryClient()
  const [latestAttempt, setLatestAttempt] = useState<Assessment | null>(null)
  const history = useQuery({ queryKey: assessmentsKey, queryFn: assessmentApi.list })
  const mutation = useMutation({
    mutationFn: assessmentApi.create,
    onSuccess: (assessment) => {
      setLatestAttempt(assessment)
      if (assessment.status === 'completed') {
        queryClient.setQueryData<Dashboard>(dashboardKey, (current) => current ? { ...current, latest_assessment: assessment } : current)
        queryClient.setQueryData(assessmentsKey, (current: { items: Assessment[]; next_cursor: string | null } | undefined) => current ? { ...current, items: [assessment, ...current.items.filter((item) => item.id !== assessment.id)] } : current)
      }
      void queryClient.invalidateQueries({ queryKey: assessmentsKey })
      if (assessment.status === 'completed') void queryClient.invalidateQueries({ queryKey: dashboardKey })
    },
  })
  const completed = latestAttempt?.status === 'completed' ? latestAttempt : latestAssessment
  const actionLabel = completed ? 'Run new assessment' : 'Run assessment'

  return <section className="assessment-section" aria-labelledby="assessment-title">
    <div className="assessment-card">
      <div className="assessment-card__main">
        <p className="eyebrow">Experimental assessment</p>
        <h2 id="assessment-title">Health risk assessment</h2>
        {mutation.isPending && <p className="assessment-pending" role="status"><span className="spinner" aria-hidden="true" /> Generating assessment…</p>}
        {!mutation.isPending && mutation.isError && <AssessmentError error={mutation.error} retry={() => mutation.mutate()} />}
        {!mutation.isPending && !mutation.isError && latestAttempt?.status === 'insufficient_data' && <InsufficientData assessment={latestAttempt} />}
        {!mutation.isPending && !mutation.isError && latestAttempt?.status === 'ineligible' && <Alert>This assessment is currently available for adults aged 18 and over.</Alert>}
        {!mutation.isPending && !mutation.isError && latestAttempt?.status === 'unavailable' && <Alert tone="error">The assessment service is temporarily unavailable. Your saved health data has not been changed.</Alert>}
        {completed ? <CompletedResult assessment={completed} /> : !latestAttempt && <div className="assessment-empty"><h3>No assessment yet</h3><p>Use your saved profile and latest health measurements to generate an experimental health risk score.</p></div>}
        <Button type="button" loading={mutation.isPending} onClick={() => mutation.mutate()}>{actionLabel}</Button>
      </div>
      <aside className="assessment-card__context" aria-label="About this score">
        <h3>About this score</h3>
        <p><strong>Experimental.</strong> This model was trained on synthetic Synthea health records.</p>
        <p><strong>Not clinically calibrated or validated.</strong> This score is not a diagnosis or medical advice and must not guide treatment or emergency decisions.</p>
        <p>Seek professional care for medical concerns.</p>
      </aside>
    </div>
    <AssessmentHistory state={history} />
  </section>
}

function CompletedResult({ assessment }: { assessment: CompletedAssessment }) {
  const score = Math.round(assessment.result.score * 100)
  return <div className="assessment-result">
    <p className="assessment-result__label">Experimental model score</p>
    <p className="assessment-result__score" aria-label={`Experimental model score ${score} out of 100`}>{score} <span>/ 100</span></p>
    <dl className="assessment-details"><div><dt>Model horizon</dt><dd>5 years</dd></div><div><dt>Last assessed</dt><dd><time dateTime={assessment.created_at}>{formatDate(assessment.created_at)}</time></dd></div><div><dt>Calibration</dt><dd>Not clinically calibrated</dd></div><div><dt>Data</dt><dd>Synthetic model</dd></div></dl>
  </div>
}

function InsufficientData({ assessment }: { assessment: Extract<Assessment, { status: 'insufficient_data' }> }) {
  const missing = assessment.reason.missing_fields ?? []
  const needsBp = missing.some((field) => ['systolic', 'diastolic', 'blood_pressure'].includes(field))
  const needsProfile = missing.some((field) => ['age_years', 'date_of_birth'].includes(field))
  return <Alert><p>More health information is needed before an assessment can be generated.</p>{needsBp && <p><Link to="/app/measurements?add=1&metric=blood_pressure">Add blood pressure</Link></p>}{needsProfile && <p><Link to="/onboarding/about">Complete profile</Link></p>}</Alert>
}

function AssessmentError({ error, retry }: { error: Error; retry: () => void }) {
  const unavailable = error instanceof ApiError && (error.status === 503 || error.code === 'ai_unavailable')
  return <Alert tone="error"><p>{unavailable ? 'The assessment service is temporarily unavailable. Your saved health data has not been changed.' : 'We could not generate an assessment. Please try again.'}</p><Button type="button" variant="secondary" onClick={retry}>Retry</Button></Alert>
}

function AssessmentHistory({ state }: { state: UseQueryResult<{ items: Assessment[]; next_cursor: string | null }, Error> }) {
  if (state.isPending) return <p className="assessment-history-status" role="status">Loading assessment history…</p>
  if (state.isError) return <div className="assessment-history-status"><p>Assessment history is unavailable.</p><button className="button button--secondary" onClick={() => void state.refetch()}>Retry history</button></div>
  const items = [...state.data.items].filter((item): item is CompletedAssessment => item.status === 'completed').sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
  if (!items.length) return null
  return <div className="assessment-history"><h3>Assessment history</h3><p>Previous experimental model scores. Changes do not by themselves indicate a change in health.</p><ol>{items.map((item) => <li key={item.id}><time dateTime={item.created_at}>{formatDate(item.created_at)}</time><strong>{Math.round(item.result.score * 100)} / 100</strong></li>)}</ol></div>
}

function formatDate(value: string) { return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) }
