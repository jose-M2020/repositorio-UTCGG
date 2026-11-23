# Huecos conocidos y deuda

Lista de lo **implementado a medias** o pendiente. Actualizar al cerrar ítems en el mismo PR que el código.

## Catálogo empresarial

| Ítem | Estado |
|------|--------|
| Backend search / attach / verify / merge / confirm | Hecho |
| UI autocompletado “buscar o crear” en form de repo | Pendiente (hoy campos libres) |
| UI “¿Es alguien de estos?” con DuplicateDetector | Backend OK; FE incompleto |
| Bandeja de verificación | Página mínima `panel/business-advisors/pending` |
| Fase C: drop columnas legacy en `repository_business_advisors` | Tras `business-advisors:migrate-legacy` validado |
| ARCO / privacy_requests HTTP | Tabla + permiso; sin flujo completo |
| Export de contactos | Permiso; sin implementación de rol |
| Aviso de privacidad publicado + enlaces | Pendiente producto/legal |

## Asesores académicos

| Ítem | Estado |
|------|--------|
| `co_advisor` | Enum existe; asignación solo `primary` |
| `requires_term` / `requires_internship_flow` | Flags en catálogo; poco enforcement runtime |

## Frontend / stack declarado

| Ítem | Estado |
|------|--------|
| Zustand / TanStack Query / RHF / Zod en AGENTS.md | En deps; formularios actuales usan Inertia Form |
