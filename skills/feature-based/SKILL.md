---
name: feature-based
description: >
  Feature-based architecture for React apps that scale without chaos.
  Trigger: When structuring folders, creating features, extracting shared domain
  code, deciding imports between modules, or migrating from components/hooks/utils.
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

Load this skill when:
- Organizing or refactoring React project structure
- Creating a new domain feature (`users`, `orders`, `catalog`, etc.)
- Sharing domain UI/logic across features without sibling imports
- Deciding what belongs in `features/`, `features/core/`, or `shared/`
- Migrating from a classic `components/hooks/utils` layout

## Core Idea (REQUIRED)

**Group code by domain ownership, not by technical role.**

Ask *"which domain owns this?"* — not *"is this a hook or a component?"*.

Each feature owns its UI, hooks, state, types, API calls, and helpers. Expose a **small public API** (`index.ts`); keep internals private. Full features stay **isolated from sibling features**.

## Why Classic Structure Breaks

Folders like `components/`, `hooks/`, `utils/`, `pages/`, `store/` feel natural early, then fail as the app and team grow:

- `components/` mixes UI primitives, domain widgets, and near-page compositions
- `hooks/` mixes generic helpers with critical business orchestration
- `utils/` becomes a junk drawer
- Changing one feature touches 5–6 unrelated top-level folders

**Root cause:** code is organized by technical role instead of domain ownership → scattered logic, blurred reusable vs domain boundaries, slow onboarding, hidden deps, risky feature removal.

Fine for small solo prototypes. Entropy grows in large apps.

## Evolution Path

1. **Classic fails** — `users` pieces scatter (`UserAvatar` in components, `useCurrentUser` next to `useDebounce`, `formatUserName` in utils). `orders` deep-imports `@/components/UserAvatar` and couples to users' internals.
2. **Extract first feature** — move all `users` into one folder with a public `index.ts`. Consumers import `@/features/users`.
3. **Reuse needs a new layer** — when `catalog` also needs `UserAvatar` / `PermissionGate`, do **not** import sibling features. Extract shared domain slices to `features/core/`.

`features/core/` is **not** designed day one — it **emerges** when real cross-feature reuse appears.

## Five Layers (Dependencies Flow Down)

```
src/
├── app/          # Bootstrap only — providers, router, theme, global styles
├── pages/        # Thin route composition — params, layout, wire features
├── features/
│   ├── core/     # Light reusable domain slices (not full features)
│   └── ...       # Domain features (auth, orders, catalog, …)
└── shared/       # Cross-cutting, domain-free building blocks
```

| Layer | Responsibility |
|-------|----------------|
| `app/` | App infrastructure. **No** domain logic. |
| `pages/` | Bridge router ↔ features. Thin: params, layout, composition. |
| `features/` | Main domain layer. Each feature owns its logic. |
| `features/core/` | Reusable domain slices too specific for `shared/`, too shared for one feature. |
| `shared/` | Design-system primitives, API client, low-level utils, generic hooks, global types. |

```tsx
// ✅ Thin page — composition only
export function ProductPage() {
  const { id } = useParams();
  return (
    <PageLayout>
      <ProductDetails productId={id} />
      <Recommendations context="product" referenceId={id} />
    </PageLayout>
  );
}
```

**`shared/` rule:** if code knows too much about a business domain, it does not belong there.

## Feature Internals

Inside a feature, organize by technical role:

```
features/users/
├── components/     # Presentational UI, explicit props
├── containers/     # Orchestration, data loading, store wiring, side effects
├── hooks/          # Feature-level logic and derived behavior
├── store/          # Feature-local state / query keys
├── types/          # Feature contracts
└── index.ts        # Public API — only what consumers may use
```

Not the only valid layout — but practical. Public API matters more than folder names.

## Public API Over Deep Imports (REQUIRED)

```typescript
// ✅ Through the public API
import { UserAvatar } from "@/features/users";

// ❌ Deep import into another feature's internals
import { UserAvatar } from "@/features/users/components/UserAvatar/UserAvatar";
```

Goals: consumers ignore internal layout, safer refactors, clear public vs private, accidental coupling is easier to spot. This is about **module boundaries**, not "barrel files everywhere".

## Dependency Rules (REQUIRED)

Allowed direction:

| From | May import |
|------|------------|
| `features/xxx` | `shared/`, `features/core/` |
| `features/core/*` | `shared/` only |
| `pages/` | `features/*` (public APIs), `shared/` |
| `app/` | providers / infra — not domain orchestration |

Forbidden:

- `features/xxx` → sibling feature (`orders` ↛ `catalog`)
- `features/core/*` → full features
- Deep imports across feature boundaries
- Domain logic leaking into `shared/`

Inside a feature, containers importing hooks/components/types is normal:

```typescript
import { useOrderSummary } from "../hooks";
import { OrderSummaryView } from "../components";
import type { Order } from "../types";
```

**Nuance:** presentational components may use UI-level hooks (`useId`, `useRef`, a11y/measure hooks). They must **avoid** domain effects, data fetching, store access, and cross-feature orchestration.

