# HealthSphere brand system

Status: HS-017 implementation baseline.

## Canonical asset

`src/assets/brand/healthsphere-logo.png` is the supplied official horizontal source and is the only product mark. The UI serves its lossless WebP derivative to reduce transfer size without changing pixels. Do not redraw, recolor, crop, distort, typeset, or approximate it with CSS. `BrandLogo` renders the asset and `Brand` provides its accessible home link.

The image keeps its intrinsic 2172 × 724 dimensions and 3:1 aspect ratio. CSS changes only its rendered height. Keep clear space around it at least equal to one quarter of its rendered height. Use it on light, uncluttered surfaces where the navy and turquoise artwork remains legible.

## Product placement

- Public and onboarding headers: horizontal logo at 40 px high; 32 px at the narrowest mobile width.
- Authenticated sidebar: horizontal logo at 36 px high.
- Authenticated mobile header: horizontal logo at 32 px high.
- Keep the entire logo within its link focus outline and preserve the 44 px interaction target.

The linked logo has the accessible name “HealthSphere home.” The image itself has empty alternative text so screen readers do not announce the brand twice.

## Symbol and application icon

No standalone symbol file was supplied. Do not approximate or crop one for navigation or favicon use. A dedicated symbol/favicon export can be added only after an authoritative asset is supplied or an explicit derivative is approved.

## Photography

Supplied people photography is stored under `src/assets/people/` and remains unused by HS-017. HS-018 and HS-019 own placement, neutral alternative text, responsive crops, and loading strategy. Do not infer health status or describe photographed people as HealthSphere users or patients.
