import { Component, type PropsWithChildren } from 'react'

interface State { failed: boolean }

export class AppErrorBoundary extends Component<PropsWithChildren, State> {
  state: State = { failed: false }
  static getDerivedStateFromError(): State { return { failed: true } }
  componentDidCatch() {
    // Future telemetry may record safe metadata. Never log health payloads.
  }
  render() {
    if (this.state.failed) return <main><h1>HealthSphere could not start</h1><p>Please refresh the page and try again.</p></main>
    return this.props.children
  }
}
