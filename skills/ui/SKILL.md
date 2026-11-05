---
name: halo-ui
description: >
  Halo Finance UI patterns and conventions. For generic patterns, see: typescript, react-19, tailwind-4, zod-4.
  Trigger: When working on UI components, forms, or client-side features.
metadata:
  author: halo-finance
  version: "1.0"
  scope: [src]
  auto_invoke:
    - "Creating/modifying UI components"
    - "Working with forms and validation"
    - "Adding page-level components"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash
---

## Related Generic Skills

- `typescript` - Const types, flat interfaces
- `react-19` - No useMemo/useCallback, compiler
- `tailwind-4` - cn() utility, styling rules
- `zod-4` - Schema validation
- `zustand-5` - State management
- `vitest` - Unit testing
- `playwright` - E2E testing

## Tech Stack

```
React 19 | Vite | Tailwind 4 | shadcn/ui
Zod 4 | React Hook Form | Zustand | TanStack Query
React Router v7 | Axios | lucide-react
Sonner | react-dropzone
```

## CRITICAL: Component Library Rule

- **ALWAYS**: Use `shadcn/ui` + Tailwind (`src/components/ui/`)
- **NEVER**: Install external component libraries without approval

## Icons

Use **lucide-react** for all icons.

```typescript
import { Search, Plus, Trash2 } from "lucide-react";

// Usage
<Search className="h-4 w-4" />
<Button><Plus className="mr-2 h-4 w-4" /> Add</Button>
```

Rules:
- Use `h-4 w-4` or `h-5 w-5` for default icon sizes
- Use `mr-2` or `ml-2` for spacing in buttons
- Import only what you need (tree-shaking)

## Project Structure

```
src/
├── api/                      # Axios instances, API methods
├── components/               # Global components ONLY
│   ├── ui/                   # shadcn/ui base components
│   ├── form/                 # Form components
│   │   ├── fields/           # React Hook Form field components
│   │   └── templates/        # Form templates (e.g. SequentialFilesUploadForm)
│   └── ...                   # Other global components
├── hooks/                    # Global custom hooks
├── lib/                      # Utilities (cn, utils)
├── pages/                    # Route pages
│   └── {page}/               # Page-specific files (use _ prefix)
│       ├── _components/     # Page-specific components
│       ├── _hooks.ts        # Page-specific hooks
│       ├── _utils.ts        # Page-specific utilities
│       ├── _types.ts        # Page-specific types
│       └── _schemas.ts       # Page-specific Zod schemas
├── routes/                   # Route definitions
├── stores/                   # Zustand stores
└── types/                    # Global TypeScript types
```

## Component Placement Rules

### Global vs Page-Specific

```
Used 2+ pages?     → src/components/ (global)
Used 1 page only?  → src/pages/{page}/_components/
```

### Page-Specific Files (use `_` prefix)

For files that belong to a specific page (hooks, utils, types, schemas):

```
src/pages/clients/
├── ClientsPage.tsx
├── _components/
│   ├── ClientTable.tsx
│   └── ClientFilters.tsx
├── _hooks.ts      # useClientFilters, etc.
├── _utils.ts      # formatClientName, etc.
├── _types.ts      # ClientFilters, etc.
└── _schemas.ts    # clientSearchSchema, etc.
```

For nested routes:

```
src/pages/clients/{clientId}/
├── ClientDetailPage.tsx
├── _components/
├── _hooks.ts
├── _utils.ts
├── _types.ts
└── _schemas.ts
```

## Decision Trees

### Component Placement

```
Global (2+ pages)?  → src/components/
Single page?         → src/pages/{page}/_components/
shadcn/ui?           → src/components/ui/
```

### Code Location

```
Types (shared 2+)    → src/types/{domain}.ts
Types (local 1 page) → src/pages/{page}/_types.ts
Utils (shared 2+)    → src/lib/
Utils (local 1 page)  → src/pages/{page}/_utils.ts
Hooks (shared 2+)    → src/hooks/
Hooks (local 1 page)  → src/pages/{page}/_hooks.ts
Schemas (shared 2+)  → src/schemas/ or lib/
Schemas (local 1 page) → src/pages/{page}/_schemas.ts
Form fields          → src/components/form/fields/
Form templates       → src/components/form/templates/
```

