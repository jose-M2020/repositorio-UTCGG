# Esquema de base de datos

Estado actual del esquema (migraciones + modelos). Motor de tests: SQLite in-memory; desarrollo/producción según `.env`.

---

## Diagrama de dominio

```text
addresses 1──N companies 1──N business_advisor_affiliations ── N:1 business_advisors
                │                         │
                │                         └── 1──N repository_business_advisors (snapshot)
                └── 1──N repositories ── 1──N repository_business_advisors
                                   ├── N──N users (repository_user)
                                   ├── 1──N files
                                   └── 1──N repository_advisors ── N:1 users + project_periods

careers 1──N student_profiles / career_assignments / repositories / project_period_participants
education_levels 1──N student_profiles / repositories
project_types 1──N project_periods 1──N repositories
                     │
                     ├── 1──N project_period_participants ── N:1 users + careers
                     ├── 1──N advisor_period_capacities ── N:1 users
                     └── 1──N repository_advisors

users 1──1 student_profiles | teacher_profiles | staff_profiles
  │
  ├── N──N roles / permissions (Spatie)
  └── 1──N career_assignments ── N:1 careers
```

---

## Enums / valores de dominio

| Campo | Valores |
|-------|---------|
| `users.user_type` | `academic`, `workforce`, `staff` |
| `users.status` | `pending_activation`, `active`, `inactive` |
| `student_profiles.academic_status` | `active`, `temporary_leave`, `dropped`, `graduated`, `titled` |
| `student_profiles.shift` | `morning`, `afternoon`, `mixed` |
| `teacher_profiles.academic_degree` | `bachelor`, `master`, `doctorate`, `other` |
| `teacher_profiles.contract_type` | `full_time`, `part_time`, `hourly` |
| `career_assignments.position` | `teacher`, `career_director`, `coordinator` |
| `project_periods.status` | `draft`, `open`, `closed` |
| `project_period_participants.status` | `enrolled`, `withdrawn`, `completed` |
| `repository_advisors.role` | `primary`, `co_advisor` |
| `repository_business_advisors.acceptance_status` | `pending`, `confirmed`, `rejected` |
| `companies/business_advisors/affiliations.status` | `pending_review`, `verified`, `rejected`, `merged`, `inactive` |
| `*.source` (catálogo) | `user`, `legacy_import` |
| `repository_business_advisors.confirmed_via` | `email_link`, `academic_advisor` |

Perfiles por `user_type`:

| `user_type` | Perfil | Roles típicos |
|-------------|--------|---------------|
| `academic` | `student_profiles` | `student` |
| `workforce` | `teacher_profiles` | `teacher`, `career_director` |
| `staff` | `staff_profiles` | `admin`, `director` |

---

## Tablas de dominio

### `users`

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | bigint PK | |
| `first_name` | string | |
| `last_name` | string | |
| `second_last_name` | string nullable | |
| `email` | string unique | |
| `user_type` | string(32) nullable | ver enum |
| `phone` | string(20) nullable | |
| `avatar_path` | string nullable | |
| `last_login_at` | timestamp nullable | |
| `must_change_password` | bool default false | |
| `preferences` | json nullable | |
| `email_verified_at` | timestamp nullable | |
| `password` | string nullable | hashed; null hasta activación |
| `status` | string(32) default `active` | ver enum |
| `remember_token` | string nullable | |
| `created_at` / `updated_at` | timestamps | |
| `deleted_at` | soft delete | |

Índices: `user_type`, `status`, `(user_type, status)`.

Relaciones: `hasOne` student/teacher/staff profile; `belongsToMany` repositories; `hasMany` career_assignments, advisor_assignments, advisor_capacities, period_participations; Spatie roles/permissions.

---

### `student_profiles`

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | bigint PK | |
| `user_id` | FK → users unique | cascadeOnDelete |
| `student_number` | string(20) nullable unique | |
| `career_id` | FK → careers | restrictOnDelete |
| `education_level_id` | FK → education_levels nullable | restrictOnDelete |
| `admission_year` | smallint nullable | |
| `generation` | string(9) nullable | |
| `current_term` | tinyint nullable | |
| `group` | string(10) nullable | |
| `shift` | string(16) nullable | enum Shift |
| `academic_status` | string(32) default `active` | |
| `admission_date` / `graduation_date` | date nullable | |
| `curp` | string nullable | encrypted at rest |
| `created_at` / `updated_at` | timestamps | |

---

### `teacher_profiles`

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | bigint PK | |
| `user_id` | FK → users unique | cascadeOnDelete |
| `employee_number` | string(20) nullable unique | |
| `primary_career_id` | FK → careers nullable | restrictOnDelete |
| `department` | string nullable | |
| `academic_degree` | string(32) nullable | |
| `specialty` | string nullable | |
| `contract_type` | string(32) nullable | |
| `hired_at` | date nullable | |
| `office` | string nullable | |
| `public_bio` | text nullable | |
| `research_lines` | json nullable | |
| `orcid` | string(19) nullable | |
| `can_be_advisor` | bool default true | |
| `created_at` / `updated_at` | timestamps | |

