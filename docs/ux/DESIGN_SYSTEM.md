# HealthSphere design system

Status: visual observations and proposed implementation baseline, not executable tokens. Validate token choices during HS-005 against the preserved references and accessibility checks.

## Observed identity

Teal primary actions and accents; dark navy text; white surfaces; pale aqua illustration backgrounds; muted blue-gray secondary text and fine neutral borders. Sans-serif type uses clear medium/bold headings and readable body copy. Public screens have broad whitespace, a top navigation, two-column illustration/form compositions and modestly rounded controls. Onboarding uses numbered/completed steps, labeled fields, a back action and a clear primary continuation action. The completion screen centers a success state and profile progress.

Authenticated Phase 1 concepts use a shared left navigation, recent metrics, a restrained assessment/trend area and supporting assistant/content actions. Persona variants suggest relevance and text-size adaptation, not four separate applications.

## Proposed baseline requiring visual validation

| Area | Starting proposal | Approval/verification needed |
|---|---|---|
| Color roles | brand/action teal; ink navy; surface white; subtle aqua; border neutral; independent status roles | Exact hex values unresolved; measure contrast before approval |
| Typography | 16 px body baseline, 1.5 line-height; compact app headings; public hero scale separate | Font family/weights and scale unresolved; verify 200% text resizing |
| Spacing | 4 px base with 8/12/16/24/32/48 px steps | Compare screen rhythm; values are proposals, not extracted measurements |
| Radius | Modest consistent input/button and panel radii | Exact values unresolved; avoid excessive pill/card styling |
| Width | Centered fluid public container; readable form column; adaptive app content | Exact max-width unresolved; do not copy image pixels as CSS dimensions |
| Icons | One accessible vector icon family, text labels for meaning | Package and asset rights unresolved; no emoji product icons |
| Elevation | Fine borders and whitespace first; subtle elevation only for necessary layering | No glow, glassmorphism, decorative KPI overload or card-inside-card proliferation |

## Component contract

Use cohesive primitives for button/link, labeled input, password visibility, textarea, checkbox, radio group, select, inline error, alert, dialog and progress stepper. A link navigates; a button acts. Keep domain queries out of primitives. Forms display units explicitly, associate help/errors with controls, retain input after a failed save, and focus meaningful error feedback.

Every interactive primitive must define default, hover, focus-visible, active and disabled behavior; operations also define loading, success and error behavior. Empty and unavailable content is explicit. Skeletons are optional and must not manufacture health values. Unknown is different from none, zero, normal or complete.

Use card containers only to group meaningful content. Charts include text/table alternatives and do not imply causation. Status labels require a validated backend/AI meaning; example percentages, ranges and diagnoses in references are not thresholds. Never render global model importance as patient-specific causal contributions.

## Navigation and adaptation

Public top navigation and onboarding steps retain the Phase 0 rhythm. Authenticated navigation groups health, assistant and account actions; deferred screens are not misleading active links. Mobile transforms navigation and column order deliberately. English copy is concise and plain-language. Do not infer consent, appearance or medical eligibility from persona artwork.

Keep medical uncertainty visible near an assessment/result. Respect reduced motion; decorative celebration is not required. See [responsive/accessibility](ACCESSIBILITY_AND_RESPONSIVE.md) and [screen inventory](SCREEN_INVENTORY.md).
