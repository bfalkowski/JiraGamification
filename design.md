# Jira Scenario Simulator - Design Document

## Goal
Build a minimal, end-to-end **Jira Scenario Simulator** that:
1) ingests a business proposal,
2) matches it to a synthetic Jira backlog,
3) lets me adjust scenario knobs (team size, sprint count, budget),
4) computes outcomes (what gets done, when, cost/efficiency), and
5) shows a small web dashboard + JSON/CLI outputs.

## Persona
You are a pragmatic Staff Engineer who ships clean, well-tested TypeScript. You prefer small, composable modules, clear domain models, and fast feedback loops. Optimize for simplicity and testability over features.

## Context
Constraints & stack:
- Monorepo: `apps/web` (React + Vite) and `apps/cli` (Node), `packages/core` (domain logic), `packages/data` (synthetic backlog + generators).
- Language: TypeScript. Package manager: pnpm.
- No real Jira calls: use synthetic data and light-weight seed scripts.
- Keep dependencies lean: `zod` (schema validation), `vitest` (tests), `commander` (CLI), `zustand` or `redux-toolkit` (tiny state), `chart.js` or `recharts` (1 chart), `date-fns` (dates).
- MVP modeling: deterministic velocity math; optional simple Monte Carlo extension (toggleable).
- Output surfaces:
  - Web: scenario controls + results panels.
  - CLI: `simulate --proposal ./proposal.yaml --team 4 --sprints 2 --budget 20000`.
- Repo must be runnable: `pnpm i`, `pnpm build`, `pnpm test`, `pnpm dev`.

## Steps

### 1) Project scaffold
- Create a pnpm workspace with:
  - `packages/core` (domain: types, engine, scoring)
  - `packages/data` (seeders, sample backlogs, proposal fixtures)
  - `apps/cli` (Commander-based CLI to run simulations and print JSON/markdown)
  - `apps/web` (Vite + React dashboard with sliders and results)
- Root scripts: `dev`, `build`, `test`, `lint`, `format`.

### 2) Domain modeling (packages/core)
- Define zod schemas + TS types:
  - `Epic`, `Issue`, `DependencyEdge`, `Proposal`, `Team`, `ScenarioParams`, `ScenarioResult`, `CostModel`, `VelocityModel`.
- Provide defaults:
  - Velocity model: `effective_velocity = sum(dev_productivity) * focus_factor * sprint_count`
    - `dev_productivity` defaults to 8 SP/sprint per dev (configurable).
    - `focus_factor` = 0.8 for 1 sprint, 0.7 for ≥2 sprints (rough overhead).
  - Cost model: `cost = dev_count * sprint_count * cost_per_dev_per_sprint` (default 8k per dev per sprint).
- Prioritization:
  - Sort candidate issues by: proposal relevance desc, priority (High>Med>Low), then WSJF-like heuristic `priority_score = business_value / story_points` (mock fields allowed).
- Eligibility:
  - Respect dependencies: an issue is selectable only if all deps are already scheduled within capacity.
- Engine:
  - `planScenario(backlog, proposal, params): ScenarioResult`
    - Filters issues relevant to proposal (label/keyword match).
    - Allocates SP capacity and selects issues greedily (respecting deps).
    - Emits: selected issues by sprint, leftover issues, utilization %, cost, ETA per epic, simple risk flags.
  - Optional Monte Carlo:
    - If `params.monteCarlo.enabled`, run N trials with SP variability (e.g., ±25%) and output P50/P90 completion.