---

### `staff_profiles`

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | bigint PK | |
| `user_id` | FK → users unique | cascadeOnDelete |
| `employee_number` | string(20) nullable unique | |
| `job_title` | string | required |
| `department` / `office` | string nullable | |
| `hired_at` | date nullable | |
| `created_at` / `updated_at` | timestamps | |

---

### `career_assignments`

Asignaciones activas: `ends_at IS NULL` (o fecha futura según scope `active`).

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | bigint PK | |
| `user_id` | FK → users | cascadeOnDelete |
| `career_id` | FK → careers | restrictOnDelete |
| `position` | string(32) | teacher / career_director / coordinator |
| `starts_at` | date | |
| `ends_at` | date nullable | |
| `created_by` | FK → users nullable | nullOnDelete |
| `created_at` / `updated_at` | timestamps | |

Índices: `(user_id, career_id, position)`, `(career_id, position, ends_at)`.

---

### `careers`

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | bigint PK | |
| `code` | string(20) unique | |
| `name` | string | |
| `slug` | string unique | |
| `description` | text nullable | |
| `image_path` | string nullable | home |
| `show_on_home` | bool default false | |
| `sort_order` | unsigned int default 0 | |
| `is_active` | bool default true | |
| `created_at` / `updated_at` | timestamps | |

Índices: `(is_active, sort_order)`, `show_on_home`.

---

### `project_types`

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | bigint PK | |
| `code` | string(40) unique | p.ej. `integrative`, `internship`, `special_project` |
| `name` | string | |
| `description` | text nullable | |
| `is_team_project` | bool default false | |
| `requires_term` | bool default false | |
| `requires_internship_flow` | bool default false | |
| `requires_business_advisor` | bool default false | |
| `requires_academic_advisor` | bool default false | exige periodo + asesor académico |
| `sort_order` | unsigned int default 0 | |
| `is_active` | bool default true | |
| `created_at` / `updated_at` | timestamps | |

---

### `education_levels`

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | bigint PK | |
| `code` | string(20) unique | |
| `name` | string | |
| `sort_order` | unsigned int default 0 | |
| `is_active` | bool default true | |
| `created_at` / `updated_at` | timestamps | |

---

### `project_periods`

Temporada de proyectos por tipo (`draft` → `open` → `closed`).

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | bigint PK | |
| `project_type_id` | FK → project_types | restrictOnDelete |
| `name` | string | unique con `project_type_id` |
| `starts_at` / `ends_at` | date | |
| `status` | string(32) default `draft` | |
| `advisor_default_capacity` | smallint nullable | override del config global |
| `created_by` | FK → users nullable | nullOnDelete |
| `created_at` / `updated_at` | timestamps | |

---

### `project_period_participants`

Demanda: alumnos inscritos en un periodo.

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | bigint PK | |
| `project_period_id` | FK → project_periods | cascadeOnDelete |
| `user_id` | FK → users | cascadeOnDelete |
| `career_id` | FK → careers | restrictOnDelete |
| `status` | string(32) default `enrolled` | |
| `created_at` / `updated_at` | timestamps | |

Unique: `(project_period_id, user_id)`. Índice: `(project_period_id, career_id, status)`.

---

### `advisor_period_capacities`

Tope/disponibilidad opcional por docente y periodo.

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | bigint PK | |
| `project_period_id` | FK → project_periods | cascadeOnDelete |
| `user_id` | FK → users | cascadeOnDelete |
| `max_projects` | smallint nullable | null = heredar default del periodo/config |
| `is_available` | bool default true | false → capacidad efectiva `0` |
| `notes` | string(255) nullable | |
| `created_at` / `updated_at` | timestamps | |

Unique: `(project_period_id, user_id)`.

**Capacidad efectiva:** si `is_available = false` → `0`; si no, `coalesce(max_projects, period.advisor_default_capacity, config('projects.default_advisor_capacity'))`.

Config: `config/projects.php` → `PROJECTS_DEFAULT_ADVISOR_CAPACITY` (default `5`).

**Carga:** `COUNT(repository_advisors)` donde `released_at IS NULL` para ese `user_id` + `project_period_id`.

---

### `repositories`

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | bigint PK | |
| `title` | string | |
| `slug` | string unique | route key |
| `description` | text | |
| `keywords` | string | |
| `is_public` | bool | |
| `career_id` | FK → careers | restrictOnDelete |
| `project_type_id` | FK → project_types | restrictOnDelete |
| `education_level_id` | FK → education_levels | restrictOnDelete |
| `project_period_id` | FK → project_periods nullable | restrictOnDelete; null = legado / sin periodo |
| `company_id` | FK → companies nullable | nullOnDelete |
| `generation` | string | |
| `images` | text nullable | |
| `created_by` | string | identificador del creador (legado string) |
| `created_at` / `updated_at` | timestamps | |

