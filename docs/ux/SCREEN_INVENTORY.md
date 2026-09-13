# Screen inventory

Status: no screens implemented. Routes below are proposals to finalize in the relevant ticket. One account has one health profile; English MVP. Phase 0 pages remain the visual starting point.

| Area / screen | Proposed route | Evidence / priority / ticket |
|---|---|---|
| Landing | `/` | Phase 0 page 1; MVP entry; HS-007 |
| Login | `/login` | Phase 0 page 2; P0 HS-007 |
| Register | `/register` | Phase 0 page 3; P0 HS-007 |
| About You | `/onboarding/about` | Phase 0 page 4; P0 HS-007 |
| Health Background | `/onboarding/health` | Phase 0 page 5; P0 HS-007 |
| Lifestyle | `/onboarding/lifestyle` | Phase 0 page 6; P0 HS-007 |
| Completion | `/onboarding/complete` | Phase 0 page 7; P0 HS-007 |
| App Shell / Dashboard | `/app` | Shared persona layout; P0 HS-009 |
| My Health / Add Measurement | `/app/health`, `/app/health/new` | P0 HS-009; minimal list/entry |
| Metric Details / Trends | `/app/health/:metric`, `/app/trends` | Advanced 7/30-day screens deferred P1 |
| Risk Assessment / Result | `/app/assessments/new`, `/app/assessments/:id` | P0 HS-012-FE; eligibility/missing-data states |
| AI Assistant | `/app/assistant` | P0 HS-014-FE; follow-up, urgent, unavailable states |
| Health Profile | `/app/profile` | Basic profile review/update P0 HS-007; extended preferences P1 |
| Settings / Accessibility | `/app/settings`, `/app/accessibility` | Baseline accessibility built into P0; extended preference screens P1 |
| Medical Documents | `/app/documents` | Upload/processing/result/low-confidence deferred P1 |
| Recommendations / Progress / Timeline | `/app/recommendations`, `/app/progress`, `/app/timeline` | Expansion deferred P1 |
| Forgot Password / Google sign-in | Unassigned | Shown in references; not approved MVP capabilities |
| Women's Health | Unassigned | Deferred P1; explicit scope/consent decision required |
| Family / Guardian / multi-profile | None | Excluded MVP; persona reference grants no authorization |

## Required screen states

All data screens cover loading, empty, error, stale/unavailable data, success and access/session failure as applicable. Forms cover invalid input, field help, pending save, duplicate submission and retained data on error. Assessments distinguish no history, insufficient input, ineligible population and service unavailable without fake scores. Assistant distinguishes follow-up, grounded answer, abstention, urgent guidance and provider failure.

## Adaptive product rules

Adult woman, adult man, adolescent and older adult are personas within one system. Content relevance must come from available profile data or explicit user preference. Do not implement guardian access or age-specific medical scoring from images. Larger text and simplified layouts support all users. Actual age eligibility and sensitive-field policy remain unresolved for HS-006/010.
