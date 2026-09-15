import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Brand } from '../components/product/Brand'
import adultMan from '../assets/people/adult-man-1200.webp'
import adultWoman from '../assets/people/adult-woman-1200.webp'
import olderCouple from '../assets/people/older-couple-1200.webp'
import olderWomanCare from '../assets/people/older-woman-care-1200.webp'

const steps = [
  ['01', 'Create your health profile', 'Record the background information you choose to share.'],
  ['02', 'Track selected measurements', 'Save blood pressure, heart rate, weight and other supported observations.'],
  ['03', 'Generate an experimental assessment', 'Use your saved information with a synthetic-data model that is not clinically calibrated.'],
  ['04', 'Ask HealthSphere Assistant', 'Ask general health-information questions or request an explanation of a saved assessment.'],
  ['05', 'Keep the context in view', 'See sources, uncertainty and clear safety limits alongside the information.'],
]

const capabilities = [
  ['A health overview that stays truthful', 'Review your latest recorded measurements without missing values being replaced by zero.'],
  ['A record you build over time', 'Add and revisit supported measurements and previous experimental assessments.'],
  ['Grounded health information', 'The Assistant answers from available sources and abstains when reliable support is not available.'],
  ['A clear explanation path', 'Move from a saved assessment to an explanation that preserves its model context and limitations.'],
]

export function LandingRoute() {
  return <div className="landing-page"><LandingHeader /><main id="main-content"><Hero /><HowItWorks /><Capabilities /><Safety /></main><LandingFooter /></div>
}

function LandingHeader() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) return
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [open])
  const close = () => setOpen(false)
  return <header className="landing-header"><a className="skip-link" href="#main-content">Skip to main content</a><Brand /><button className="landing-menu-button" type="button" aria-expanded={open} aria-controls="landing-navigation" onClick={() => setOpen((current) => !current)}>Menu</button><div className={`landing-navigation${open ? ' is-open' : ''}`} id="landing-navigation"><nav aria-label="Landing navigation"><a href="#home" onClick={close}>Home</a><a href="#how-it-works" onClick={close}>How it works</a><a href="#features" onClick={close}>Features</a><a href="#safety" onClick={close}>Safety</a></nav><div className="landing-actions"><Link to="/login" onClick={close}>Log in</Link><Link className="button button--primary" to="/register" onClick={close}>Get Started</Link></div></div></header>
}

function Hero() {
  return <section className="landing-hero" id="home" aria-labelledby="landing-title"><div className="landing-hero__copy"><p className="eyebrow">Your information, made clearer</p><h1 id="landing-title">Understand your health.<br /><span>Make sense of your information.</span></h1><p className="landing-intro">HealthSphere helps adults organize health information, follow selected measurements, explore an experimental AI-assisted assessment and ask grounded health-information questions.</p><div className="landing-hero__actions"><Link className="button button--primary" to="/register">Get Started</Link><a className="button button--secondary" href="#how-it-works">See how it works</a></div><p className="landing-safety-line">Health information and experimental insights — never a diagnosis or treatment plan.</p></div><figure className="landing-hero__visual"><img src={adultMan} width="1200" height="800" alt="Adult at home holding a mug." fetchPriority="high" /><figcaption><strong>A calmer place for the information you record.</strong><span>Designed to keep context and limitations visible.</span></figcaption></figure></section>
}

function HowItWorks() {
  return <section className="landing-section landing-how" id="how-it-works" aria-labelledby="how-title"><div className="landing-section__heading"><p className="eyebrow">How HealthSphere works</p><h2 id="how-title">A clear path from recording to understanding.</h2><p>You stay in control of the information you add. HealthSphere organizes it and keeps experimental results in their proper context.</p></div><div className="landing-how__body"><ol>{steps.map(([number, title, text]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol><figure><img src={adultWoman} width="1200" height="800" loading="lazy" decoding="async" alt="Adult sitting at home near a window." /></figure></div></section>
}

function Capabilities() {
  return <section className="landing-capabilities" id="features" aria-labelledby="features-title"><figure><img src={olderCouple} width="1200" height="765" loading="lazy" decoding="async" alt="Older adults using a laptop together." /></figure><div className="landing-capabilities__content"><p className="eyebrow">What you can do</p><h2 id="features-title">One place for the health information you choose to follow.</h2><div className="landing-capability-list">{capabilities.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><Link className="landing-text-link" to="/register">Create your HealthSphere account <span aria-hidden="true">→</span></Link></div></section>
}

function Safety() {
  return <section className="landing-section landing-trust" id="safety" aria-labelledby="safety-title"><div className="landing-trust__copy"><p className="eyebrow">Clarity includes the limits</p><h2 id="safety-title">Built to inform, with safety context close at hand.</h2><p>HealthSphere is a healthcare-information platform. It does not diagnose conditions, prescribe medication or replace a qualified healthcare professional.</p><dl><div><dt>Experimental assessment</dt><dd>Trained on synthetic Synthea records, uncalibrated and not clinically validated.</dd></div><div><dt>Grounded Assistant</dt><dd>Uses available medical-information sources, communicates uncertainty and escalates urgent signals.</dd></div><div><dt>Privacy-conscious flow</dt><dd>Your browser talks to the HealthSphere backend; it does not call model or provider services directly.</dd></div><div><dt>Accessible by design</dt><dd>Clear labels, keyboard access, readable contrast and responsive layouts are part of the product baseline.</dd></div></dl></div><figure><img src={olderWomanCare} width="1200" height="800" loading="lazy" decoding="async" alt="Older adult talking with a healthcare professional." /></figure></section>
}

function LandingFooter() {
  return <footer className="landing-footer"><div><Brand /><p>HealthSphere provides health information and experimental AI-assisted insights, not medical advice.</p></div><nav aria-label="Footer navigation"><a href="#how-it-works">How it works</a><a href="#features">Features</a><a href="#safety">Safety</a><Link to="/login">Log in</Link></nav></footer>
}