---

### `repository_user`

Pivot miembros del repositorio.

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | bigint PK | |
| `user_id` | FK → users | cascade |
| `repository_id` | FK → repositories | cascade |
| `created_at` / `updated_at` | timestamps | |

Unique: `(user_id, repository_id)`.

---

### `repository_advisors`

Asesor **académico** (usuario del sistema). Activo si `released_at IS NULL`.

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | bigint PK | |
| `repository_id` | FK → repositories | cascadeOnDelete |
| `user_id` | FK → users | restrictOnDelete |
| `project_period_id` | FK → project_periods | restrictOnDelete |
| `role` | string(32) default `primary` | |
| `assigned_by` | FK → users nullable | nullOnDelete |
| `assigned_at` | timestamp | |
| `released_at` | timestamp nullable | |
| `override_reason` | string(500) nullable | sobrepasar capacidad |
| `created_at` / `updated_at` | timestamps | |

Índices: `(user_id, project_period_id, released_at)`, `(repository_id, role, released_at)`.

---

### `files`

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | bigint PK | |
| `repository_id` | FK → repositories | cascade |
| `original_name` | string | |
| `file_type` | string | |
| `file_path` | string | storage/S3 |
| `is_public` | bool default false | |
| `created_at` / `updated_at` | timestamps | |

---

### `addresses`

Dirección reutilizable (hoy usada por `companies`; otras tablas pueden enlazar con su propio `address_id`).

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | bigint PK | |
| `street_line` | string | required |
| `street_line_2` | string nullable | |
| `neighborhood` | string nullable | colonia |
| `city` / `state` | string nullable | |
| `postal_code` | string(12) nullable | |
| `country` | string(2) default `MX` | ISO |
| `references` | string nullable | |
| `created_at` / `updated_at` | timestamps | |

Índices: `(city, state)`, `postal_code`.

---

### `companies`

Catálogo reutilizable de empresas.

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | bigint PK | |
| `name` | string | |
| `name_normalized` | string nullable indexed | |
| `rfc` | string(13) nullable unique | |
| `sector` / `phone` / `email` | nullable | |
| `address_id` | FK → addresses nullable | nullOnDelete |
| `notes` | text nullable | |
| `status` | string(32) default `pending_review` | |
| `source` | string(16) default `user` | |
| `merged_into_id` / `created_by` / `verified_by` | FKs nullable | |
| `verified_at` | timestamp nullable | |

### `business_advisors`

Persona del catálogo (**sin** contacto). Contacto vive en afiliaciones.

### `business_advisor_affiliations`

Persona ↔ empresa en el tiempo (`email`/`phone`/`job_title`; `ends_at` null = vigente).

### `repository_business_advisors`

Asignación al repositorio + `snapshot` histórico. Activo si `released_at IS NULL`.

| Campo | Tipo | Notas |
|-------|------|-------|
| `business_advisor_id` | FK → business_advisors | restrictOnDelete |
| `business_advisor_affiliation_id` | FK → affiliations nullable | restrictOnDelete |
| `snapshot` | json | congelado al adjuntar; **fuente** de nombre/contacto del assignment |
| `company_id` | FK → companies nullable | conveniencia / primary |
| `acceptance_status` | default `pending` | |
| `confirmation_*` / `confirmed_via` | confirmación por correo | |

---

## Autorización (Spatie)

| Tabla | Rol |
|-------|-----|
| `permissions` | `id`, `name`, `description` nullable, `guard_name`, timestamps; unique `(name, guard_name)` |
| `roles` | `id`, `name`, `guard_name`, timestamps; unique `(name, guard_name)` |
| `model_has_roles` | pivot morph `model_id` + `model_type` + `role_id` |
| `model_has_permissions` | pivot morph directo a permissions |
| `role_has_permissions` | pivot role ↔ permission |

Roles de sistema: `admin`, `director`, `career_director`, `teacher`, `student`.

Permisos de periodos/asesores (entre otros): `project_periods.*`, `advisors.*`, `business_advisors.*`, `companies.create|verify|merge`.

---

## Infraestructura Laravel

| Tabla | Uso |
|-------|-----|
| `password_reset_tokens` | email PK, token, created_at |
| `sessions` | id, user_id, ip, user_agent, payload, last_activity |
| `cache` / `cache_locks` | driver database |
| `jobs` / `job_batches` / `failed_jobs` | colas |

---

## Notas de integridad

- Catalog FKs (`career_id`, `project_type_id`, `education_level_id`) usan **restrictOnDelete**.
- Pivots y archivos usan **cascadeOnDelete** con su repositorio/usuario.
- `companies.address_id` y `repositories.company_id` usan **nullOnDelete**.
- Asesor académico (`repository_advisors`) ≠ asesor empresarial (`repository_business_advisors`).
- `repositories.project_period_id` nullable: repositorios previos a periodos quedan sin temporada.
- Soft deletes solo en `users`.
