# Documentación — Repositorio Institucional de Proyectos Académicos

Fuente de verdad del **comportamiento implementado** (Laravel 13 + Inertia/React).

Convenciones de estructura y estilo para IAs/editores: [AGENTS.md](AGENTS.md).  
Plantilla de módulo: [_templates/module.md](_templates/module.md).

## Cómo leer

| Necesitas… | Ve a… |
|------------|--------|
| Qué hace el sistema y quiénes participan | [business/00-overview.md](business/00-overview.md) |
| Términos del dominio | [business/01-glossary.md](business/01-glossary.md) |
| Roles, permisos y capas de auth | [business/02-roles-and-permissions.md](business/02-roles-and-permissions.md) |
| Usuarios, perfiles, activación, carreras | [business/03-users-and-profiles.md](business/03-users-and-profiles.md) |
| Carreras, tipos de proyecto, niveles | [business/04-catalogs.md](business/04-catalogs.md) |
| Repositorios, visibilidad, miembros | [business/05-repositories.md](business/05-repositories.md) |
| Periodos de proyecto | [business/06-project-periods.md](business/06-project-periods.md) |
| Asesores académicos (cupos, elegibilidad, reparto) | [business/07-academic-advisors.md](business/07-academic-advisors.md) |
| Empresas y asesores empresariales | [business/08-business-advisors-and-companies.md](business/08-business-advisors-and-companies.md) |
| Archivos e imágenes | [business/09-files-and-media.md](business/09-files-and-media.md) |
| Huecos conocidos / deuda | [business/99-known-gaps.md](business/99-known-gaps.md) |
| Flujo institucional de asignación académica | [flows/academic-advisor-assignment.md](flows/academic-advisor-assignment.md) |
| Tablas, FKs, enums de BD | [technical/database-schema.md](technical/database-schema.md) |

## Convención

- **Reglas de negocio** = condición verificable con ID estable (`PREFIJO-Rn`).
- **Escenarios** = un resultado esperado por fila; convertibles a test.
- Si el código y este doc divergen, **gana el código**; actualiza el doc en el mismo cambio.

## Mapa rápido del dominio

```text
Usuarios (tipo + rol Spatie + perfil)
    │
Catálogos (carrera, tipo proyecto, nivel)
    │
Periodos de proyecto ── inscritos / capacidad asesores
    │
Repositorio ── miembros, archivos, periodo
    ├── Asesor académico (usuario docente)     → repository_advisors
    └── Organización
            ├── Empresa (catálogo)             → companies
            └── Asesor empresarial (catálogo)  → business_advisors + affiliations
                    └── Asignación + snapshot  → repository_business_advisors
```
