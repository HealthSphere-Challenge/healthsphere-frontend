# HealthSphere — Accessible React web client

## Current status — Stage 3

Foundation/governance only, delivered for review on 2026-09-13. The existing Phase 0 PDF and Phase 1 PNG are visual references, not implemented screens. No React runtime, dependency manifest, tests or CI exists yet. Documentation, repo-local skills and support templates describe future approved work; there are no application install/run commands to execute yet.

Exactly four independent repositories: browser → frontend → backend → PostgreSQL; backend → AI and backend → Agent. Frontend never calls specialized services directly. Backend owns application data/access, while each repository owns its own architecture/governance. Cross-repository delivery belongs in GitHub Issues/Project after approval.

One account = one health profile; English MVP. Guardian/family/multi-profile access is excluded. ML is experimental and cannot claim clinical validity. Agent never creates predictive scores. See [AGENTS.md](AGENTS.md) before work.

## Documentation

- [Frontend Architecture](docs/architecture/FRONTEND_ARCHITECTURE.md)
- [Readme](docs/design-reference/README.md)
- [Adlc](docs/engineering/ADLC.md)
- [Testing Strategy](docs/testing/TESTING_STRATEGY.md)
- [Accessibility And Responsive](docs/ux/ACCESSIBILITY_AND_RESPONSIVE.md)
- [Design System](docs/ux/DESIGN_SYSTEM.md)
- [Screen Inventory](docs/ux/SCREEN_INVENTORY.md)
- [Proposed GitHub issues](docs/planning/PROPOSED_ISSUES.md)

## Local configuration and delivery

`.env.example` documents placeholders only; `.env` is ignored and must never be committed. Runtime tickets must validate required configuration before startup. Use short-lived branches → PR → main, no develop; no silent merge. The approved roadmap exists as live GitHub issues; issues coordinate work but do not by themselves authorize implementation.
