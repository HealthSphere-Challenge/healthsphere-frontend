import { PageContainer } from '../components/layout/PageContainer'
import { Alert, Button, FormField } from '../components/ui'

export function FoundationRoute() {
  return <><a className="skip-link" href="#main">Skip to main content</a><PageContainer><main className="foundation-shell" id="main" tabIndex={-1}>
    <div className="foundation-intro"><p className="eyebrow">HealthSphere</p><h1>Application foundation ready</h1><p>Accessible interface components are ready for the approved product journeys.</p></div>
    <div className="component-showcase">
      <section className="showcase-section stack" aria-labelledby="actions-title"><h2 id="actions-title">Actions and feedback</h2><div className="button-row"><Button>Continue</Button><Button variant="secondary">Back</Button><Button loading>Saving</Button></div><Alert>Your information can be updated at any time.</Alert></section>
      <section className="showcase-section stack" aria-labelledby="fields-title"><h2 id="fields-title">Form fields</h2><FormField label="Email address" type="email" autoComplete="email" hint="Use the address linked to your account." /><FormField label="Date of birth" type="date" error="Enter a valid date of birth." /></section>
    </div>
  </main></PageContainer></>
}
