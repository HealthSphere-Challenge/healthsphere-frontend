# Backend API consumer contract

Status: **APPROVED CONTRACT.** Authentication, measurements, dashboard, and assessment consumers are implemented. Agent behavior remains pending its approved implementation stage.

Contract revision: `phase1-hs002-2026-09-13`. Backend Pydantic/OpenAPI is authoritative for `/api/v1`; frontend owns strict TypeScript types and Zod runtime consumer schemas. A generated OpenAPI TypeScript client is deferred.

## Boundary and transport

The browser calls only the backend. It never calls AI, Agent, PostgreSQL, or an LLM provider. Prefer same-site routing. An approved cross-origin setup must use explicit trusted origins and credentialed requests; wildcard `*` is invalid with credentials.

The backend session cookie is opaque, `Secure`, `HttpOnly`, and `SameSite=Lax`; JavaScript cannot read it. The server stores only a cryptographic hash. The approved session lifetime is 7 days absolute and 24 hours idle, with concurrent sessions allowed. State-changing requests send the session-bound `X-CSRF-Token`; token bootstrap/delivery is **PENDING HS-006**.

JSON uses `snake_case`. IDs are UUIDv4. Instants are RFC 3339 UTC with milliseconds. Submitted observation times include `Z` or an explicit offset. Dates use `YYYY-MM-DD`. Lists use `{ "items": [...], "next_cursor": string | null }`; cursors are opaque. `X-Request-ID` is retained for error/support correlation.

## Consumer state rules

- Validate every success and error body with Zod at the transport boundary before storing server state in TanStack Query.
- Treat omitted partial-update fields as unchanged, explicit nullable fields as cleared, `[]` as reported none, and `null` as unknown/not supplied.
- Clear user-scoped query caches after logout or authentication loss.
- Do not automatically retry state-changing requests. Read retry policy remains an implementation decision and must respect server errors.
- Preserve explicit `insufficient_data`, `ineligible`, and `unavailable` assessment states. Never render them as zero or low risk.
- Preserve Agent `answer`, `follow_up`, `abstention`, and `urgent` states. Never convert abstention, urgency, or dependency failure into an ordinary assistant answer.
- Use backend-provided latest weight and BMI projections. Do not submit BMI or calculate a competing authoritative BMI in the browser.
- Treat canonical units as fixed input/output: `bpm`, `mmHg`, `kg`, `kg/m2`, `mg/dL`, and `min`.

## Canonical error example

```json
{
  "error": {
    "code": "validation_error",
    "message": "The request could not be validated.",
    "details": [{"path": "body.measured_at", "code": "invalid_timestamp", "message": "Provide an RFC 3339 timestamp with an explicit offset."}],
    "request_id": "c4a760a8-7d0b-4f98-9652-244be1ebcc2e",
    "retry_after_seconds": null
  }
}
```

The UI may map stable codes to approved presentation copy. It must retain field paths for accessible form errors and must not expose raw downstream details.

## Typed resource examples

### Partial profile update

```json
{"sex_at_birth": null, "medical_conditions": [], "allergies": ["peanut"]}
```

Minimum account age is 18. Younger users are unsupported. `sex_at_birth` is optional, sensitive, limited to `female`, `male`, `intersex`, or `prefer_not_to_say`, and never inferred. Structured medical history vocabularies remain **PENDING HS-006**.

### Measurement create

```json
{
  "metric": "blood_pressure",
  "value": {"systolic": 118, "diastolic": 76},
  "unit": "mmHg",
  "context": null,
  "measured_at": "2026-09-12T07:30:00.000Z",
  "source": "manual",
  "note": null
}
```

Blood pressure is one paired observation. Approved metrics are `heart_rate`, `blood_pressure`, `weight`, derived `bmi`, `blood_glucose`, `sleep_duration`, and `physical_activity_duration`. BMI is rejected as manual input. No clinical normal/risk thresholds are approved.

### Paginated empty result

```json
{"items": [], "next_cursor": null}
```

### Assessment

```json
{
  "id": "c63f9048-9510-4eb5-8c0d-73bb5cb3fe8b",
  "status": "insufficient_data",
  "result": null,
  "reason": {"code": "minimum_inputs_missing", "missing_fields": ["systolic", "diastolic"]},
  "created_at": "2026-09-13T09:05:43.000Z"
}
```

Completed results use target `incident_essential_hypertension_5y_v1`, a 1,825-day horizon, score type `uncalibrated_experimental_probability_estimate`, `calibrated: false`, and `data_source_type: synthetic_model`. The UI presents the value only as an experimental model score, never as a clinical probability or category. Non-completed states have no result and remain distinct from zero.

### Assistant message pending HS-013

```json
{
  "id": "a9ee0383-7f46-49de-b5b8-0c89ba323714",
  "role": "assistant",
  "content": "Several habits and health factors can affect sleep duration.",
  "response_type": "answer",
  "sources": [],
  "safety": {"urgent": false, "reason": null},
  "uncertainty": "General information only; this does not determine the cause for an individual.",
  "created_at": "2026-09-13T09:06:08.000Z"
}
```

The shape is stable; source details, safety reasons, exact copy, and content limits are **PENDING HS-013**. Conversations are retained for 30 days from creation in the prototype and must be user-deletable.

## Contract tests

Feature tickets will commit small synthetic backend response fixtures beside frontend consumers and pin the contract revision. Zod tests cover every union member, canonical units, UUIDs, timestamps, pagination, null/empty/omitted semantics, and malformed/error states. Producer validation in backend and consumer validation here must both pass before a coordinated schema change ships. No fifth shared contract repository is created.
