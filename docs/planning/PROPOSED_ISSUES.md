# Proposed GitHub issues — healthsphere-frontend

Status: approved issue-body record, delivered to GitHub on 2026-09-13. The table retains stable project IDs; actual GitHub issue numbers are repository-local. Live issue bodies contain actual dependency and coordination links. Refresh GitHub before creating future issues.

Cross-repository coordination will live in approved GitHub Issues/Project. This file contains only issues proposed for this repository, not a project-wide governance authority. Dependency IDs include their repository below; actual issue links are added only after approved creation. Child membership is not a prerequisite cycle: HS-001 children may start after proposal approval; the coordinator closes after their review/merge evidence. HS-016 preparation may overlap QA, but actual deployment waits for HS-015 and hosting approval.

Labels below already exist; no new labels are proposed. Priority P0 applies to all immediate roadmap items; sizes S/M/L are relative, not delivery-date promises. P1/deferred: medical documents, advanced 7/30-day trend screens, recommendations/progress/timeline expansion, Women's Health, guardian/multi-profile accounts and extended preferences. Guardian/multi-profile remains excluded from MVP and requires a future explicit architecture decision.

| ID | Title | Kind | Dependencies | Labels | Size |
|---|---|---|---|---|---|
| [HS-001](#hs-001) | Governance, AGENTS, Docs and Codex Skills | coordination | Stage 2 approval | documentation | S |
| [HS-001-FE](#hs-001-fe) | Repository foundation: frontend | implementation | Stage 2 approval | documentation | M |
| [HS-003](#hs-003) | Frontend Runtime, Testing and CI Foundation | implementation | HS-001-FE | enhancement | M |
| [HS-005](#hs-005) | HealthSphere Design System and Accessible UI Primitives | implementation | HS-003, HS-001-FE | enhancement, accessibility | M |
| [HS-007](#hs-007) | Authentication and Progressive Onboarding Frontend | implementation | HS-005, HS-006 | enhancement, accessibility | L |
| [HS-009](#hs-009) | App Shell, Dashboard and Measurement Frontend | implementation | HS-007, HS-008 | enhancement, accessibility | L |
| [HS-012](#hs-012) | Risk Assessment Backend Integration and Frontend Result | coordination | HS-012-BE, HS-012-FE | enhancement | S |
| [HS-012-FE](#hs-012-fe) | Risk assessment request and explainable result UI | implementation | HS-009, HS-012-BE | enhancement, accessibility | M |
| [HS-014](#hs-014) | AI Assistant Backend + Frontend Integration | coordination | HS-014-BE, HS-014-FE | enhancement | S |
| [HS-014-FE](#hs-014-fe) | Accessible AI Assistant UI | implementation | HS-009, HS-014-BE | enhancement, accessibility | M |
| [HS-015](#hs-015) | Integrated QA, E2E, Accessibility, Security and Safety | implementation | HS-012, HS-014 | enhancement, accessibility | L |
| [HS-016](#hs-016) | Deployment and Prototype Showcase Preparation | coordination | HS-015, HS-016-FE, HS-016-BE, HS-016-AI, HS-016-AG | enhancement | M |
| [HS-016-FE](#hs-016-fe) | Deployment readiness: frontend | implementation | HS-009, HS-012-FE, HS-014-FE | enhancement | M |

# HS-001

Proposed title: **[HS-001] Governance, AGENTS, Docs and Codex Skills**

Repository: `HealthSphere-Challenge/healthsphere-frontend` · Priority: P0 · Size: S · Labels: `documentation`

## Context

Stage 2 approved the local documentation, skills and support files. Stage 3 created this live issue and authorized the foundation PR; product implementation and PR merge remain outside this stage.

## Objective

Coordinate the approved local foundation across four independent repositories.

## User / Business Value

Future work follows consistent boundaries while each repository remains understandable on its own.

## Technical Scope

Track HS-001-FE/BE/AI/AG, verify common invariants, record linked review/merge evidence. This coordination issue is hosted in frontend for delivery tracking only; it grants no global governance ownership.

Linked child drafts: `HS-001-FE`, `HS-001-BE`, `HS-001-AI`, `HS-001-AG`.

## Out of Scope

Product implementation, issue automation before approval, centralized governance repository.

## Acceptance Criteria

- [ ] All four local foundation packages reviewed against Stage 2 amendments.
- [ ] Repo-specific docs/skills preserved; no application features, training or indexing introduced.
- [ ] Child issues linked and their authorized PR/CI outcomes recorded before closure.

## Testing Requirements

Review child link/skill/hygiene/preservation evidence and cross-repository boundary consistency.

## Dependencies

- Created under the explicit Stage 3 issue-delivery approval; product implementation still requires a later execution authorization.

## ADLC Gates

Discovery → Brainstorm → Architecture Check → Plan → Ticket → Development → Unit Tests → Integration / Contract Tests → Self Review → QA → Security / Healthcare Safety → Visual QA when UI → E2E when applicable → PR → CI → Merge decision. Record nonapplicable gates with reasons. Coordination issues gather linked child evidence; they do not duplicate implementation PRs. Documentation-only HS-001 work uses document/skill/hygiene validation rather than nonexistent runtime tests.

## Definition of Done

Acceptance criteria and required checks pass; architecture, scope, documentation and compatibility are reviewed; residual risks are recorded. Applicable lint/typecheck/build and CI pass. Implementation PR targets main and is merged only after an authorized decision. A coordination issue closes only when its linked implementation/release evidence is complete; it needs no artificial code PR. No failing or unrun required check is reported as passed.

# HS-001-FE

Proposed title: **[HS-001-FE] Repository foundation: frontend**

Repository: `HealthSphere-Challenge/healthsphere-frontend` · Priority: P0 · Size: M · Labels: `documentation`

## Context

Stage 2 approved the local documentation, skills and support files. Stage 3 created this live issue and authorized the foundation PR; product implementation and PR merge remain outside this stage.

## Objective

Review and deliver the approved Stage 2 foundation in this repository.

## User / Business Value

Keeps approved decisions discoverable and prevents architecture, UX or safety drift.

## Technical Scope

AGENTS, local ADLC, frontend architecture, design reference index, design system, screen inventory, accessibility/responsive and testing docs; three specialized skills; README, ignores, env example and PR template.

## Out of Scope

Product runtime/dependencies/endpoints/tables/training/indexing.

## Acceptance Criteria

- [ ] All required repository docs and specialized skills exist with working references.
- [ ] Approved versus proposed/unresolved choices are distinguished; current implementation status is accurate.
- [ ] Existing raw data/design assets preserved byte-for-byte; examples contain no real credentials.
- [ ] Local Stage 2 work is reviewed and merged only through an authorized PR targeting main.

## Testing Requirements

Markdown link audit, skill-creator metadata validation, git diff/whitespace review, ignore/template checks and original-asset checksum preservation.

## Dependencies

- Created under the explicit Stage 3 issue-delivery approval; product implementation still requires a later execution authorization.
- Coordination membership: [HS-001](https://github.com/HealthSphere-Challenge/healthsphere-frontend/issues/2); not a blocking dependency on coordinator closure.

## ADLC Gates

Discovery → Brainstorm → Architecture Check → Plan → Ticket → Development → Unit Tests → Integration / Contract Tests → Self Review → QA → Security / Healthcare Safety → Visual QA when UI → E2E when applicable → PR → CI → Merge decision. Record nonapplicable gates with reasons. Coordination issues gather linked child evidence; they do not duplicate implementation PRs. Documentation-only HS-001 work uses document/skill/hygiene validation rather than nonexistent runtime tests.

## Definition of Done

Acceptance criteria and required checks pass; architecture, scope, documentation and compatibility are reviewed; residual risks are recorded. Applicable lint/typecheck/build and CI pass. Implementation PR targets main and is merged only after an authorized decision. A coordination issue closes only when its linked implementation/release evidence is complete; it needs no artificial code PR. No failing or unrun required check is reported as passed.

# HS-003

Proposed title: **[HS-003] Frontend Runtime, Testing and CI Foundation**

Repository: `HealthSphere-Challenge/healthsphere-frontend` · Priority: P0 · Size: M · Labels: `enhancement`

## Context

Stage 1 found no executable product, tests or CI; Stage 2 authorizes foundation/governance only. This future ticket is not implementation approval.

## Objective

Create the approved React/TypeScript development and verification environment.

## User / Business Value

Makes subsequent screens runnable and continuously checked.

## Technical Scope

Select/lock dependency tool and versions; Vite, strict TS, router/provider composition, Query/RHF/Zod boundaries, Vitest/RTL, lint/typecheck/build CI; Playwright/axe foundation with meaningful smoke coverage.

## Out of Scope

Product screens, authentication, dashboard, global state libraries without need.

## Acceptance Criteria

- [ ] Documented clean install/start/check/build commands work.
- [ ] CI checks install, lint, typecheck, unit/component and build.
- [ ] No browser configuration can contain AI/Agent credentials; minimal shell smoke behavior verified.

## Testing Requirements

Clean install, typecheck, unit/component smoke, production build, CI run and basic accessibility smoke.

## Dependencies

- `HS-001-FE` — healthsphere-frontend

## ADLC Gates

Discovery → Brainstorm → Architecture Check → Plan → Ticket → Development → Unit Tests → Integration / Contract Tests → Self Review → QA → Security / Healthcare Safety → Visual QA when UI → E2E when applicable → PR → CI → Merge decision. Record nonapplicable gates with reasons. Coordination issues gather linked child evidence; they do not duplicate implementation PRs. Documentation-only HS-001 work uses document/skill/hygiene validation rather than nonexistent runtime tests.

## Definition of Done

Acceptance criteria and required checks pass; architecture, scope, documentation and compatibility are reviewed; residual risks are recorded. Applicable lint/typecheck/build and CI pass. Implementation PR targets main and is merged only after an authorized decision. A coordination issue closes only when its linked implementation/release evidence is complete; it needs no artificial code PR. No failing or unrun required check is reported as passed.

# HS-005

Proposed title: **[HS-005] HealthSphere Design System and Accessible UI Primitives**

Repository: `HealthSphere-Challenge/healthsphere-frontend` · Priority: P0 · Size: M · Labels: `enhancement`, `accessibility`

## Context

Stage 1 found no executable product, tests or CI; Stage 2 authorizes foundation/governance only. This future ticket is not implementation approval.

## Objective

Turn reference-based design proposals into approved tokens and reusable controls.

## User / Business Value

Preserves HealthSphere identity and avoids inconsistent inaccessible screens.

## Technical Scope

Resolve font/assets/icon primitives and tokens; accessible forms/buttons/alerts/dialog/progress; public/onboarding/app layout primitives, English copy conventions and responsive states.

## Out of Scope

New visual identity, business API screens, OAuth or guardian features.

## Acceptance Criteria

- [ ] Tokens and assets are justified against Phase 0 references and permitted use.
- [ ] Controls cover keyboard/focus, disabled/loading/error/success behavior.
- [ ] Representative layouts pass 1440/1024/768/390 visual QA plus zoom/reflow checks.

## Testing Requirements

RTL interaction/state tests, axe, keyboard/focus, contrast/token measurements, responsive screenshots and build.

## Dependencies

- `HS-003` — healthsphere-frontend
- `HS-001-FE` — healthsphere-frontend

## ADLC Gates

Discovery → Brainstorm → Architecture Check → Plan → Ticket → Development → Unit Tests → Integration / Contract Tests → Self Review → QA → Security / Healthcare Safety → Visual QA when UI → E2E when applicable → PR → CI → Merge decision. Record nonapplicable gates with reasons. Coordination issues gather linked child evidence; they do not duplicate implementation PRs. Documentation-only HS-001 work uses document/skill/hygiene validation rather than nonexistent runtime tests.

## Definition of Done

Acceptance criteria and required checks pass; architecture, scope, documentation and compatibility are reviewed; residual risks are recorded. Applicable lint/typecheck/build and CI pass. Implementation PR targets main and is merged only after an authorized decision. A coordination issue closes only when its linked implementation/release evidence is complete; it needs no artificial code PR. No failing or unrun required check is reported as passed.

# HS-007

Proposed title: **[HS-007] Authentication and Progressive Onboarding Frontend**

Repository: `HealthSphere-Challenge/healthsphere-frontend` · Priority: P0 · Size: L · Labels: `enhancement`, `accessibility`

## Context

Stage 1 found no executable product, tests or CI; Stage 2 authorizes foundation/governance only. This future ticket is not implementation approval.

## Objective

Implement Phase 0 entry/onboarding and basic health-profile review/update.

## User / Business Value

Users can enter the product and build persistent context with low cognitive load.

## Technical Scope

Landing/login/register, About You/Health Background/Lifestyle/Completion, session-aware routing, basic profile review/edit, backend query/form integration. Preserve English and Phase 0 layout.

## Out of Scope

Dashboard/assessment/assistant, guardian access, new brand.

## Acceptance Criteria

- [ ] Register/login and progressive save/resume work against backend.
- [ ] Profile completion reflects actual persisted data; missing differs from none.
- [ ] Validation/session/empty/loading/error states and accessible navigation verified.
- [ ] No unimplemented OAuth/recovery or delegated-profile controls appear as working actions.

## Testing Requirements

RTL forms/routing, consumer contracts, Playwright registration/onboarding and profile update, axe/manual keyboard/zoom, reference screenshots.

## Dependencies

- `HS-005` — healthsphere-frontend
- `HS-006` — healthsphere-backend

## ADLC Gates

Discovery → Brainstorm → Architecture Check → Plan → Ticket → Development → Unit Tests → Integration / Contract Tests → Self Review → QA → Security / Healthcare Safety → Visual QA when UI → E2E when applicable → PR → CI → Merge decision. Record nonapplicable gates with reasons. Coordination issues gather linked child evidence; they do not duplicate implementation PRs. Documentation-only HS-001 work uses document/skill/hygiene validation rather than nonexistent runtime tests.

## Definition of Done

Acceptance criteria and required checks pass; architecture, scope, documentation and compatibility are reviewed; residual risks are recorded. Applicable lint/typecheck/build and CI pass. Implementation PR targets main and is merged only after an authorized decision. A coordination issue closes only when its linked implementation/release evidence is complete; it needs no artificial code PR. No failing or unrun required check is reported as passed.

# HS-009

Proposed title: **[HS-009] App Shell, Dashboard and Measurement Frontend**

Repository: `HealthSphere-Challenge/healthsphere-frontend` · Priority: P0 · Size: L · Labels: `enhancement`, `accessibility`

## Context

Stage 1 found no executable product, tests or CI; Stage 2 authorizes foundation/governance only. This future ticket is not implementation approval.

## Objective

Provide the primary authenticated dashboard and manual measurement journey.

## User / Business Value

Users can see and add their own health information in one accessible product.

## Technical Scope

Shared app navigation, minimal My Health list, add-measurement form and dashboard; known profile-driven content adaptation; backend-only data access and cache invalidation.

## Out of Scope

Advanced trends, family access, fabricated demo scores, separate persona apps.

## Acceptance Criteria

- [ ] Saved measurement appears after refresh and is tied to actual backend data.
- [ ] Empty/stale/loading/failure states are clear; deferred features are not fake actions.
- [ ] Responsive layout preserves Phase 0 identity and one-profile scope.

## Testing Requirements

RTL form/cache/error tests, backend consumer contracts, Playwright save→persisted dashboard, axe/keyboard and four-width visual QA.

## Dependencies

- `HS-007` — healthsphere-frontend
- `HS-008` — healthsphere-backend

## ADLC Gates

Discovery → Brainstorm → Architecture Check → Plan → Ticket → Development → Unit Tests → Integration / Contract Tests → Self Review → QA → Security / Healthcare Safety → Visual QA when UI → E2E when applicable → PR → CI → Merge decision. Record nonapplicable gates with reasons. Coordination issues gather linked child evidence; they do not duplicate implementation PRs. Documentation-only HS-001 work uses document/skill/hygiene validation rather than nonexistent runtime tests.

## Definition of Done

Acceptance criteria and required checks pass; architecture, scope, documentation and compatibility are reviewed; residual risks are recorded. Applicable lint/typecheck/build and CI pass. Implementation PR targets main and is merged only after an authorized decision. A coordination issue closes only when its linked implementation/release evidence is complete; it needs no artificial code PR. No failing or unrun required check is reported as passed.

# HS-012

Proposed title: **[HS-012] Risk Assessment Backend Integration and Frontend Result**

Repository: `HealthSphere-Challenge/healthsphere-frontend` · Priority: P0 · Size: S · Labels: `enhancement`

## Context

Stage 1 found no executable product, tests or CI; Stage 2 authorizes foundation/governance only. This future ticket is not implementation approval.

## Objective

Coordinate the complete real assessment journey.

## User / Business Value

Users receive an understandable result that retains the actual model evidence.

## Technical Scope

Track linked backend orchestration/persistence and frontend result issues; verify frontend→backend→AI→backend→frontend with error and provenance evidence.

Linked child drafts: `HS-012-BE`, `HS-012-FE`.

## Out of Scope

Duplicating child implementation scope, clinical scoring guarantees.

## Acceptance Criteria

- [ ] Both child implementations reviewed/merged with compatible contracts.
- [ ] Complete journey uses a real approved experimental model, not a mock fallback.
- [ ] Unavailable/ineligible cases and limitations are visible.

## Testing Requirements

Cross-repository acceptance review and integrated assessment E2E evidence from child issues.

## Dependencies

- `HS-012-BE` — healthsphere-backend
- `HS-012-FE` — healthsphere-frontend

## ADLC Gates

Discovery → Brainstorm → Architecture Check → Plan → Ticket → Development → Unit Tests → Integration / Contract Tests → Self Review → QA → Security / Healthcare Safety → Visual QA when UI → E2E when applicable → PR → CI → Merge decision. Record nonapplicable gates with reasons. Coordination issues gather linked child evidence; they do not duplicate implementation PRs. Documentation-only HS-001 work uses document/skill/hygiene validation rather than nonexistent runtime tests.

## Definition of Done

Acceptance criteria and required checks pass; architecture, scope, documentation and compatibility are reviewed; residual risks are recorded. Applicable lint/typecheck/build and CI pass. Implementation PR targets main and is merged only after an authorized decision. A coordination issue closes only when its linked implementation/release evidence is complete; it needs no artificial code PR. No failing or unrun required check is reported as passed.

# HS-012-FE

Proposed title: **[HS-012-FE] Risk assessment request and explainable result UI**

Repository: `HealthSphere-Challenge/healthsphere-frontend` · Priority: P0 · Size: M · Labels: `enhancement`, `accessibility`

## Context

Stage 1 found no executable product, tests or CI; Stage 2 authorizes foundation/governance only. This future ticket is not implementation approval.

## Objective

Present assessment requests and actual explainable experimental results.

## User / Business Value

Users understand available results and uncertainty without false certainty.

## Technical Scope

Request/result views, eligible/insufficient-data/unavailable states, result history access as scoped, provenance/limitations and method-correct contributing factors.

## Out of Scope

Invented thresholds, global-importance-as-personal-causation, medical diagnosis.

## Acceptance Criteria

- [ ] Frontend calls backend only and shows actual persisted result after refresh.
- [ ] Missing input/service failure is not displayed as low risk.
- [ ] Explanations reflect supported semantics and English uncertainty copy.

## Testing Requirements

RTL state/contract tests, Playwright actual assessment round-trip, axe/manual keyboard, reference/four-width visual QA.

## Dependencies

- `HS-009` — healthsphere-frontend
- `HS-012-BE` — healthsphere-backend

## ADLC Gates

Discovery → Brainstorm → Architecture Check → Plan → Ticket → Development → Unit Tests → Integration / Contract Tests → Self Review → QA → Security / Healthcare Safety → Visual QA when UI → E2E when applicable → PR → CI → Merge decision. Record nonapplicable gates with reasons. Coordination issues gather linked child evidence; they do not duplicate implementation PRs. Documentation-only HS-001 work uses document/skill/hygiene validation rather than nonexistent runtime tests.

## Definition of Done

Acceptance criteria and required checks pass; architecture, scope, documentation and compatibility are reviewed; residual risks are recorded. Applicable lint/typecheck/build and CI pass. Implementation PR targets main and is merged only after an authorized decision. A coordination issue closes only when its linked implementation/release evidence is complete; it needs no artificial code PR. No failing or unrun required check is reported as passed.

# HS-014

Proposed title: **[HS-014] AI Assistant Backend + Frontend Integration**

Repository: `HealthSphere-Challenge/healthsphere-frontend` · Priority: P0 · Size: S · Labels: `enhancement`

## Context

Stage 1 found no executable product, tests or CI; Stage 2 authorizes foundation/governance only. This future ticket is not implementation approval.

## Objective

Coordinate a safe end-to-end assistant exchange through backend.

## User / Business Value

Users can ask questions within their health context and see supported answers.

## Technical Scope

Track backend ownership/context integration and frontend assistant UI; reconcile Agent contract and verify real-service follow-up/safety behavior.

Linked child drafts: `HS-014-BE`, `HS-014-FE`.

## Out of Scope

Duplicating child scope, document processing or predictive scoring in Agent.

## Acceptance Criteria

- [ ] Both child implementations complete with linked compatible PRs.
- [ ] Actual frontend→backend→Agent round-trip works with sources/follow-up and explicit failure states.
- [ ] No direct frontend Agent access or invented risk values.

## Testing Requirements

Integrated assistant E2E and cross-service privacy/safety acceptance review.

## Dependencies

- `HS-014-BE` — healthsphere-backend
- `HS-014-FE` — healthsphere-frontend

## ADLC Gates

Discovery → Brainstorm → Architecture Check → Plan → Ticket → Development → Unit Tests → Integration / Contract Tests → Self Review → QA → Security / Healthcare Safety → Visual QA when UI → E2E when applicable → PR → CI → Merge decision. Record nonapplicable gates with reasons. Coordination issues gather linked child evidence; they do not duplicate implementation PRs. Documentation-only HS-001 work uses document/skill/hygiene validation rather than nonexistent runtime tests.

## Definition of Done

Acceptance criteria and required checks pass; architecture, scope, documentation and compatibility are reviewed; residual risks are recorded. Applicable lint/typecheck/build and CI pass. Implementation PR targets main and is merged only after an authorized decision. A coordination issue closes only when its linked implementation/release evidence is complete; it needs no artificial code PR. No failing or unrun required check is reported as passed.

# HS-014-FE

Proposed title: **[HS-014-FE] Accessible AI Assistant UI**

Repository: `HealthSphere-Challenge/healthsphere-frontend` · Priority: P0 · Size: M · Labels: `enhancement`, `accessibility`

## Context

Stage 1 found no executable product, tests or CI; Stage 2 authorizes foundation/governance only. This future ticket is not implementation approval.

## Objective

Provide a clear assistant interface for grounded answers and follow-up.

## User / Business Value

Users can converse without hidden uncertainty or inaccessible updates.

## Technical Scope

Conversation view/composer, actual backend integration, source links, follow-up, urgent/abstention/unavailable states and safe rendering.

## Out of Scope

Direct LLM/Agent calls, clinical certainty, document processing.

## Acceptance Criteria

- [ ] Replies and follow-ups come from backend; no canned success presented as live AI.
- [ ] Keyboard/focus and response announcements are usable.
- [ ] Urgent/uncertain/outage states display approved meaning without asserting diagnosis.

## Testing Requirements

RTL composer/state/safe-rendering tests, consumer contracts, Playwright real exchange and failure path, axe/keyboard and four-width visual QA.

## Dependencies

- `HS-009` — healthsphere-frontend
- `HS-014-BE` — healthsphere-backend

## ADLC Gates

Discovery → Brainstorm → Architecture Check → Plan → Ticket → Development → Unit Tests → Integration / Contract Tests → Self Review → QA → Security / Healthcare Safety → Visual QA when UI → E2E when applicable → PR → CI → Merge decision. Record nonapplicable gates with reasons. Coordination issues gather linked child evidence; they do not duplicate implementation PRs. Documentation-only HS-001 work uses document/skill/hygiene validation rather than nonexistent runtime tests.

## Definition of Done

Acceptance criteria and required checks pass; architecture, scope, documentation and compatibility are reviewed; residual risks are recorded. Applicable lint/typecheck/build and CI pass. Implementation PR targets main and is merged only after an authorized decision. A coordination issue closes only when its linked implementation/release evidence is complete; it needs no artificial code PR. No failing or unrun required check is reported as passed.

# HS-015

Proposed title: **[HS-015] Integrated QA, E2E, Accessibility, Security and Safety**

Repository: `HealthSphere-Challenge/healthsphere-frontend` · Priority: P0 · Size: L · Labels: `enhancement`, `accessibility`

## Context

Stage 1 found no executable product, tests or CI; Stage 2 authorizes foundation/governance only. This future ticket is not implementation approval.

## Objective

Validate the integrated MVP release against evidence from all four repositories.

## User / Business Value

The showcase demonstrates actual reliable user journeys and known limitations.

## Technical Scope

Frontend owns Playwright/axe journeys and visual/responsive evidence. Coordinate backend auth/migration/privacy, AI model/reproducibility and Agent grounding/safety reports from their implementation tickets; file repo-specific fixes rather than hide them in a vague cross-repo change.

## Out of Scope

New product features, broad refactors or pretending mocks demonstrate live integration.

## Acceptance Criteria

- [ ] Register/onboard/login, save metric, real assessment and assistant journeys pass against integrated services.
- [ ] Four-width visual QA, keyboard/zoom/contrast and automated accessibility checks recorded.
- [ ] All repository CI/security/safety evidence reviewed; unresolved blocking findings prevent release.
- [ ] Residual risks and unrun checks documented without false success claims.

## Testing Requirements

Playwright/axe, manual acceptance/visual/keyboard, cross-user security paths, actual service outage states, model provenance and safety fixture review.

## Dependencies

- `HS-012` — healthsphere-frontend
- `HS-014` — healthsphere-frontend

## ADLC Gates

Discovery → Brainstorm → Architecture Check → Plan → Ticket → Development → Unit Tests → Integration / Contract Tests → Self Review → QA → Security / Healthcare Safety → Visual QA when UI → E2E when applicable → PR → CI → Merge decision. Record nonapplicable gates with reasons. Coordination issues gather linked child evidence; they do not duplicate implementation PRs. Documentation-only HS-001 work uses document/skill/hygiene validation rather than nonexistent runtime tests.

## Definition of Done

Acceptance criteria and required checks pass; architecture, scope, documentation and compatibility are reviewed; residual risks are recorded. Applicable lint/typecheck/build and CI pass. Implementation PR targets main and is merged only after an authorized decision. A coordination issue closes only when its linked implementation/release evidence is complete; it needs no artificial code PR. No failing or unrun required check is reported as passed.

# HS-016

Proposed title: **[HS-016] Deployment and Prototype Showcase Preparation**

Repository: `HealthSphere-Challenge/healthsphere-frontend` · Priority: P0 · Size: M · Labels: `enhancement`

## Context

Stage 1 found no executable product, tests or CI; Stage 2 authorizes foundation/governance only. This future ticket is not implementation approval.

## Objective

Coordinate an approved deployable prototype and truthful showcase.

## User / Business Value

Evaluators can access a working demonstrator with clear experimental limits.

## Technical Scope

Record hosting/deadline/provider decisions, service release revisions and URLs, integrated smoke/rollback evidence; prepare synthetic demo account/data and five-minute English showcase outline according to confirmed challenge requirements. Repo-specific deployment work is in children.

Linked child drafts: `HS-016-FE`, `HS-016-BE`, `HS-016-AI`, `HS-016-AG`.

## Out of Scope

Unapproved hosting spend, automatic publication, claims beyond measured functionality.

## Acceptance Criteria

- [ ] Hosting, credentials/provisioning and publication scope explicitly approved before deployment.
- [ ] All four deployment children ready, integrated QA passes and release smoke succeeds.
- [ ] English showcase demonstrates actual functionality and clearly states experimental ML/known limits.
- [ ] Deployment/runbook and rollback references are linked; no sensitive data published.

## Testing Requirements

Live HTTPS smoke and core journeys, failure/rollback rehearsal where practical, synthetic-data/secret review and timed showcase rehearsal.

## Dependencies

- `HS-015` — healthsphere-frontend
- `HS-016-FE` — healthsphere-frontend
- `HS-016-BE` — healthsphere-backend
- `HS-016-AI` — healthsphere-ai
- `HS-016-AG` — healthsphere-agent

## ADLC Gates

Discovery → Brainstorm → Architecture Check → Plan → Ticket → Development → Unit Tests → Integration / Contract Tests → Self Review → QA → Security / Healthcare Safety → Visual QA when UI → E2E when applicable → PR → CI → Merge decision. Record nonapplicable gates with reasons. Coordination issues gather linked child evidence; they do not duplicate implementation PRs. Documentation-only HS-001 work uses document/skill/hygiene validation rather than nonexistent runtime tests.

## Definition of Done

Acceptance criteria and required checks pass; architecture, scope, documentation and compatibility are reviewed; residual risks are recorded. Applicable lint/typecheck/build and CI pass. Implementation PR targets main and is merged only after an authorized decision. A coordination issue closes only when its linked implementation/release evidence is complete; it needs no artificial code PR. No failing or unrun required check is reported as passed.

# HS-016-FE

Proposed title: **[HS-016-FE] Deployment readiness: frontend**

Repository: `HealthSphere-Challenge/healthsphere-frontend` · Priority: P0 · Size: M · Labels: `enhancement`

## Context

Stage 1 found no executable product, tests or CI; Stage 2 authorizes foundation/governance only. This future ticket is not implementation approval.

## Objective

Prepare this service for the approved integrated prototype release.

## User / Business Value

The service can be deployed and recovered consistently within its existing boundary.

## Technical Scope

Build/hosting configuration, backend public origin, SPA route refresh, approved assets/security headers and frontend run/rollback notes. Configuration preparation can precede HS-015; actual publication requires passing HS-015 and an explicitly approved hosting/deployment plan.

## Out of Scope

Unapproved publication/spend, new service boundaries or product features.

## Acceptance Criteria

- [ ] HTTPS frontend loads/deep-links and calls only approved backend; bundle contains no credentials.
- [ ] Document verified run/configuration/health/rollback steps with release revisions.
- [ ] Use synthetic demo data and an approved secrets mechanism; no production claims.

## Testing Requirements

Production build, deployed route/API smoke, bundle/config review and rollback check.

## Dependencies

- `HS-009` — healthsphere-frontend
- `HS-012-FE` — healthsphere-frontend
- `HS-014-FE` — healthsphere-frontend
- HS-015 (frontend) and approved hosting/publication plan gate actual deployment; configuration preparation may proceed earlier.

## ADLC Gates

Discovery → Brainstorm → Architecture Check → Plan → Ticket → Development → Unit Tests → Integration / Contract Tests → Self Review → QA → Security / Healthcare Safety → Visual QA when UI → E2E when applicable → PR → CI → Merge decision. Record nonapplicable gates with reasons. Coordination issues gather linked child evidence; they do not duplicate implementation PRs. Documentation-only HS-001 work uses document/skill/hygiene validation rather than nonexistent runtime tests.

## Definition of Done

Acceptance criteria and required checks pass; architecture, scope, documentation and compatibility are reviewed; residual risks are recorded. Applicable lint/typecheck/build and CI pass. Implementation PR targets main and is merged only after an authorized decision. A coordination issue closes only when its linked implementation/release evidence is complete; it needs no artificial code PR. No failing or unrun required check is reported as passed.