### 3) Synthetic data (packages/data)
- Provide `seedBacklog()` returning 25–40 issues across 3–4 epics (Onboarding, Payments, Reporting, Notifications).
- Fields: id (PROJ-###), epic, title, description, story_points (1–13), status, priority, labels, dependencies, business_value (1–100).
- Add `generateProposal()` fixtures (YAML + JSON) with goals and keywords.
- Ensure dependencies reference real ids; include some blocked items.

### 4) Relevance mapping
- Implement a simple keyword/label matcher:
  - `computeRelevance(issue, proposal): number [0..1]`
  - Use: label overlap + keyword hits in title/description + epic alignment.
  - For MVP, no LLM calls—pure deterministic.

### 5) CLI (apps/cli)
- Commands:
  - `simulate --proposal <file> --team <n> --sprints <n> [--budget <num>] [--mc <trials>] [--seed <n>]`
  - `dump-backlog` to print the current synthetic backlog.
- Output:
  - JSON result and a concise markdown summary:
    - Capacity used, total SP done, cost, features per sprint, not-scheduled list, top risks.
  - Exit code 0 on success; non-zero on schema/arg errors.

### 6) Web UI (apps/web)
- Pages:
  - `/` Dashboard with:
    - Upload or pick a sample proposal.
    - Controls: team size (1–10), sprints (1–4), budget (optional), toggle Monte Carlo + trials.
    - Buttons: "Run Scenario"
  - Panels:
    - Summary KPIs (cost, capacity used, SP completed, ETA).
    - Table: selected issues grouped by sprint.
    - Table: unscheduled/backlog.
    - Mini chart: capacity vs used per sprint.
- State:
  - Keep results in store; show validation errors clearly.

### 7) Testing (vitest)
- Unit tests:
  - Relevance scoring, dependency gating, greedy allocation correctness.
  - Cost/velocity math edge cases.
- Integration tests:
  - "Given proposal X and params Y, ensure issues A/B/C are scheduled and D is not."
- Snapshot/Golden tests for CLI JSON.

### 8) Gamification layer (lightweight)
- Compute a scenario "score":
  - `score = normalized(business_value_delivered) – normalized(cost) + bonus`
  - Bonus examples: "Goal met in ≤2 sprints", "Utilization between 85–95%".
- UI: display badges if thresholds hit (purely cosmetic for MVP).

### 9) DX & docs
- Add `README.md` with quickstart:
  - `pnpm i`
  - `pnpm dev` (runs web on 5173 and CLI examples)
  - Example: `pnpm --filter apps/cli start simulate --proposal packages/data/fixtures/proposal.checkout.yml --team 4 --sprints 2 --budget 32000`
- Add comments explaining where to plug in real Jira API later (mapper interface).

### 10) Acceptance criteria
- `pnpm i && pnpm test` passes.
- `pnpm --filter apps/cli start simulate ...` prints valid JSON + markdown.
- Web app runs; changing team/sprints updates results deterministically.
- Dependencies are enforced; capacity limits respected.
- Score/badges render for at least one scenario.

## Files
- package.json / pnpm-workspace.yaml
- packages/core/src/{types.ts,schemas.ts,velocity.ts,cost.ts,relevance.ts,engine.ts,score.ts,index.ts}
- packages/core/tests/{engine.test.ts,relevance.test.ts,math.test.ts}
- packages/data/src/{seed.ts,fixtures/proposal.checkout.yml,fixtures/proposal.reporting.yml}
- apps/cli/src/{index.ts,commands/simulate.ts,commands/dumpBacklog.ts}
- apps/web/src/{main.tsx,App.tsx,store.ts,components/{Controls.tsx,Summary.tsx,ResultsTable.tsx,CapacityChart.tsx}}
- README.md

## Guardrails
- No external services. No hidden network calls.
- Validate all inputs with zod; fail fast with readable errors.
- Keep functions small and pure; no side effects in `packages/core`.
- Deterministic by default; Monte Carlo only if flag set.
- Keep total LOC modest; favor clarity over configurability.

## Acceptance Tests
1) With proposal "Checkout optimization" (payments/reporting keywords), team=4, sprints=2:
   - Engine allocates within capacity; at least one Payments epic item scheduled before a downstream Reporting item.
   - Cost = team * sprints * cost_per_dev_per_sprint (default 8k) = 4*2*8k = 64k.
2) If an issue's dependency isn't scheduled due to capacity, the dependent is excluded.
3) Increasing team from 2→6 increases completed SP and may unlock a badge "Goal within 2 sprints".
4) CLI `--mc 200` returns P50 and P90 completion SP with sensible spread.
