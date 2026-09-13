# Accessibility and responsive strategy

Target: WCAG 2.2 AA. This is a target, not a certification or a claim that the reference images meet it. No runtime implementation exists yet.

## Interaction baseline

Use semantic landmarks/headings and native controls where practical. Give every control an accessible name and visible label; connect instructions and errors programmatically. Support full keyboard operation, a skip link, visible unobscured focus, logical focus order and appropriate focus restoration for overlays/navigation. Do not trap focus except within an active modal with a working exit.

Announce asynchronous status without repeatedly interrupting assistive technology; announce urgent messages appropriately. Do not use color, icon, placement or motion alone for meaning. Provide text summaries/table alternatives for charts. Respect reduced motion, browser zoom and user font scaling. English labels must use plain language without hiding uncertainty.

## Responsive proposals

At 1440/1024 px inspect public two-column balance and app navigation. At 768 px decide whether navigation collapses and forms stack based on content, not device names. At 390 px use a single primary content column, usable navigation, stacked controls and legible units; deprioritize decorative illustrations before primary tasks. These are QA widths, not fixed approved CSS breakpoints.

Also inspect 320 CSS px reflow and 200% text resizing. Avoid page-level horizontal scroll except genuinely two-dimensional content with an accessible alternative. Primary actions remain reachable when errors, long labels or keyboards change layout. Exact container widths and breakpoint values await HS-005.

## Verification

Use axe with component/E2E coverage for machine-detectable issues. Manually test keyboard-only journeys, focus visibility/restoration, readable contrast, accessible names, zoom/reflow and chart alternatives. Use contrast measurements for actual tokens; do not claim accessibility from the PNG colors. Record tested widths, browser, screenshots and failures against acceptance criteria. Automated scans alone do not establish conformance.

Baseline accessibility is part of every P0 screen. An optional accessibility settings page is not a substitute.
