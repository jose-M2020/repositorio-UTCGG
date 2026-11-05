# Repositorio

## Project Overview

Repositorio

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 + Vite |
| Styling | Tailwind CSS v4 + shadcn/ui |
| State | Zustand + TanStack Query |
| HTTP | Axios |
| Forms | React Hook Form + Zod |
| Icons | lucide-react |
| Toast | Sonner |
| File Upload | react-dropzone |
| Testing | Vitest + Playwright |
| | @testing-library/react, @testing-library/dom, @testing-library/user-event, @testing-library/jest-dom |
| | MSW |

## Available Skills

Use these skills for detailed patterns on-demand:

### Generic Skills
| Skill | Description | URL |
|-------|-------------|------|
| `react-19` | No useMemo/useCallback, React Compiler | [SKILL.md](skills/react-19/SKILL.md) |
| `feature-based` | Domain features, core/, public APIs, isolation | [SKILL.md](skills/feature-based/SKILL.md) |
| `tailwind-4` | cn() utility, no var() in className | [SKILL.md](skills/tailwind-4/SKILL.md) |
| `zustand-5` | Persist, selectors, slices | [SKILL.md](skills/zustand-5/SKILL.md) |
| `vitest` | Unit testing, React Testing Library | [SKILL.md](skills/vitest/SKILL.md) |
| `playwright` | Page Object Model, MCP workflow, selectors | [SKILL.md](skills/playwright/SKILL.md) |
| `typescript` | Const types, flat interfaces, utility types | [SKILL.md](skills/typescript/SKILL.md) |
| `zod-4` | New API (z.email(), z.uuid()) | [SKILL.md](skills/zod-4/SKILL.md) |
| `commit` | Conventional commits | [SKILL.md](skills/commit/SKILL.md) |
| `ui` | UI patterns, component placement, forms | [SKILL.md](skills/ui/SKILL.md) |

### Auto-invoke Skills

When performing these actions, ALWAYS invoke the corresponding skill FIRST:

| Action | Skill |
|--------|-------|
| Writing React components | `react-19` |
| Structuring features / folders / imports | `feature-based` |
| Creating or extracting domain features | `feature-based` |
| Working with Tailwind classes | `tailwind-4` |
| Using Zustand stores | `zustand-5` |
| Writing Vitest tests | `vitest` |
| Writing React component tests | `vitest` |
| Testing hooks or utilities | `vitest` |
| Writing Playwright E2E tests | `playwright` |
| Writing TypeScript types/interfaces | `typescript` |
| Creating Zod schemas | `zod-4` |
| Creating a git commit | `commit` |
| Creating UI components | `ui` |
| Working with forms | `ui` |

---

## Commands

```bash
# Install dependencies
pnpm install

# Development
pnpm dev

# Build
pnpm build

# Lint
pnpm lint

# Tests
pnpm test          # Unit tests (watch mode)
pnpm test:run      # Run once
pnpm test:coverage # Coverage report
pnpm test:e2e      # E2E tests
pnpm test:e2e:ui   # E2E with UI mode
```

---

## Conventions

### Component Structure
- Follow container/presentational pattern when appropriate
- Use shadcn/ui base components, extend with composition
- Co-locate tests next to components

### State Management
- Zustand for global UI state (theme, sidebar, modals)
- TanStack Query for all server state (CRUD operations)
- Avoid prop drilling beyond 2 levels

### API Layer
- Centralized Axios instance with interceptors
- Query/mutation hooks via TanStack Query
- Consistent error handling with toast notifications

### Forms
- React Hook Form with Zod resolvers
- Reusable form components (FormField, FormInput, etc.)
- Field-level validation with inline errors

### Testing
- Vitest for unit and integration tests
- React Testing Library for component tests
- Playwright for E2E (critical user flows)
- MSW for mocking API requests

---

## Commit Guidelines

Follow conventional-commit style: `<type>[scope]: <description>`

**Types:** `feat`, `fix`, `docs`, `chore`, `perf`, `refactor`, `style`, `test`

**Scopes:** `auth`, `client`, `document`, `credit`, `ui`, `api`, etc.

Example: `feat[client]: add client search with filters`
