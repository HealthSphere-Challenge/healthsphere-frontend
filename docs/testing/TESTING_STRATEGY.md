# Frontend testing strategy

Status: planned tooling for HS-003; no test runner, application or CI exists in Stage 2.

| Family | Tool / evidence | Required behavior |
|---|---|---|
| Unit/component | Vitest + React Testing Library | Validation, labeled controls, form errors, navigation and loading/empty/failure states; test user behavior rather than component internals |
| Consumer contract | Strict TypeScript + Zod against synthetic backend fixtures pinned to the HS-002 revision | All union states, UUID/time formats, units, omitted/null/empty semantics, canonical errors, pagination and incompatible versions; only backend requests |
| E2E | Playwright | Register → onboarding → dashboard; login; save measurement → persisted display; real assessment; assistant follow-up |
| Accessibility | axe plus manual review | Names, labels, semantics, keyboard/focus, contrast, zoom/reflow and chart alternatives |
| Visual/responsive QA | Screenshots compared to local references | 1440/1024/768/390 widths, state coverage, approved tokens, no redesign |
| Security behavior | Component/E2E with backend verification | Session expiry, logout cache clearing, denied requests, no secrets/AI service destinations in bundle |

Mocks support deterministic component tests; they do not prove integrated journeys. E2E uses isolated synthetic users and actual services for core release evidence. Mark unavailable model/provider paths honestly. Seeded replay fixtures cannot be presented as live AI results. Avoid brittle full-page snapshots and tests that mirror implementation details.

CI minimum: Node.js 24 LTS, npm with committed lockfile, locked dependency install, lint, strict typecheck, unit/component tests and production build. Add Playwright/axe release workflows when vertical functionality exists. Exact packages, scripts and CI versions are selected and tested during HS-003; no TypeScript OpenAPI client is generated yet.

Upload tests join the suite only when documents enter approved scope. Each ticket selects relevant tests and records results; HS-015 coordinates integrated evidence. Stage 2 validates documentation links, skill metadata and preservation of references, not product behavior.
