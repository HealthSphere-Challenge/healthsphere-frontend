# Frontend architecture

Status: HS-003 implements the runtime composition and technical root/not-found routes. Product routes and screens remain planned under their feature tickets.

## Ownership and stack

Browser → healthsphere-frontend → healthsphere-backend → PostgreSQL / AI / Agent. The frontend accesses only the backend over HTTPS/REST. It owns presentation, accessible interaction and visualization, not authorization enforcement, clinical rules or predictive scoring.

Target: Node.js 24 LTS, npm with a committed lockfile, React, Vite, strict TypeScript, React Router, TanStack Query, React Hook Form and Zod. Exact package versions are selected and tested during HS-003. Use accessible primitives; the primitive/chart packages and exact font remain unresolved until HS-003/005. No global state library without a concrete documented need. See the [API consumer contract](API_CONSUMER_CONTRACT.md).

## Planned structure and dependencies

- `src/app/`: composition, providers, router, top-level boundaries.
- `src/features/<feature>/`: feature views, hooks, form schemas, tests and backend query adapters.
- `src/components/ui/`: reusable presentation primitives with no domain fetching.
- `src/layouts/`: public, onboarding and authenticated shells.
- `src/api/`: configured backend transport and contract/error mapping.
- `src/assets/`, `src/config/`: approved assets and public environment configuration.

Views use feature hooks; hooks use the backend transport. UI primitives never import feature services. Keep business rules on the backend; client checks improve feedback but never replace server validation. Avoid duplicate page/feature hierarchies, generic service frameworks and unrelated abstractions.

## Routing and state

Public routes cover landing/login/register. Progressive onboarding and app routes use session-aware boundaries; backend remains the authorization authority. Deep-link refresh, unknown routes, expired sessions, and return-to navigation must be tested. Concrete paths and redirect semantics are proposed in the screen inventory and finalized in tickets.

TanStack Query owns server state, cache invalidation and request lifecycle. React Hook Form owns transient forms; Zod validates forms and external boundaries. Component state owns local display state. Derive values instead of duplicating state. Do not persist health responses or credentials in browser storage by default; persistence requires a privacy decision. Logout clears user-scoped cached data. Avoid retrying non-idempotent writes without a defined contract.

## API boundary

Only `VITE_API_BASE_URL` may address the application backend; Vite configuration is public and contains no secrets. No AI/Agent URLs or credentials in browser code. Before implementation, coordinate HS-002 request/response fixtures and error semantics with the backend. Transport should distinguish unavailable service, validation errors, authorization failures and stale data without leaking internals.

The approved API uses `/api/v1`, opaque cursor pagination, an opaque `Secure`/`HttpOnly`/`SameSite=Lax` session cookie, and session-bound CSRF for state-changing requests. Frontend begins with hand-maintained strict TypeScript types plus Zod runtime schemas; OpenAPI client generation is deferred. Frontend contract fixtures must pin the backend contract revision and cannot fabricate a successful risk assessment when the AI is unavailable.

## Product constraints

One account = one health profile; minimum account age is 18, and younger users and guardian/delegated/family access are unsupported in the MVP. English MVP. Adolescent and older-adult references inform future/adaptive presentation, not separate applications, access rights or automatic sex-based themes. Personalization uses known data and explicit preferences; unsupported populations receive no invented assessment.

Read [design system](../ux/DESIGN_SYSTEM.md), [screen inventory](../ux/SCREEN_INVENTORY.md), [responsive/accessibility](../ux/ACCESSIBILITY_AND_RESPONSIVE.md) and [testing](../testing/TESTING_STRATEGY.md) before a screen plan.
