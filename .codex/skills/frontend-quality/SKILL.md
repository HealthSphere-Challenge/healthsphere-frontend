---
name: frontend-quality
description: "Validate HealthSphere UI changes with component, accessibility, visual, responsive and end-to-end evidence."
---

# Frontend Quality

Read the active approved ticket and relevant repository instructions first. This skill does not expand authorization.

- [Testing Strategy](../../../docs/testing/TESTING_STRATEGY.md)
- [Accessibility And Responsive](../../../docs/ux/ACCESSIBILITY_AND_RESPONSIVE.md)
- [Design System](../../../docs/ux/DESIGN_SYSTEM.md)

## Workflow

Map acceptance criteria to observable behavior and choose relevant Vitest/RTL and Playwright checks. Exercise failure, empty, loading, disabled and invalid-input states. Run axe where configured, then manually inspect keyboard/focus, contrast, zoom/reflow and chart alternatives. Compare actual screens to references at 1440/1024/768/390 widths. Distinguish mocks from real-service E2E evidence. Report unrun checks and residual failures honestly; do not redesign while performing visual QA.
