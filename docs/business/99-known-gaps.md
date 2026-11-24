# Huecos conocidos y deuda

Lista de lo **implementado a medias** o pendiente. Actualizar al cerrar ítems en el mismo PR que el código.

## Catálogo empresarial

| Ítem | Estado |
|------|--------|
| Backend search / attach / verify / merge / confirm | Hecho |
| UI buscar / crear / cambio de afiliación en gestión de repo | Hecho (`RepositoryBusinessAdvisorSection`) |
| UI “¿Es alguien de estos?” con DuplicateDetector | Hecho (persona + empresa al registrar) |
| Bandeja de verificación + merge | Hecho (`panel/business-advisors/pending`) |
| Fase C: drop columnas legacy persona/contacto en `repository_business_advisors` | Hecho (requiere `business-advisors:migrate-legacy` antes si hay filas sin FK) |
| ARCO / privacy_requests HTTP | Hecho (panel `privacy-requests`: alta / resolver / rechazar) |
| Export de contactos | Hecho (`business-advisors.export` CSV; director) |
| Aviso de privacidad publicado + enlaces | Hecho (`/aviso-de-privacidad`; enlaces en confirmación y UI BA) |

## Asesores académicos

| Ítem | Estado |
|------|--------|
| `co_advisor` | Hecho (assign/release + UI en gestión de repo; max vía `PROJECTS_MAX_CO_ADVISORS`) |
| `requires_term` / `requires_internship_flow` | Flags en catálogo; poco enforcement runtime |

## Frontend / stack declarado

| Ítem | Estado |
|------|--------|
| Zustand / TanStack Query / RHF / Zod en AGENTS.md | En deps; formularios actuales usan Inertia Form |
