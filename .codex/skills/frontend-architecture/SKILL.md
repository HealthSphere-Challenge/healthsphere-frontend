---
name: frontend-architecture
description: "Plan or review HealthSphere routes, feature structure, API access and state ownership."
---

# Frontend Architecture

Read the active approved ticket and relevant repository instructions first. This skill does not expand authorization.

- [Frontend Architecture](../../../docs/architecture/FRONTEND_ARCHITECTURE.md)

## Workflow

Trace the change from route/view through feature hooks to the backend transport. Verify that no browser request or public configuration points to AI or Agent. Assign server state to TanStack Query, forms to React Hook Form/Zod and local presentation state to components. Check cache invalidation and user-cache clearing on logout. Keep primitives free of domain fetching and avoid duplicate business rules. Identify backend contract consumers before a shape change; coordinate fixture/version changes instead of masking incompatible data.
