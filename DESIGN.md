---
name: Oiko
description: Controle de finanças
colors:
  ledger-ink: "oklch(0.205 0 0)"
  ink-text: "oklch(0.145 0 0)"
  paper-white: "oklch(1 0 0)"
  mist-gray: "oklch(0.97 0 0)"
  ash-gray: "oklch(0.52 0 0)"
  hairline: "oklch(0.922 0 0)"
  focus-ring: "oklch(0.708 0 0)"
  signal-red: "oklch(0.577 0.245 27.325)"
  chart-sky: "oklch(0.809 0.105 251.813)"
  chart-blue: "oklch(0.623 0.214 259.815)"
  chart-indigo: "oklch(0.546 0.245 262.881)"
  chart-deep: "oklch(0.488 0.243 264.376)"
  chart-navy: "oklch(0.424 0.199 265.638)"
  auth-void: "rgb(0 0 0)"
  auth-rain: "rgb(140 235 195)"
typography:
  display:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "0.1em"
  headline:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "normal"
  title:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
  body:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.05em"
rounded:
  none: "0px"
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
  2xl: "18px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.ledger-ink}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.none}"
    padding: "0px 10px"
    height: "32px"
  button-primary-hover:
    backgroundColor: "{colors.ledger-ink}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.none}"
    padding: "0px 10px"
    height: "32px"
  button-outline:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink-text}"
    rounded: "{rounded.none}"
    padding: "0px 10px"
    height: "32px"
  button-destructive:
    backgroundColor: "{colors.signal-red}"
    textColor: "{colors.signal-red}"
    rounded: "{rounded.none}"
    padding: "0px 10px"
    height: "32px"
  button-ghost:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink-text}"
    rounded: "{rounded.none}"
    padding: "0px 10px"
    height: "32px"
  input-default:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink-text}"
    rounded: "{rounded.none}"
    padding: "4px 10px"
    height: "32px"
  card-default:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink-text}"
    rounded: "{rounded.none}"
    padding: "16px"
---

# Design System: Oiko

## Overview

**Creative North Star: "The Calm Ledger"**

Oiko is a restrained, reliable ledger for everyday Brazilian personal finance. The interface recedes so balances, tables, and goals lead: a monochrome paper field, sharp squared primitives, and dense mono type that reads like a well-kept notebook. Nothing decorates; everything accounts.

Density is operational, not decorative. Screens are compact app chrome (h-8 controls, text-xs body, tight gaps) with generous breathing room only around summary cards and empty states. The aesthetic philosophy is flat-by-default precision: hairline rings instead of shadows, tonal gray layering instead of color, and a single signal red reserved for money leaving.

**Key Characteristics:**
- Monochrome ledger: near-black ink on paper white, grays for structure
- Sharp and precise: squared corners, compact controls, tactile press states
- Mono everywhere: tabular numerals, tracked labels, compact readability
- Flat-by-default: rings and tone carry depth, shadows answer state only

## Colors

Quiet paper-and-ink field with one functional red and a blue chart ramp kept strictly inside data visualization.

### Primary
- **Ledger Ink** (oklch(0.205 0 0)): primary buttons, active nav text and indicator bar, headings on auth. The single voice of action.
- **Ink Text** (oklch(0.145 0 0)): body text on light surfaces, table values for Entradas.

### Secondary (optional; omit if the project has only one accent)
- Omitted. The project has one accent (Ledger Ink) plus functional red and chart blues. Secondary and Tertiary roles are expressed as Neutral tonal steps, not separate hues.

### Tertiary (optional)
- Omitted. Chart blues (chart-sky through chart-navy) are data-only and never used as UI accents.

