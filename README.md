# HealthSphere — Accessible React web client

## Foundation status

The HS-003 executable foundation provides the React/Vite runtime, strict TypeScript, provider/router composition, backend API boundary, automated tests and pull-request CI. The existing Phase 0 PDF and Phase 1 PNG remain visual references; product screens are not implemented by this foundation.

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

Requires Node.js 24 and npm 11. `.env` is ignored and must never be committed. The default same-site backend path is `/api/v1`. During `npm run dev`, Vite proxies `/api` to the backend at `http://127.0.0.1:8000`, so start the backend on that address first. Copy `.env.example` only when a local override is needed.

```bash
npm ci
npm run dev
```

Run all foundation checks:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

Browser configuration may contain only the backend API base URL. Never add AI/Agent URLs, credentials, or secrets. Use short-lived branches → PR → main, no develop; no silent merge.

## HealthSphere Assistant (HS-014)

Authenticated users can open `/app/assistant` to ask general health-information questions
and reopen recent conversations. The browser calls only the backend conversation API. It
sends message text, conversation ID, and an optional assessment ID from the dashboard's
“Ask about this result” action; it never builds medical context or calls the Agent directly.

The interface preserves answer, follow-up, abstention, and urgent states. Returned sources
are displayed with the response, urgent content uses alert semantics, and generation is
announced through a live status message. The composer supports Enter to send, Shift+Enter
for a new line, a 2,000-character limit, and duplicate-submit prevention.

For local testing, configure and run the backend first, then use `npm run dev`. Unit and
schema tests use `npm test`; the mocked Chromium journey uses `npm run test:e2e`. A live
full-stack smoke test additionally requires PostgreSQL and a configured Agent provider.
