# Microsoft Entra ID – Interactive Concept Map

Single-page React + Vite + D3 v7 + Tailwind CSS v3 web app that visualizes Microsoft **Entra ID** components, their relationships, deployment phases, and resource coverage across five interchangeable views — including a cinematic Story View for client-facing storytelling.

Forked architecturally from [purview-interactive-map](https://github.com/jcastanedacano/purview-interactive-map); the domain layer (`src/data/*`) has been fully rewritten for the Entra ID stack.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static bundle to ./dist
```

No backend, no API keys. All data is hardcoded under `src/data/`.

---

## What's in the app

### Five views, same model

| View | Purpose |
|---|---|
| **Story** | Default landing. Cinematic scene-by-scene narratives covering Zero Trust, NIST IA, ISO/NIS2, AiTM attacks, password spray, SP credential leak, passwordless rollout, JML automation, GSA, B2B governance, Verified ID. |
| **Scenario** | Drag-and-drop builder. Compose your own identity scenarios from the component library; auto-link by the Entra catalog (data/signal/policy/escalation) or wire manually. |
| **Grid** | Domain bands layout — 5 horizontal bands (Core, Access & Auth, Governance & Protection, Workload & External, Network & Ecosystem) with periodic-table identity cards. |
| **Graph** | D3 force-directed layout with convex-hull category blobs. |
| **Mindmap** | Horizontal tree from root *Microsoft Entra ID* with ecosystem branches on the left and cross-cutting dashed edges. |

---

## Domain content

- **~34 components** across 8 categories: Core Identity, Access & Auth, Governance, Protection, Workload Identities, External, Global Secure Access, Ecosystem.
- **~75 typed edges** (Data / Signal / Policy / Escalation).
- **17 pre-built scenarios** across 4 groups (Framework, Use case, Deployment, Identity flow).
- **13 stories** with 3 scenes each (Zero Trust, NIST IA, ISO/NIS2, AiTM, Password Spray, SP Credential Leak, Passwordless rollout, JML automation, GSA replaces VPN, Sign-in flow, JIT Global Admin, B2B governance, Verified ID onboarding).

All content validated against Microsoft Learn (May 2026). `learnUrl` per component links the official docs.

---

## Resource coverage axis

Where Purview tracks M365 workloads (Exchange, SharePoint, OneDrive…), Entra tracks **the resources it protects**:

`M365 · Azure · Federated SaaS · On-Prem AD/Apps · Devices · Workload IDs · External Users`

---

## Deployment

Hosted on Azure Static Web Apps (Free tier) with GitHub Actions auto-deploy on push to `main`.

- **Resource group:** `rg-entra-id-map` (East US 2)
- **Static Web App:** `swa-entra-id-map`
- **Workflow:** `.github/workflows/azure-static-web-apps.yml`
- **Secret:** `AZURE_STATIC_WEB_APPS_API_TOKEN`

---

## Stack

- React 18 + Vite 5
- D3 v7 (forceSimulation, tree, hierarchy, polygonHull, zoom, drag)
- Tailwind CSS v3
- lucide-react (icons)
- No TypeScript, no Router, no Redux

---

## Notes

- The 75-edge catalog captures the most common relationships in the Entra stack; extend in `src/data/edges.js`.
- Coverage matrix and deployment phases are hand-curated — validate against current Microsoft Learn before customer-facing material.
- Icons fall back to lucide-react when `/public/icons/{id}.svg` is missing.
