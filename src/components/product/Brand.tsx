import { Link } from 'react-router-dom'
import healthSphereLogo from '../../assets/brand/healthsphere-logo.webp'

export function BrandLogo() {
  return <img className="brand__logo" src={healthSphereLogo} width="2172" height="724" alt="" draggable="false" />
}

export function Brand() { return <Link className="brand" to="/" aria-label="HealthSphere home"><BrandLogo /></Link> }

export function PublicHeader() {
  return <header className="public-header"><a className="skip-link" href="#main-content">Skip to main content</a><Brand /><nav aria-label="Public navigation"><Link to="/login">Log in</Link><Link className="header-action" to="/register">Create account</Link></nav></header>
}

export function HealthIllustration() {
  return <div className="health-art"><div className="health-art__sun" /><div className="health-art__person" aria-hidden="true"><span /><strong>+</strong></div><p>Your health information,<br />together in one calm place.</p></div>
}
