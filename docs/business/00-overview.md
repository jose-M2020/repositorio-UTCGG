# Visión general del producto

## Qué es

**Repositorio Institucional de Proyectos Académicos**: publicar, consultar y gestionar proyectos (integradoras, estadías, proyectos especiales).

## Capacidades principales

1. **Catálogo público** (Open Access) de repositorios públicos.
2. **Panel privado** para miembros: editar proyecto, miembros, archivos, organización.
3. **Administración** de usuarios, roles, catálogos institucionales.
4. **Periodos** con inscripción, capacidad y asignación de asesores académicos.
5. **Catálogo de empresas y asesores empresariales** reutilizable, con snapshot por proyecto.

## Actores

| Actor | Rol Spatie típico | Qué hace |
|-------|-------------------|----------|
| Administrador | `admin` | Todo (bypass `Gate::before`) |
| Director | `director` | Usuarios amplios, periodos, asesores, fusión/auditoría BA |
| Director de carrera | `career_director` | Usuarios de su carrera, asignar/distribuir asesores, verificar BA |
| Docente | `teacher` | Repos, archivos; verificar BA si es asesor académico activo |
| Alumno | `student` | Crear/editar repos propios, adjuntar organización |
| Visitante | — | Solo repos públicos (sin contacto de asesor empresarial) |
| Asesor empresarial externo | — | No es usuario; confirma por correo firmado |

Detalle de permisos: [02-roles-and-permissions.md](02-roles-and-permissions.md).

## Tipos de proyecto (comportamiento)

| Código | Nombre típico | Asesor académico | Asesor empresarial |
|--------|---------------|------------------|--------------------|
| `integrative` | Integradora | Obligatorio (periodo) | No |
| `internship` | Estadía | Obligatorio (periodo) | Obligatorio |
| `special_project` | Proyecto especial | No | No |

Flags adicionales: ver [04-catalogs.md](04-catalogs.md).

## Dos historias de “asesor”

| | Académico | Empresarial |
|---|-----------|-------------|
| Quién es | Docente **usuario** del sistema | Persona externa (no usuario) |
| Cómo entra al proyecto | Gestor asigna / reparte en un **periodo** | Miembro del proyecto lo busca o da de alta |
| Qué limita | Carrera(s), disponibilidad, **cupo** de proyectos | Máx. activos por proyecto; validación + confirmación |
| Si cambian los datos | Es el mismo usuario; se reasigna o libera | Misma persona + **nueva afiliación**; el proyecto viejo conserva **snapshot** |
| Detalle | [07-academic-advisors.md](07-academic-advisors.md) | [08-business-advisors-and-companies.md](08-business-advisors-and-companies.md) |

## Principios de diseño

- Identificadores en inglés en código/API; copy de UI en español.
- No borrar historia: liberaciones con `released_at`; catálogo con `inactive` / `merged`.
- Snapshot en asignaciones empresariales: el proyecto conserva lo capturado aunque el catálogo cambie.
- Privacidad: la vista pública no expone asesores empresariales ni contactos.

## Stack

Laravel 13 + Inertia v3 + React 19 + Spatie Permission + Wayfinder.  
Esquema: [technical/database-schema.md](../technical/database-schema.md).