### Neutral
- **Paper White** (oklch(1 0 0)): app background, card and popover fill, ghost-button resting fill.
- **Mist Gray** (oklch(0.97 0 0)): secondary / muted / accent fills, zebra table rows (bg-muted/30), hover washes.
- **Ash Gray** (oklch(0.52 0 0)): muted-foreground text, placeholders, empty-state and secondary labels. Auditado 2026-09-13: 0.556 ficava em 4.34:1 sobre Mist Gray (abaixo do AA); 0.52 garante ≥5:1 em todos os fundos claros.
- **Hairline** (oklch(0.922 0 0)): borders, dividers, input strokes, card rings (via ring-foreground/10).
- **Focus Ring** (oklch(0.708 0 0)): focus-visible rings and outline accents.
- **Signal Red** (oklch(0.577 0.245 27.325)): destructive text and washes only — Saídas, errors (Falha ao carregar!), destructive buttons (bg-destructive/10).
- **Chart Sky** (oklch(0.809 0.105 251.813)) through **Chart Navy** (oklch(0.424 0.199 265.638)): five-step blue ramp reserved for categorical multi-series data (≥3 séries simultâneas) and future charts; o gráfico do dashboard usa cores semânticas (Signal Red = Gastos, Ink = Ganhos) porque cor é significado nesta família — ver The Chart Confinement Rule.

### Named Rules (optional, powerful)
**The One Ink Rule.** Ledger Ink appears on ≤10% of any screen — one primary button, one active nav item, key totals. Its rarity is the point.
**The Red Means Leaving Rule.** Signal Red is reserved for money out (Saída), destructive actions, and load failures. Never use it for branding or decoration.
**The Chart Confinement Rule.** Chart blues never leak into buttons, nav, or marketing chrome. Data visualization is their only home. Within charts: semantic series (dinheiro entrando/saindo) usam Ink/Signal Red; a rampa azul é o fallback para séries categóricas onde o significado não chega a 5 cores. Séries vizinhas são distinguidas também por TRAÇO (Gastos = linha contínua, Ganhos = tracejado `6 3`) — nunca só por cor (WCAG 1.4.1).
**The Auth Rain Exception.** (Auditorada e sancionada 2026-09-14.) As superfícies públicas signin/signup vivem num regime paralelo intencional: vazio preto (`--auth-void`) com chuva de caracteres verde terminal (`--auth-rain`), idêntico nos dois temas. O verde da chuva e o preto do vazio NUNCA saem das páginas `(public)` para o app autenticado — dentro do card de auth vale o Calm Ledger inteiro. Em código, as cores vêm dos tokens CSS `--auth-void`/`--auth-rain` (declarados em `globals.css` :root e `.dark`), nunca de literais. O canvas decorativo respeita `prefers-reduced-motion` com campo estático.

## Typography

**Display Font:** ui-monospace stack (with Menlo / Consolas fallback)
**Body Font:** ui-monospace stack (with Menlo / Consolas fallback)
**Label/Mono Font:** ui-monospace stack — mono is the system, not an accent

**Character:** Ledger-mono: tabular, tracked, and compact. Headlines assert in bold tracked caps; body stays at a dense 12px with relaxed leading for table scanning. The declared `--display-family` / `--body-family` tokens are empty in code — `font-mono` is the normative voice.

### Hierarchy
- **Display** (700, 1.875rem–3.75rem / text-3xl to text-6xl, 1.1): landing heroes and auth wordmarks only, tracked wide (tracking-widest), often skewed/italic for emphasis.
- **Headline** (600, 1.5rem / text-2xl, 1.2): page titles (Finanças Realizadas, Dashboard) and card sums (text-xl to text-3xl for BRL values).
- **Title** (500, 0.875rem / text-sm, 1.4): card titles (font-heading, font-medium) and section labels.
- **Body** (400, 0.75rem / text-xs, 1.6): the default UI voice — tables, cards (text-xs/relaxed), inputs, sidebars. Max line length ~65ch in prose contexts.
- **Label** (500, 0.75rem / text-xs, 0.05em tracking, uppercase where navigational): nav items, table heads, tracked eyebrows (tracking-widest, text-[10px]–text-xs) on landing/auth.

