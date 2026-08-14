# PayFlow

PayFlow is a lightweight invoicing & payments API for small SaaS teams. It exposes a
REST API (Node.js / TypeScript / Express) backed by PostgreSQL, plus a Python
"risk-engine" microservice that scores transactions and renders invoice previews.

## Architecture

```
                    ┌─────────────────────────┐
   client ────────▶ │  api (Express / TS)     │ ──── PostgreSQL
                    │  - auth / sessions      │
                    │  - invoices / payments  │
                    │  - webhooks / files     │
                    └───────────┬─────────────┘
                                │  HTTP
                                ▼
                    ┌─────────────────────────┐
                    │  risk-engine (Flask)    │
                    │  - fraud scoring        │
                    │  - invoice rendering    │
                    └─────────────────────────┘
```

## Getting started

```bash
npm install
npm run build
npm start                 # api on :3000

cd services/risk-engine
pip install -r requirements.txt
python main.py            # risk-engine on :8000
```

Infrastructure (Terraform + Kubernetes manifests) lives under `infra/`.

## Services & endpoints

| Area      | Path prefix        | Notes                                   |
|-----------|--------------------|-----------------------------------------|
| Auth      | `/auth`            | register, login, session cookies        |
| Users     | `/users`           | profile, avatars, team membership       |
| Invoices  | `/invoices`        | CRUD, search, PDF/preview rendering      |
| Payments  | `/payments`        | charge, refund, payout                   |
| Webhooks  | `/webhooks`        | outbound delivery, link previews         |
| Files     | `/files`           | attachment upload/download               |
| Admin     | `/admin`           | internal tooling, diagnostics            |
