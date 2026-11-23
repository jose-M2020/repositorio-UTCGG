# Repositorios

> Prefijo de IDs: `REP` · Estado: vigente

## Resumen

Proyecto académico con metadatos, miembros, archivos, periodo opcional y organización opcional.
No cubre detalle de periodos/asesores académicos: ver [06-project-periods.md](06-project-periods.md) y [07-academic-advisors.md](07-academic-advisors.md).
No cubre detalle de organización BA: ver [08-business-advisors-and-companies.md](08-business-advisors-and-companies.md).

## Actores

| Actor | Qué hace aquí |
|-------|---------------|
| Alumno / docente / gestor | Crea y edita repositorios (con permiso) |
| Miembro | Gestiona datos, miembros, archivos, organización |
| Visitante | Consulta solo repositorios públicos |
| Admin | Bypass de membresía |

## Reglas de negocio

| ID | Regla |
|----|-------|
| REP-R1 | `visibility = public` → `is_public = true` y aparece en índice público. |
| REP-R2 | Guest / no autorizado ante repo privado recibe **404**. |
| REP-R3 | Show público: solo archivos `is_public`; relacionados = misma carrera, públicos, máx. 6; sin asesor empresarial ni contactos. |
| REP-R4 | Crear exige `repositories.create` y datos base: título, descripción, keywords, generación, códigos activos de carrera/tipo/nivel, `visibility`. |
| REP-R5 | Si el tipo tiene `requires_academic_advisor`, `period_id` obligatorio y periodo `open` del mismo tipo. |
| REP-R6 | Si el tipo tiene `requires_business_advisor`, exige nombre/apellido de asesor + contacto + empresa. |
| REP-R7 | `member_emails` al crear: máximo **8**, distintos, deben existir en `users`. |
| REP-R8 | El creador siempre queda como miembro. |
| REP-R9 | Editar exige miembro (o admin) + `repositories.edit`. |
| REP-R10 | No se puede cambiar de periodo si hay asesor académico activo. |
| REP-R11 | Periodo nuevo debe ser del tipo correcto y estar abierto (o mantener el actual). |
| REP-R12 | Sync de organización al store/update: si no hay asesor → libera primario activo y puede limpiar `company_id`; si hay → libera primario previo, adjunta nuevo como primary y actualiza `company_id`. |
| REP-R13 | En el camino store/update del repo, attach BA usa `send_confirmation = false`. |

## Flujos

### Condicionales al crear

```mermaid
flowchart TD
  A[Tipo de proyecto] --> B{requires_academic_advisor?}
  B -->|sí| C[period_id obligatorio y open del mismo tipo]
  B -->|no| D[period opcional/null]
  A --> E{requires_business_advisor?}
  E -->|sí| F[Nombre/apellido asesor + contacto + empresa]
  E -->|no| G[Organización opcional]
```

### Wizard FE (pasos)

1. Datos del repositorio
2. Proyecto (tipo, nivel, periodo…)
3. Organización (empresa / asesor empresarial)
4. Miembros
5. Ajustes / visibilidad

## Escenarios

| ID | Actor | Situación | Resultado esperado | Regla |
|----|-------|-----------|--------------------|-------|
| REP-01 | Visitante | Entra al índice público de repositorios | Solo aparecen repos con `is_public = true`; los privados no listan | REP-R1 |
| REP-02 | Visitante | Abre por slug un repo con `is_public = false` | Respuesta **404** | REP-R2 |
| REP-03 | Visitante | Abre un repo público que tiene 3 archivos públicos y 2 privados, más un asesor empresarial adjunto | Ve solo los 3 archivos públicos y metadatos del proyecto; **no** ve asesor empresarial ni contactos; relacionados ≤ 6 de la misma carrera | REP-R3 |
| REP-04 | Alumno | Crea repo tipo `integrative` sin `period_id`, o con periodo `draft`/`closed` | Validación falla: exige periodo `open` del mismo tipo | REP-R5 |
| REP-05 | Alumno | Crea repo tipo `integrative` con periodo `open` correcto, sin organización | Repo creado; creador queda en `repository_user`; **no** se asigna asesor académico automáticamente | REP-R5 |
| REP-06 | Alumno | Crea repo tipo `internship` con periodo válido pero sin empresa/asesor/contacto | Validación de organización falla | REP-R6 |
| REP-07 | Docente autenticado con permiso de edición, **no** miembro del repo | Envía update del repositorio | **403** | REP-R9 |
| REP-08 | Creador | En el wizard envía 9 emails distintos en `member_emails` | Validación falla (`max:8`); no se crea el repo | REP-R7 |
| REP-09 | Miembro | Intenta cambiar `project_period_id` mientras hay un `repository_advisors` primary activo (`released_at` null) | Cambio de periodo rechazado | REP-R10 |
| REP-10 | Miembro | Actualiza organización: había primary BA activo y ahora envía otro asesor | Se libera el primary anterior (`released_at`); se adjunta el nuevo como primary; `company_id` del repo apunta a la empresa del nuevo; **sin** correo de confirmación en este camino | REP-R12 |

## Referencias

- Código: `app/Http/Controllers/RepositoryController.php`, `StoreRepositoryRequest`, `UpdateRepositoryRequest`, `RepositoryOrganizationService`
- Tablas: `repositories`, `repository_user` ([database-schema](../technical/database-schema.md))
- Permisos: `repositories.create`, `repositories.edit`, `repositories.destroy`, `repositories.index`
- Relacionados: [04-catalogs.md](04-catalogs.md), [06-project-periods.md](06-project-periods.md), [08-business-advisors-and-companies.md](08-business-advisors-and-companies.md), [09-files-and-media.md](09-files-and-media.md)
