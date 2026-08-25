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

## ✨ Features

PayFlow is a powerful, robust, and scalable solution that leverages cutting-edge
technology to deliver a seamless experience for developers and businesses alike.
Whether you are a small startup or a large enterprise, PayFlow has you covered! 🚀

- ✅ **Powerful**: Built with modern best practices in mind.
- ✅ **Robust**: Designed to handle all your invoicing needs.
- ✅ **Scalable**: Grows with your business seamlessly.
- ✅ **Easy to use**: Simple and intuitive API for developers.
- ✅ **Secure**: Security is our top priority at all times.
- ✅ **Fast**: Blazing fast performance out of the box.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request. We appreciate
all contributions, big or small. Together, we can make PayFlow even better! 💪

## 📝 License

This project is licensed under the terms described in the license file. Please refer
to the license file for more information about your rights and responsibilities.