### Styling Decision

```
Tailwind class exists?  → className
Dynamic value?          → style prop
Conditional styles?     → cn()
Static only?            → className (no cn())
```

### Scope Rule (ABSOLUTE)

- Used 2+ pages → `src/components/` or `src/lib/` or `src/types/` or `src/hooks/`
- Used 1 page only → page-specific `_components/`, `_hooks.ts`, `_utils.ts`, etc.
- **This determines ALL folder structure decisions**

## Form Components

### Available Form Fields

All form fields are in `src/components/form/fields/`:

```typescript
import {
  CustomInput,
  CustomSelect,
  CustomDatePicker,
  CustomCheckbox,
  CustomTextarea,
  CustomRadioGroup,
  CustomNumberInput,
  AmountInput,
  ZipCodeInput,
  CountriesMultiSelect,
  AddressFields,
  ForeignAddressFields,
  ErrorMessage,
  // ... and more
} from "@/components/form/fields";
```

### Form Template: SequentialFilesUploadForm

For uploading multiple files sequentially:

```typescript
import { SequentialFilesUploadForm } from "@/components/form/templates/SequentialFilesUploadForm";
```

### Forms + Validation Pattern

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CustomInput, ErrorMessage } from "@/components/form/fields";

const schema = z.object({
  email: z.email(),
  name: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

export function MyForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    // TODO: Call API
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <CustomInput
        label="Email"
        {...form.register("email")}
        error={form.formState.errors.email?.message}
      />
      <ErrorMessage error={form.formState.errors.email} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Batch vs Instant Component API (REQUIRED)

When a component supports both **batch** (deferred, submit-based) and **instant** (immediate callback) behavior, model the coupling with a discriminated union.

```typescript
// ❌ NEVER: Independent optionals
interface FilterProps {
  onBatchApply?: (values: string[]) => void;
  onInstantChange?: (value: string) => void;
  isBatchMode?: boolean;
}

// ✅ ALWAYS: Discriminated union
type BatchProps = {
  mode: "batch";
  onApply: (values: string[]) => void;
  onCancel: () => void;
};

type InstantProps = {
  mode: "instant";
  onChange: (value: string) => void;
  onApply?: never;
  onCancel?: never;
};

type FilterProps = BatchProps | InstantProps;
```

## Reuse Shared Display Utilities First (REQUIRED)

Before adding local display maps, search for existing helpers.

```typescript
// ✅ CHECK THESE FIRST:
// src/lib/utils.ts      → general formatters
// src/types/client.ts  → client status labels
// src/types/document.ts → document type labels

// ❌ NEVER duplicate existing maps
```

## Derived State Rule (REQUIRED)

Avoid `useState` + `useEffect` patterns that mirror props.

```typescript
// ❌ NEVER: Mirror props into state via effect
const [localFilter, setLocalFilter] = useState(filter);
useEffect(() => { setLocalFilter(filter); }, [filter]);

// ✅ ALWAYS: Derive directly
const localFilter = filter;
```

If local state is genuinely needed, add a comment explaining why.

## Strict Key Typing for Label Maps (REQUIRED)

```typescript
// ❌ Loose — typos compile silently
const STATUS_LABELS: Record<string, string> = {
  actve: "Active",  // typo, no error
};

// ✅ Tight — union key
type Status = "active" | "inactive" | "pending";
const STATUS_LABELS: Record<Status, string> = {
  active: "Active",
  inactive: "Inactive",
  pending: "Pending",
};
```

## QA Checklist Before Commit

- [ ] `pnpm lint` passes
- [ ] All UI states handled (loading, error, empty)
- [ ] No secrets in code
- [ ] Error messages sanitized
- [ ] Forms have proper validation
- [ ] Accessibility: keyboard navigation, ARIA labels
- [ ] Mobile responsive (if applicable)

## Migrations Reference

| From | To | Key Changes |
|------|-----|-------------|
| React 18 | 19 | Async components, React Compiler (no useMemo/useCallback) |
| Zod 3 | 4 | `z.email()` not `z.string().email()`, `error` not `message` |
