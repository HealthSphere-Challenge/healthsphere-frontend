# Experimental health risk assessment

The dashboard consumes only the authenticated backend routes `POST /api/v1/assessments`, `GET /api/v1/assessments`, and the dashboard's `latest_assessment`. The POST has no body: the backend constructs model inputs from the authoritative profile and measurements. The frontend never calls the AI service or constructs ML features.

The dashboard presents a neutral empty state, a pending state with duplicate submission disabled, completed results, insufficient data with links to the existing profile or blood pressure flows, adult ineligibility, temporary service unavailability, canonical API failures, and lightweight persisted history. A completed result is labeled “Experimental model score” and rendered as a value out of 100. It has no probability claim, category, threshold, clinical interpretation, or recommendation.

Every result keeps visible limitations: the model is not clinically calibrated or validated, was trained on synthetic Synthea health records, and does not provide diagnosis, medical advice, treatment, or emergency guidance. The secondary result details show the five-year model horizon and localized creation time.

## Local full-stack smoke test

1. Start PostgreSQL using the backend's documented local setup.
2. Start `healthsphere-ai`.
3. Start `healthsphere-backend`.
4. Start this repository with `npm run dev`.
5. Register or log in, complete an adult profile, and add one paired blood pressure measurement. Heart rate and weight are optional additions.
6. From the dashboard, run an assessment and verify the experimental score and limitations.
7. Refresh and verify the latest persisted result remains visible; verify the assessment history below it.

Frontend CI uses mocked backend responses and does not require a live AI service, Synthea, or the Agent.
