# Catálogos institucionales

> Prefijo de IDs: `CAT` · Estado: vigente

## Resumen

Carreras, tipos de proyecto y niveles educativos que parametrizan usuarios y repositorios.
No cubre catálogo de empresas/asesores empresariales: ver [08-business-advisors-and-companies.md](08-business-advisors-and-companies.md).
CRUD de estos catálogos: en la práctica **admin-only** (permisos no van en defaults de rol).

## Actores

| Actor | Qué hace aquí |
|-------|---------------|
| Administrador | CRUD de `careers`, `project_types`, `education_levels` |
| Cualquier creador de repo/usuario | Solo selecciona registros `is_active` |

## Reglas de negocio

| ID | Regla |
|----|-------|
| CAT-R1 | `careers.code` es identificador estable usado en forms/API. |
| CAT-R2 | Solo carreras con `is_active` son seleccionables al crear repos/usuarios. |
| CAT-R3 | FK desde repositorios/perfiles a carrera: **restrictOnDelete**. |
| CAT-R4 | Solo niveles educativos `is_active` son seleccionables. |
| CAT-R5 | Solo existen periodos para tipos con `requires_academic_advisor = true`. |
| CAT-R6 | `requires_business_advisor = true` exige datos mínimos de asesor empresarial (+ empresa) al sync de organización. |
| CAT-R7 | `is_team_project = true` → en cobertura de periodo, demanda = # repos (no # inscritos). |
| CAT-R8 | `requires_term` y `requires_internship_flow` están en catálogo; poco enforcement runtime hoy (ver [99-known-gaps](99-known-gaps.md)). |

### Semilla actual (referencia)

| `code` | Académico | Empresarial | Team |
|--------|-----------|-------------|------|
| `integrative` | sí | no | sí |
| `internship` | sí | sí | — |
| `special_project` | no | no | — |

### Flags de `project_types`

| Flag | Efecto |
|------|--------|
| `requires_academic_advisor` | Exige periodo abierto al crear/actualizar; habilita periodos |
| `requires_business_advisor` | Exige organización (asesor + empresa) |
| `is_team_project` | Demanda de cobertura = repositorios |
| `requires_term` | Almacenado; poco enforcement |
| `requires_internship_flow` | Almacenado; poco enforcement |

## Escenarios

| ID | Actor | Situación | Resultado esperado | Regla |
|----|-------|-----------|--------------------|-------|
| CAT-01 | Alumno con `repositories.create` | Envía create de repo con código de carrera cuyo `is_active = false` | Validación falla en el campo de carrera; no se crea el repositorio | CAT-R2 |
| CAT-02 | Director | Intenta crear un `project_period` para el tipo `special_project` (`requires_academic_advisor = false`) | No se permite / no aplica periodo para ese tipo; no queda fila de periodo usable | CAT-R5 |
| CAT-03 | Alumno | Crea o actualiza repo tipo `internship` (`requires_business_advisor = true`) sin nombre de asesor ni empresa | Validación de organización falla; el repo no queda guardado con organización incompleta | CAT-R6 |
| CAT-04 | Sistema (cobertura de periodo) | Tipo `integrative` con `is_team_project = true`, 10 inscritos y 4 repos en el periodo | La demanda de cobertura se calcula como **4** (repos), no como 10 inscritos | CAT-R7 |
| CAT-05 | Admin | Intenta borrar una carrera que aún tiene repositorios o perfiles apuntándola | Delete bloqueado por FK `restrictOnDelete` | CAT-R3 |

## Referencias

- Código: seeders de `careers` / `project_types` / `education_levels`
- Tablas: `careers`, `project_types`, `education_levels` ([database-schema](../technical/database-schema.md))
- Permisos: `careers.*`, `project_types.*`, `education_levels.*`
- Relacionados: [05-repositories.md](05-repositories.md), [06-project-periods.md](06-project-periods.md)
