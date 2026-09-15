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
  ['Health overview', 'Review your latest recorded information without replacing missing values with zero.'],
  ['Measurements', 'Add and revisit supported observations such as blood pressure, heart rate and weight.'],
  ['Experimental assessments', 'Generate and revisit an experimental result with its model version and limitations.'],
  ['HealthSphere Assistant', 'Ask health-information questions or request a grounded explanation of a saved assessment.'],
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
  return <section className="landing-section landing-how" id="how-it-works" aria-labelledby="how-title"><div className="landing-process-intro"><div><p className="eyebrow">From profile to context</p><h2 id="how-title">How HealthSphere works</h2><p>You choose what to record. HealthSphere organizes it and keeps experimental results, sources and limitations close to the information.</p></div><figure><img src={adultWoman} width="1200" height="800" loading="lazy" decoding="async" alt="Adult sitting at home near a window." /></figure></div><ol className="landing-process">{steps.map(([number, title, text]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></section>
}

function Capabilities() {
  return <section className="landing-capabilities" id="features" aria-labelledby="features-title"><div className="landing-section landing-capabilities__inner"><header><p className="eyebrow">Product capabilities</p><h2 id="features-title">Track, review and understand the information you record.</h2><p>Each part of HealthSphere uses the same saved context, without turning missing information into a health conclusion.</p></header><div className="landing-capability-layout"><div className="landing-capability-list">{capabilities.map(([title, text], index) => <article key={title}><span aria-hidden="true">0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}<Link className="landing-text-link" to="/register">Create your HealthSphere account <span aria-hidden="true">→</span></Link></div><figure><img src={olderCouple} width="1200" height="765" loading="lazy" decoding="async" alt="Older adults using a laptop together." /><figcaption>Designed for the information you choose to record and revisit.</figcaption></figure></div></div></section>
}

function Safety() {
  return <section className="landing-trust" id="safety" aria-labelledby="safety-title"><div className="landing-section landing-trust__inner"><header><div><p className="eyebrow">Safety and limitations</p><h2 id="safety-title">Important context stays visible.</h2></div><p>HealthSphere provides health information, not diagnosis. It does not prescribe treatment or replace a qualified healthcare professional.</p></header><div className="landing-trust__body"><dl><div><dt>Experimental assessment</dt><dd>Trained on synthetic Synthea records, uncalibrated and not clinically validated.</dd></div><div><dt>Grounded Assistant</dt><dd>Uses available medical-information sources, communicates uncertainty and escalates urgent signals.</dd></div><div><dt>Privacy-conscious flow</dt><dd>Your browser talks to the HealthSphere backend; it does not call model or provider services directly.</dd></div><div><dt>Accessible by design</dt><dd>Clear labels, keyboard access, readable contrast and responsive layouts are part of the product baseline.</dd></div></dl><figure><img src={olderWomanCare} width="1200" height="800" loading="lazy" decoding="async" alt="Older adult talking with a healthcare professional." /></figure></div></div></section>
}

function LandingFooter() {
  return <footer className="landing-footer"><div><Brand /><p>HealthSphere provides health information and experimental AI-assisted insights, not medical advice.</p></div><nav aria-label="Footer navigation"><a href="#how-it-works">How it works</a><a href="#features">Features</a><a href="#safety">Safety</a><Link to="/login">Log in</Link></nav></footer>
}