## Feature Isolation (REQUIRED)

> Full feature modules must not know their sibling features.

- `orders/` ↛ `catalog/`, `catalog/` ↛ `users/`, `users/` ↛ `orders/`
- Shared domain UI/logic → move to `features/core/`, never sibling-import
- **Exception:** subfeatures inside the same feature (`orders/checkout` ↔ `orders/payment`) share one domain slice

## Guarding `features/core/`

Without discipline, `core/` becomes a second `shared/` or a junk drawer.

- Move code only when **actually reused** by multiple features
- Keep light and domain-oriented — **little orchestration**
- No page assembly, route wiring, or full feature flows
- Must not depend on concrete feature implementations
- **Reuse test:** if it cannot serve ≥2 features without dragging feature-specific orchestration, keep it in the feature
- One reuse request does **not** justify promoting a feature detail

Structure as **small focused slices**, each with its own public API — not monoliths like `core/components` or `core/hooks`:

```
features/core/
├── permissions/    # components/, hooks/, types/, index.ts
├── statusBadge/    # components/, types/, index.ts
├── contracts/      # types/, index.ts
└── index.ts
```

Name can be `domain-shared/` or `common-domain/` — the rule matters, not the label.

## Large Features & Subfeatures

Most features should start **flat**. Split only when distinct areas have different flows, UI/hooks, and evolve independently:

```
features/orders/
├── shared/       # internals shared only inside orders
├── checkout/
├── payment/
├── history/
└── index.ts      # small root public API
```

Helps reason about the import graph and reduce accidental coupling. Does **not** make cycles physically impossible — discipline still required.

## Import Quick Reference

```typescript
// ✅ Good
import { UserAvatar } from "@/features/users";
import { CheckoutStepper } from "@/features/orders/checkout";
import { PermissionGate } from "@/features/core/permissions";
import { Button } from "@/shared/ui/Button";

// ❌ Avoid
import { UserAvatar } from "@/features/users/components/UserAvatar/UserAvatar";
import { PaymentBadge } from "@/features/orders/payment/components/PaymentBadge";
import { ProductCard } from "@/features/catalog/components/ProductCard";
```

Highest-value rule: **no deep imports into another feature; no direct sibling-feature deps.**

## Full Structure Example

```
src/
├── app/
│   ├── App.tsx
│   ├── Router.tsx
│   └── providers/
├── pages/
│   ├── catalog/CatalogPage.tsx
│   ├── product/ProductPage.tsx
│   └── cart/CartPage.tsx
├── features/
│   ├── core/
│   │   ├── permissions/
│   │   ├── statusBadge/
│   │   └── contracts/
│   ├── users/
│   ├── catalog/
│   └── orders/
└── shared/
    ├── api/
    ├── config/
    ├── lib/
    ├── types/
    └── ui/
```

Exact names matter less than: domain slices + controlled shared-domain layer + domain-free `shared/`.

## When It Fits / When It Doesn't

**Prefer when:** multiple business domains, parallel developers, long-lived product, ownership matters (admin platforms, dashboards, e-commerce, SaaS, large internal tools).

**Skip / defer when:** small solo project, early MVP still finding shape, tiny marketing site, little domain depth, design-system-centric app with few feature boundaries.

Architecture should reduce friction — not introduce it prematurely.

## Migration (No Big-Bang)

1. Define path aliases (`@/features/*`, `@/shared/*`, `@/pages/*`)
2. Create `shared/` — move only truly generic pieces first
3. Migrate one small isolated feature end-to-end
4. Add public `index.ts`; stop external deep imports
5. Introduce `features/core/` only when real cross-feature reuse appears
6. Enforce with ESLint ([`eslint-plugin-boundaries`](https://github.com/javieraviles/eslint-plugin-boundaries) or FSD-style linters)

Without enforcement, the architecture is a suggestion — not a boundary.

## Trade-offs

- More upfront structure and judgment
- `core/` needs ownership and strict review
- Risk of over-granular folders/ceremony
- Conventions need lint + review or people skip them
- Public APIs need active maintenance
- Overkill for tiny products

Right question: *"Does this codebase's complexity justify stronger boundaries?"*

## Relation to Feature-Sliced Design (FSD)

Same instincts: explicit slice boundaries, public APIs, strong dependency direction.

**Simplified vs full FSD:** fewer top-level layers; no separate `entities` / `widgets`. A pragmatic lighter interpretation — not a replacement for full FSD.

## Critical Warning

Folders alone do **not** fix architecture. Chaos still happens if ownership is unclear, review is weak, shared boundaries are ignored, abstractions arrive too early, or business logic hides in "helpers".

Real value = **dependency discipline** behind the folders.

## Rules Worth Keeping

1. Organize by domain ownership
2. Keep public APIs small — don't export everything
3. No deep imports across feature boundaries
4. Isolate full features from siblings
5. Use `features/core/` for light reusable domain slices
6. Keep `shared/` free of business logic
7. Start simple; split into subfeatures later

## Keywords

feature-based, architecture, features, core, shared, public API, deep imports, FSD, domain ownership, module boundaries