### Named Rules (optional)
**The Tabular Numerals Rule.** Money, dates (DD/MM/YYYY), and counts always render in mono with tabular-nums. Proportional figures never appear in financial contexts.
**The Tracked Label Rule.** Navigational and eyebrow labels use wide tracking (tracking-wider/widest) and xs scale. Body copy never tracks wide.
**The Icon-Size Exception Rule (convenção, não é drift tipográfico).** Os tamanhos `text-[22px]`, `text-[25px]`, `text-[32px]` e o prop `size={55}` NÃO pertencem à escala tipográfica — são caixas de ícone (icon tiles) e o detector NÃO deve sinalizá-los como drift: `text-[22px]` no botão submit da busca (`apps/web/src/components/search.tsx`, com `SearchIcon size={22}`); `text-[25px]` no gatilho do menu de ações do registro (`apps/web/src/components/dropdown-menu.tsx`, alvo 44px `h-11 w-11`); `text-[32px]` nos tiles da sidebar (`apps/web/src/components/sidebar-link.tsx` e `sidebar.tsx`, `h-14 min-w-[60px]`). `size={55}` são os props de ícone Lucide dos Total Finance Cards (`total-finance-card.tsx`) e `size={35}` os chevrons dos últimos registros (`last-record-info.tsx`) — dimensão de glifo SVG, não texto. São dimensionamento de glifo, não texto.

## Layout

A compact sidebar-plus-content operations shell with a centered public marketing/auth column as the second mode.

Authenticated shell: collapsible sidebar (w-16 collapsed / w-72 expanded on desktop, overlay toggle on mobile) beside a fluid content column. Content blocks stack vertically with tight rhythm (gap-2 to gap-4, px-2 page gutters, pt-4/pb-2 table wrappers). Summary cards row on dashboard (flex, h-24 / xl:h-28, full-width thirds). Tables are full-bleed within their card with sticky header, horizontal overflow contained, vertical scroll inside. Public pages center a max-w-md to max-w-lg column (auth) or a max-w prose landing column with 12px section dividers.

Spacing rhythm is Tailwind default steps: 8px (sm) for internal control gaps, 16px (md) for card padding (px-4, py-4) and section gaps, 24px (lg) for page-section separation (mt-12 groupings on landing). Breakpoints follow Tailwind defaults (sm/md/lg/xl/2xl); sidebar flips at lg, type scales at md/xl/2xl (e.g. totals text-xl → 2xl:text-3xl). Density stays compact in-app and airy on landing — same tokens, different composition.

**Exceção landing-only (não sinalizar como drift):** o padrão quadriculado `dither-pattern` (alias do detector: `.codex-grid-background`) existe SOMENTE em `apps/web/src/app/(public)/landing/hero-ascii-one.tsx` — faixa lateral `w-2 opacity-20` no card de preço (linha ~630) definida em `<style jsx>` (linhas ~746-751, `repeating-linear-gradient` cruzado 0deg/90deg, `background-size: 3px 3px`). É ornamento confinado à landing (modo Persuade); o detector NÃO deve acusá-lo no shell do app (modo Operate), onde a regra Flat-By-Default proíbe texturas.

## Elevation & Depth

Flat-by-default. Depth is conveyed by tonal layering (Paper White on Mist Gray washes, bg-muted/30 zebra rows) and hairline rings (ring-1 ring-foreground/10 on cards), not shadows.

### Shadow Vocabulary (if applicable)
- **Press feedback** (`transform: translateY(1px)` on active buttons): the primary depth cue for the sharp system. Appears on every ui-button press.
- **Auth button lift** (`box-shadow: 0 1px 2px rgba(0,0,0,0.05)` resting, `0 4px 6px rgba(0,0,0,0.08)` on hover): the one sanctioned shadow, confined to the legacy custom `Button` (h-11, rounded-lg) on signin/signup.
- **Focus halo** (`0 0 0 1px var(--ring)` at 50% + border shift to ring color): appears on focus-visible for buttons and inputs, not at rest.

