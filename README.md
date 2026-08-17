# SoulPlus AI

SoulPlus AI is a TypeScript / React application focused on generating, visualizing, and enriching predictive insight ("destiny") charts. The goal is to evolve this MVP into production‑grade native iOS and Android apps backed by secure Azure services and AI-driven capabilities.

## Vision

Transform raw time-series and user input data into actionable, personalized insight charts powered by an AI interpretation and recommendation engine. Provide consistent logic layers shared across web and mobile, enabling rapid feature parity and future extensibility.

## High-Level Architecture

```
root
├─ src/                 # React web UI layer (presentation + hooks)
├─ packages/
│  ├─ core/            # Pure business/domain logic (stateless, tested)
│  ├─ data/            # API clients, persistence abstractions
│  ├─ ai/              # Prompt templates, guardrails, evaluation harness
│  └─ mobile-shared/   # (Planned) Cross-platform view models & adapters
├─ scripts/             # Operational scripts (e.g., data ingestion to Azure AI)
├─ public/              # Static assets
├─ docs/                # Architecture, AI, mobile, security, roadmap
├─ .github/
│  ├─ workflows/        # CI/CD (build, test, lint, security scans)
│  ├─ ISSUE_TEMPLATE/   # Standardized issue forms
│  └─ PULL_REQUEST_TEMPLATE.md
└─ job-description.html # Recruiting: Senior Full-Stack & Mobile Engineer
```

### Logical Layers

1. Presentation (src/, later mobile clients)
2. View Models / Adapters (planned mobile-shared) decouple UI from domain
3. Domain / Core (packages/core) pure TypeScript functions
4. Data Access (packages/data) REST/GraphQL/Azure endpoints, caching, offline strategy
5. AI Layer (packages/ai) prompt building, response parsing, evaluation metrics
6. Infrastructure & Ops (scripts/, CI workflows, deployment descriptors)

### Technology Stack

- Frontend: React, TypeScript, Tailwind CSS, shadcn-ui
- Bundler: Vite
- Mobile (planned): React Native (Expo → bare if needed)
- Backend: Supabase (PostgreSQL, Auth, Row Level Security)
- AI: **Azure AI Foundry** (GPT-4o/4.1 for matrix insights), Azure OpenAI (planned: evaluation)
- Security: Supabase Auth (email/OAuth), Azure AD B2C (planned), Key Vault (secrets), RBAC, audit logging
- Testing: Jest, React Testing Library, (planned) Detox for mobile, contract tests (OpenAPI)
- DevOps: GitHub Actions, CodeQL, Dependabot, secret scanning, Azure Static Web Apps
- Automation & Productivity: GitHub Copilot agent mode, Copilot Chat, PR Assist

### ✨ New: AI-Powered Matrix Insights

We've integrated **Azure AI Foundry** to provide deep, personalized analysis of destiny matrix calculations:

- **Real-time AI Analysis**: Generate comprehensive insights about life purpose, talents, and challenges
- **Bilingual Support**: Available in English and Russian
- **Powered by GPT-4o**: Uses latest Azure AI models for accurate, contextual analysis
- **Easy Setup**: Simple configuration with Azure AI Foundry endpoint and API key
- 📖 **[Setup Guide](./AI_INSIGHTS_README.md)** - Complete instructions for Azure AI Foundry integration

### AI Integration (Planned)

- Prompt Templates: Versioned JSON structures referencing domain entities
- Guardrails: PII scrubbing, token budget enforcement, jailbreak / toxicity filters
- Evaluation: Latency, cost, relevance scoring, hallucination detection with regression snapshots

### Mobile Evolution Plan

1. Extract pure domain logic (packages/core) with high test coverage.
2. Introduce mobile-shared for cross-platform view models (no React specifics).
3. Create React Native app consuming shared modules (navigation, offline cache, push notifications).
4. Add offline sync (conflict resolution strategy) & entitlement checks (subscriptions).
5. Integrate AI suggestions locally via lightweight streaming endpoints.

### Security & Compliance Foundations

- No secrets in client bundle; short-lived access tokens only.
- Centralized authorization middleware (claims → roles → capabilities).
- Structured audit logs with correlation IDs.
- Regular dependency / vulnerability scans (CodeQL, Dependabot).
- Secret rotation procedure documented in docs/security.md.

### Observability

- Application Insights + OpenTelemetry tracing
- Crash & error reporting (Sentry/App Center for mobile)
- Performance budgets: P95 API latency & P95 screen load thresholds
- AI metrics: tokens/request, average inference latency, guardrail rejection rate

## Admin Setup

To create an admin or owner user, run the following SQL query in your Supabase SQL Editor. Replace the `user_id` and `email` with your actual user details (find `user_id` in Supabase Auth > Users).

```sql
-- Insert a user as admin (safe to run multiple times)
INSERT INTO public.admins (user_id, email, is_active, created_by)
VALUES (
  '<USER_UUID>',        -- Auth user UUID from Supabase
  '<USER_EMAIL>',       -- User email
  true,                 -- Activate admin
  NULL                  -- Or admin UUID who created this user
)
ON CONFLICT (user_id) DO NOTHING;

-- Verify admin entry
SELECT *
FROM public.admins
WHERE user_id = '<USER_UUID>';

```

## Development Setup

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm test
```

### Suggested Scripts (Planned)

```bash
npm run build            # Production build
npm run test:watch       # Watch mode tests
npm run coverage         # Coverage report
npm run e2e:mobile       # Detox (future)
npm run ai:evaluate      # AI prompt regression suite (future)
```

## Release & Roadmap

### Release 0.2.0 (Short-Term)

- Extract domain logic into packages/core
- Initial AI prompt scaffolding + guardrails
- GitHub Actions pipeline: lint + typecheck + unit tests + CodeQL
- Architecture docs (docs/architecture.md)
- README refactored (this version)

### Release 0.3.0 (Next)

- Shared data layer with caching & retry logic
- Mobile skeleton (React Native + navigation + 2 primary screens)
- AI evaluation harness & metrics logging (tokens, latency)
- Security baseline: auth integration stub + Key Vault usage in scripts
- Observability bootstrap (structured logging, correlation IDs)

### Toward 1.0

- Offline synchronization module + conflict policy
- Subscription billing & entitlement service
- Full mobile feature parity & beta distribution
- Advanced AI: personalization, adaptive prompt refinement
- Performance optimization & accessibility audits
- Public release readiness (license, contribution docs, code-of-conduct)

## Testing Strategy

Testing Pyramid:

- Unit (domain computations)
- Component (React UI states)
- Integration (data layer + mock API)
- AI Regression (prompt evaluation snapshots)
- E2E (planned mobile navigation & critical workflows)

Coverage Goals:

- Domain/core: ≥80%
- Data adapters: ≥70% (grow to 80%)
- Critical AI parsing functions: ≥90%

## Contributing (Planned)

Pending addition of CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md, ISSUE/PR templates. Conventional Commits recommended (feat:, fix:, perf:, refactor:, security:, test:, ci:, docs:, chore:).

## Recruiting

See [job-description.html](./job-description.html) for the Senior Full-Stack & Mobile Engineer role. Heavy emphasis on leveraging GitHub Copilot agent mode for refactors, test generation, infrastructure automation, AI prompt iteration, and PR summarization.

## License

(Planned) – Recommend Apache-2.0 or MIT. Not yet added.

## Planned Badges

Build • Coverage • License • CodeQL • Last Commit (to be added after CI stabilization).
done.
