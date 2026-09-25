# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are individuals in Brazil managing personal finances, in pt-BR. Authenticated use (signin/signup, profile). Other audiences not confirmed.

## Product Purpose

Oiko is a personal finance control web app ("Controle de finanças"). It lets users record and review realized finances (gastos/ganhos), see balanço totals, charts and last records on a dashboard, organize categories, track pendencies, and manage carteira e metas (goals). Success means clear, reliable visibility over personal money in day-to-day use.

## Positioning

Diferencial confirmado pelo usuário (init, 2026-09-13): **simplicidade radical**. O Oiko se distingue de outros apps de finanças pessoais por oferecer a forma mais simples possível de controlar finanças — menos etapas, menos telas, menos ruído que qualquer vizinho de categoria. Futuro trabalho de design deve privilegiar clareza e minimalismo funcional em todas as superfícies.

## Operating Context

Authenticated web use in Brazilian Portuguese. Confirmed routes/workflows in `apps/web/src/app`: `/dashboard` (totals Gastos/Ganhos/Balanço, chart, last records), `/finances` (Finanças Realizadas table + Adicionar Finança), `/pendencies`, `/category`, `/goals` (Carteira e Metas), `/profile`, plus public `/signin`, `/signup`, and landing `/`. Frontend talks to Elysia/Bun API (`apps/api`, localhost:3333, `/api/auth/*` rewrites). Existing stack answers implementation; no greenfield stack decision.

## Capabilities and Constraints

Confirmed functionality: better-auth signin/signup/profile; dashboard summaries; finances CRUD/table; categories; pendencies; goals/carteira; Next.js 16 + React 19 + Tailwind client.

Technical constraints: monorepo `oiko-monorepo` (`apps/web` oiko-client + `apps/api` oiko-api); language pt-BR (`html lang='pt-BR'`); API dependency for auth/data.

Explicitly undecided: additional constraints, assets, or proof requirements. User answered "nada a ser preservado" for extra durable constraints — no additional binding limits confirmed beyond current scope and pt-BR.

## Brand Commitments

Name Oiko, description "Controle de finanças", pt-BR voice. No additional confirmed voice, assets, personality constraints, or binding visual references. User volunteered no aesthetic direction.

## Evidence on Hand

Real implementation in `apps/web/src/app`, `apps/web/src/components`, `apps/api/src/modules` (auth, categories, finances, goals). No confirmed testimonials, customers, case studies, benchmarks, pricing, press, or demo assets. Absences must not be fabricated by future work.

## Product Principles

1. Clarity over completeness: show balanço, gastos, and ganhos first; details on demand.
2. Reliable records: realized vs pending states stay distinct and trustworthy.
3. Low-friction capture: adding and categorizing a finance must stay fast.
4. Goal-oriented: carteira e metas link daily tracking to longer-term intent.