### Named Rules (optional)
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only as a response to state (hover lift on auth buttons, press sink everywhere, focus halo on fields).

## Shapes

Sharply squared system primitives with rounded accents quarantined to shell and auth ornaments.

The default form language is `rounded-none` (0px): ui buttons, cards, inputs, dialogs, table cells, and dropdowns all square off. This is the sharp-and-precise signature — ledgers have corners. Token `--radius` is 10px (0.625rem) with a computed scale (sm 6px, md 8px, lg 10px, xl 14px, 2xl 18px), but the system deliberately overrides it to zero on primitives. Rounded forms survive in three places only: the app sidebar shell (rounded-2xl, rounded-b-2xl logout), auth ornaments (rounded-lg logo tile, rounded-lg legacy Button), and the empty-state pill (rounded-full border, p-8). Active nav adds a 7px rounded-l indicator bar (after:w-[7px] after:rounded-l-lg). Borders are 1px hairlines throughout; clipping is rectangular except sidebar and pills.

## Components

Each entry leads with character, then shape, color, states, and behavior. All sizes are compact (h-8 / 32px default control height, text-xs).

### Buttons
- **Character:** sharp, tactile, and quiet — a squared ink slab that sinks on press.
- **Shape:** squared (rounded-none, 0px) for system `ui/button`; legacy auth `Button` is rounded-lg (8px) and taller (h-11).
- **Primary:** Ledger Ink fill (bg-primary) with Paper White text (text-primary-foreground), h-8 with px-2.5 and gap-1.5, text-xs font-medium.
- **Hover / Focus:** hover dims to bg-primary/80; focus-visible shifts border to ring color with a 1px ring at 50%; active sinks (translate-y-px) unless it opens a popup.
- **Secondary / Ghost / Tertiary (if applicable):** Secondary is Mist Gray fill with ink text and a 5% foreground color-mix darken on hover; Outline is Paper White with hairline border, hover Mist wash; Ghost is transparent, hover Mist wash; Destructive is Signal Red at 10% fill with red text, hover 20%; Link is ink text with underline offset-4.

### Chips (if used)
- Not used as a component. Type badges in tables are plain colored text (text-destructive / text-foreground / text-muted-foreground), not pills. Do not invent chips.

### Cards / Containers
- **Character:** flat paper slips delineated by hairlines, not lift.
- **Corner Style:** squared (rounded-none, 0px); sidebar shell is the rounded exception (rounded-2xl).
- **Background:** Paper White (bg-card) on Mist washes; zebra rows at bg-muted/30.
- **Shadow Strategy:** none at rest per the Flat-By-Default Rule; auth-button lift only.
- **Border:** 1px ring (ring-1 ring-foreground/10) rather than border utility; card footer adds border-t when present.
- **Internal Padding:** compact scale — py-4 with px-4 (sm: px-3, py-3), vertical stack gap-4 (sm: gap-2).

### Inputs / Fields
- **Character:** squared, quiet fields that halo on focus.
- **Style:** transparent fill (dark: input/30), 1px hairline stroke (border-input), squared (rounded-none), h-8 with px-2.5/py-1, text-xs.
- **Focus:** border shifts to Focus Ring with 1px ring at 50% (focus-visible:border-ring + ring-ring/50); dark mode preserves the same halo.
- **Error / Disabled:** invalid uses Signal Red border + 20% red ring (40% in dark); disabled drops to input/50 fill at 50% opacity with not-allowed cursor.

### Navigation
- Sidebar stack (Dashboard, Finanças Realizadas, Finanças Pendentes, Categorizar Finança, Carteira e Metas, Perfil do Usuário) plus logout. Convenção de ícones (não é escala de texto — ver The Icon-Size Exception Rule): tiles da sidebar a `text-[32px]` (`h-14, min-w-[60px]`, em `sidebar-link.tsx` e no botão Sair de `sidebar.tsx`); gatilho do menu de ações do registro a `text-[25px]` (alvo 44px `h-11 w-11` em `dropdown-menu.tsx`); botão submit da busca a `text-[22px]` (`search.tsx`, `SearchIcon size={22}`, alvo 44px). Style is plain mono text with whitespace-nowrap labels. Default is Ink Text; hover and active shift to Ledger Ink (hover:text-primary). Active adds a 7px ink indicator bar (rounded-l). Mobile collapses to icon rail or hidden drawer (w-16 / hidden); desktop expands to w-72. Topbar and pagination are secondary: pagination is compact numbered items with prev/next; search is a squared input with icon.

### Signature Component
- **Total Finance Card (Gastos / Ganhos / Balanço):** the dashboard signature — a squared flat card (h-24 / xl:h-28) with title (text-xl) over a large mono BRL value (text-xl → 2xl:text-3xl) and a 55px Lucide icon (ArrowDownCircle / ArrowUpCircle / CircleDollarSign) tinted by semantics (Gastos red, Ganhos ink, Balanço muted). Color assignment is the meaning.
- **Finance Table:** the operations signature — squared table with tracked heads (Descrição / Valor / Tipo / Data), zebra Mist rows, semantic value coloring, DD/MM/YYYY dates, row actions in a 50px trailing cell, search + pagination chrome.

## Do's and Don'ts

### Do:
- **Do** keep surfaces monochrome — ink, paper, and grays carry the UI; reserve Signal Red for money-out and failures.
- **Do** tratar `text-[22px]` / `text-[25px]` / `text-[32px]` como convenção de ícone (caixas de glifo em busca, dropdown e sidebar) — nunca como drift tipográfico; a escala de texto vai só até Display.
- **Do** confinar o `dither-pattern` (alias `.codex-grid-background`) à landing `hero-ascii-one` — é exceção landing-only documentada, não padrão do app; o detector deve ignorá-lo fora de `apps/web/src/app/(public)/landing/`.
- **Do** keep primitives squared (rounded-none) — round only the sidebar shell, auth ornaments, and the empty-state pill.
- **Do** render all money and dates in mono tabular figures (BRL via convertToBRL, dates DD/MM/YYYY).
- **Do** use hairline rings (ring-1 ring-foreground/10) and Mist washes for grouping, not shadows.
- **Do** confine chart blues to charts; never promote them to buttons or nav.
- **Do** keep controls compact (h-8, text-xs, px-2.5) in-app; reserve h-11/rounded-lg for auth calls-to-action.

### Don't:
- **Don't** introduce gradients, neon, glassmorphism, or colorful illustration into app chrome — the No Gradients/Neon rejection is binding. (Sanção explícita: preenchimento de área do gráfico com fade vertical do próprio stroke — `chart.tsx` linearGradient de dados — é data-viz dentro do Chart Confinement, não chrome.)
- **Don't** add drop shadows to cards, tables, or sidebar at rest — lift answers hover/press/focus only.
- **Don't** invent Secondary/Tertiary accent hues or chip pills the codebase does not use.
- **Don't** replace mono with proportional or display-serif type in financial contexts.
- **Don't** use Signal Red for success, branding, or neutral emphasis — green/yellow semantics do not exist here; Entradas are ink, not green.
- **Don't** replicar o `dither-pattern` / `.codex-grid-background` fora da landing — textura quadriculada é exceção landing-only (`hero-ascii-one`); no app vale o Flat-By-Default.
- **Don't** converter `text-[22px]` / `text-[25px]` / `text-[32px]` em escala de texto — são tamanhos de ícone; não aplicar a corpo, títulos ou labels.
