# Documentación del proyecto — Repositorio UTCGG

Documento de referencia de funcionalidades, lógica de negocio, requisitos y arquitectura del **Repositorio Institucional de Proyectos Académicos** de la Universidad Tecnológica de la Costa Grande de Guerrero (UTCGG).

> Generado a partir del código actual (Laravel + Inertia/React). No sustituye una especificación formal; refleja lo implementado.

---

## 1. Resumen ejecutivo

Sistema web para **publicar, consultar y gestionar repositorios de proyectos académicos** (integradoras, estadías y proyectos especiales) de la UTCGG.

Permite:

- Catálogo público de repositorios (Open Access).
- Gestión privada por miembros (edición, miembros, archivos).
- Administración de usuarios y roles (Spatie Permission).
- Subida/descarga de documentos e imágenes en **Amazon S3**.
- Autenticación por sesión (login / logout) y alta administrativa de usuarios.

---

## 2. Stack tecnológico

### Backend

| Pieza | Tecnología |
|-------|------------|
| Framework | Laravel 13 (PHP ≥ 8.3) |
| SPA bridge | Inertia.js v3 |
| Auth / permisos | Sesión Laravel + Spatie Permission |
| Storage | AWS S3 (`league/flysystem-aws-s3-v3`) |
| Rutas tipadas FE | Laravel Wayfinder |
| Tests | Pest / PHPUnit Feature |
| Calidad | Pint, Larastan/PHPStan |

### Frontend

| Pieza | Tecnología |
|-------|------------|
| UI | React 19 + Vite (vite-plus) |
| Estilos | Tailwind CSS v4 + shadcn/Base UI |
| Iconos | lucide-react |
| Toasts | Sonner |
| Upload | react-dropzone |
| Tipado | TypeScript |

> **Nota:** Zustand, TanStack Query, React Hook Form y Zod están en `package.json` / `AGENTS.md`, pero **aún no se usan** en el código de `resources/js/`. Los formularios van con Inertia `<Form>` / `useForm` + Wayfinder.

### Arquitectura frontend

```
resources/js/
├── app.tsx                 # Bootstrap Inertia + FlashToaster
├── pages/                  # Páginas Inertia delgadas
├── features/               # Dominio (auth, users, roles, repositories, home, files)
├── shared/                 # Header, footer, UI, catálogo, picker
├── actions/ + routes/      # Wayfinder generado
└── types/                  # Props globales (auth, flash)
```

Patrón: **página → contenedor → componentes**. Cada feature exporta API pública vía `index.ts`.

---

## 3. Dominio académico

### Entidades

| Concepto | Modelo / tabla | Descripción |
|----------|----------------|-------------|
| Usuario | `User` / `users` | `nombre`, `apellido`, `email`, `password`, `carrera` |
| Rol | Spatie `roles` | `admin`, `docente`, `alumno` (+ custom) |
| Permiso | Spatie `permissions` | Acciones CRUD con `description` en español |
| Repositorio | `Repositorio` / `repositorios` | Proyecto académico; ruta por `slug` |
| Miembro | pivot `repositorio_user` | Usuario ↔ repositorio |
| Archivo | `File` / `files` | Documento en S3; flag `is_public` |
| Imágenes | JSON `repositorios.imagenes` | Galería de paths S3 (sin tabla) |

### Catálogo institucional (`App\Support\Catalog` / `shared/data/catalog.ts`)

**Carreras**

| Código | Nombre |
|--------|--------|
| TIC | Tecnologías de la Información y Comunicación |
| G | Gastronomía |
| MM | Metal Mecánica |
| ER | Energías Renovables |
| PA | Procesos Alimentarios |
| LI | Logística Internacional |
| MI | Mantenimiento Industrial |
| GCH | Gestión del Capital Humano |
| GDT | Gestión y Desarrollo Turístico |

**Niveles:** `TSU` (Técnico Superior Universitario), `Ingeniería`.

**Tipos de proyecto:** `Integradora`, `Estadía`, `Proyecto Especial`.

### Atributos de repositorio

| Campo | Regla |
|-------|-------|
| `nombre_rep` | Título |
| `slug` | Único; generado desde el nombre |
| `descripcion` | Texto |
| `tipo_proyecto` | Integradora \| Estadía \| Proyecto Especial |
| `nivel_proyecto` | TSU \| Ingeniería |
| `palabras_clave` | Texto libre |
| `publico` | Boolean (formulario: `visibilidad` = `publico` \| `privado`) |
| `carrera` | Código del catálogo |
| `empresa` | Organización asociada |
| `asesor_externo` | **Obligatorio si tipo = Estadía** |
| `generacion` | Cohorte (ej. `2026`) |
| `created_by` | Nombre del creador (string) |
| `imagenes` | JSON de paths S3 |

---

## 4. Roles, permisos y autorización

### Permisos sembrados (`PermissionsSeeder`)

```
usuarios.index | usuarios.create | usuarios.edit | usuarios.destroy | usuarios.search
roles.index | roles.create | roles.edit | roles.destroy
repositorios.index | repositorios.create | repositorios.edit | repositorios.destroy
archivos.index | archivos.create | archivos.edit | archivos.destroy
```

### Matriz por rol

| Capacidad | admin | docente | alumno |
|-----------|:-----:|:-------:|:------:|
| Ver/crear/editar usuarios | ✓* | ✓ | — |
| Borrar usuarios | ✓* | — | — |
| Buscar usuarios (JSON) | ✓* | — | ✓ |
| CRUD roles | ✓* | — | — |
| Ver/crear/editar repos | ✓* | ✓ | ✓ |
| Borrar repos | ✓* | ✓ | — |
| Archivos (CRUD) | ✓* | ✓ | ✓ |

\* **Admin no tiene permisos asignados en el seeder.** Tiene bypass global:

```php
Gate::before(fn ($user, $ability) => $user->hasRole('admin') ? true : null);
```

### Capas de autorización

1. **Middleware `auth`** — rutas privadas.
2. **`can:permiso`** — Spatie (y bypass de admin).
3. **`AuthorizeMember`** — admin **o** miembro del pivot; si no → **403**.
4. **Form Requests** — `authorize()` + reglas de validación.
5. **Visibilidad de repos privados** — en show público, no-miembro/guest → **404** (ocultación, no 403).

**No hay Policies Eloquent** (`app/Policies` vacío).

---

## 5. Funcionalidades por módulo

### 5.1 Home y Acerca (públicos)

| Función | Detalle |
|---------|---------|
| Landing `/` | 8 repos públicos recientes + 8 destacados aleatorios |
| Hero | Búsqueda que navega al catálogo de repositorios |
| Áreas de estudio | Accesos por carrera |
| Stats | Métricas estáticas de presentación |
| `/acerca` | Misión Open Access UTCGG |

### 5.2 Autenticación

| Flujo | Comportamiento |
|-------|----------------|
| Login | Público (`guest`); rate limit **3** intentos; redirect al panel de trabajo |
| Logout | Invalida sesión → `home` |
| Alta de usuarios | Se realiza en `/usuarios/create`; requiere `usuarios.create` y asigna un rol |
| Password reset | Tabla/config existen; **sin rutas ni UI** |
| Email verification | No implementado |

### 5.3 Usuarios

| Función | Detalle |
|---------|---------|
| Listado | Paginado (10); filtros: `query`, `carrera[]`, `rol`, fecha (`hoy`/`semana`/`mes`/`año`) o `rango_fecha` |
| Crear / editar | nombre, apellido, email, carrera, rol, password (opcional en edit) |
| Eliminar | Borrado físico |
| Show | Perfil + repos públicos/privados del usuario (si no es admin) |
| Búsqueda JSON | `GET /api/usuarios/{repositorio?}` — solo roles `alumno` y `docente`; usada por `UserSearchPicker` |
| Regla extra | No-admin no puede asignar rol `admin` |

### 5.4 Roles

| Función | Detalle |
|---------|---------|
| CRUD | Nombre + sync de permisos |
| UI | Checkboxes agrupados por prefijo (`usuarios.*`, `roles.*`, …) |
| Nav | Disponible en la superficie de gestión para quien tenga `roles.index` |

### 5.5 Repositorios (catálogo público)

| Función | Detalle |
|---------|---------|
| Índice | Solo `publico = true` |
| Filtros | `query` + `search_field` (`title`\|`description`\|`author`), `carrera[]`, `tipo[]`, `nivel[]`, rango `year` |
| Show | Metadatos + archivos **públicos** + relacionados por misma carrera (máx. 6) |
| Privados | Guest / no-miembro → **404** |

### 5.6 Repositorios (gestión / mi cuenta)

| Función | Detalle |
|---------|---------|
| Crear | Wizard 3 pasos; 1–8 emails de colaboradores; creador se agrega como miembro |
| Mis repositorios | Admin ve todos; resto solo los suyos |
| Manage | Detalle, editar, eliminar, miembros, archivos (`AuthorizeMember`) |
| Miembros | Agregar (`user_ids`) / quitar; único por usuario-repo |
| Update | Metadatos + visibilidad (sin re-enviar miembros en el form de update) |

### 5.7 Archivos e imágenes

| Función | Detalle |
|---------|---------|
| Subida | Hasta 5 docs (`zip,rar,pdf,doc,docx`, máx 20 MB) + hasta 5 imágenes (`png,jpg,jpeg,svg,webp`, máx 5 MB) |
| Storage | Disco **`s3`** (hardcodeado en código) |
| Path | `files/{carrera}/{año}/repositorio-{id}/archivos|imagenes/…` |
| Visibilidad | Nuevos archivos nacen **privados**; miembro puede togglear `is_public` |
| Download | Público → cualquiera; privado → admin o miembro |
| Borrado | Elimina DB + objeto S3; imágenes por índice en JSON |

---

## 6. Rutas principales

### Públicas

| Método | URI | Nombre |
|--------|-----|--------|
| GET | `/` | `home` |
| GET | `/acerca` | `about` |
| GET | `/repositorios` | `repositorios.index` |
| GET | `/repositorios/{slug}` | `repositorios.show` |
| GET | `/files/download/{file}` | `files.download` |
| GET/POST | `/login` | `login` |

### Autenticadas

| Método | URI | Nombre |
|--------|-----|--------|
| resource | `/usuarios` | `usuarios.*` |
| GET | `/api/usuarios/{repositorio?}` | `usuarios.get` |
| resource | `/roles` | `roles.*` |
| GET/POST | `/repositorios/create\|store` | create/store |
| GET/PUT/DELETE | `/repositorios/{slug}/…` | edit/update/destroy |
| GET | `/mi-cuenta/repositories` | `repositorios.user` |
| GET | `/mi-cuenta/repositorios/{slug}` | `repositorios.user.show` |
| POST/DELETE | `…/members` | `repositorios.member.*` |
| * | `…/archivos/*`, `…/imagenes/{index}` | `files.*` |
| POST | `/logout` | `logout` |

No hay `routes/api.php`. Health check: `/up`.

---

## 7. Esquema de base de datos

### `users`
`id`, `nombre`, `apellido`, `email` (unique), `email_verified_at`, `password`, `carrera` (nullable), `remember_token`, timestamps.

También: `password_reset_tokens`, `sessions`.

### Spatie
`permissions` (+ `description`), `roles`, `model_has_roles`, `model_has_permissions`, `role_has_permissions`.

### `repositorios`
Metadatos del proyecto + `slug` unique + `publico` bool + `imagenes` text/JSON + `created_by`.

### `repositorio_user`
`user_id`, `repositorio_id`, timestamps; unique compuesto; FK cascade.

### `files`
`repositorio_id`, `original_name`, `file_type`, `file_path`, `is_public` (default false), timestamps.

### Infra Laravel
`cache` / `cache_locks`, `jobs` / `job_batches` / `failed_jobs`.

---

## 8. Validaciones clave (Form Requests)

| Request | Reglas destacadas |
|---------|-------------------|
| `LoginRequest` | email + password; throttle 3 |
| `StoreUserRequest` | carrera **required**; `rol` exists; authorize `usuarios.create` |
| `UpdateUserRequest` | password nullable; authorize `usuarios.edit` |
| `Store/UpdateRoleRequest` | name unique; permissions existentes |
| `StoreRepositorioRequest` | visibilidad `publico\|privado`; 1–8 emails distinct exists; si Estadía → `asesor_externo` required |
| `StoreRepositorioMemberRequest` | `user_ids` min 1, exists |
| `StoreRepositoryFilesRequest` | archivos required (tipos/tamaños arriba); imágenes opcionales |
| `UpdateRepositoryFileRequest` | `is_public` boolean |

**Password defaults:** en producción min 12 + mixedCase + letters + numbers + symbols + uncompromised; fuera de prod, defaults mínimos de Laravel.

---

## 9. UI / navegación

### Superficies

- **Pública (`PublicLayout`):** Inicio, Repositorios, Acerca y acceso al panel.
- **Privada (`AuthenticatedLayout`):** un único `AppShell` responsive agrupa
  Trabajo, Gestión y Explorar. Cada opción se muestra según las capacidades
  autorizadas por Laravel, no por nombres de rol.

### Páginas Inertia

| Página | Contenido |
|--------|-----------|
| `home` / `about` | Landing y acerca |
| `auth/login` | AuthShell + formulario |
| `users/*` | CRUD + filtros + show |
| `roles/*` | CRUD + permisos |
| `repositories/index` | Catálogo + filtros |
| `repositories/mine` | Mis proyectos |
| `repositories/create` | Wizard 3 pasos |
| `repositories/edit` | Formulario plano |
| `repositories/show` | Detalle público + archivos (solo lectura) |
| `repositories/manage` | Gestión + miembros + archivos |
| `files/create` | Dropzone de subida |

### Componentes compartidos relevantes

- `UserSearchPicker` — autocomplete con debounce 300 ms, máx. 8, modos email / id.
- `FlashToaster` — Sonner con `flash.status`.
- `RepositoryFilesPanel` — listado, download, toggle público, delete.
- `highlightMatch` — resalta coincidencias de búsqueda.

---

## 10. Datos de demo (seeders)

`DatabaseSeeder`:

1. Ejecuta `PermissionsSeeder`.
2. Admin: `test@example.com` (password de factory: `password`), carrera `TIC`, rol `admin`.
3. 10 docentes + 30 alumnos.
4. 40 repositorios públicos; 2–5 miembros (+ admin) y 1–3 archivos fake por repo.

---

## 11. Requisitos de entorno

### Obligatorios de app

- PHP 8.3+, Composer, Node/npm (o pnpm según entorno).
- Base de datos (default sqlite en `.env.example`).
- `APP_KEY`, sesión, cache.

### Archivos (operativo)

Aunque `FILESYSTEM_DISK` default sea `local`, el código de archivos usa **`s3`**:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_DEFAULT_REGION`
- `AWS_BUCKET`
- `AWS_USE_PATH_STYLE_ENDPOINT` (y opcionalmente `AWS_URL` / `AWS_ENDPOINT`)

### Comandos útiles

```bash
composer setup          # install + key + migrate + npm build
composer dev            # entorno de desarrollo
php artisan test        # suite Feature
npm run dev / build
npm run types:check
```

---

## 12. Mapa de autorización (resumen)

```
Guest
  ├─ home / about / catálogo público / show público
  ├─ download de archivo público
  └─ login

Auth + permiso Spatie
  ├─ alumno  → search usuarios, crear/editar repos, archivos
  ├─ docente → + usuarios index/create/edit, destroy repos
  └─ admin   → todo (Gate::before) + roles + manage de cualquier repo

AuthorizeMember (admin OR miembro del pivot)
  └─ manage, miembros, upload/edit/delete archivos
```

---

## 13. Cobertura de tests Feature

| Área | Archivo | Qué valida |
|------|---------|------------|
| Auth | `AuthenticationTest` | Login, logout, redirect al panel y rate limit |
| Users | `UserManagementTest` | Guest/403/CRUD admin, validación create |
| Roles | `RoleManagementTest` | Guest/403/CRUD + sync permisos |
| Repos | `RepositorioManagementTest` | Solo públicos en índice, 404 privado, create+membresía, manage, miembros, admin bypass |
| Files | `FileManagementTest` | Upload S3 fake, toggle, delete, download público/privado, 403 no-miembro |
| Home | `HomePageTest` | Solo públicos en home; about renderiza |

### Huecos conocidos (implementado pero poco/no testeado)

- Filtros avanzados de repos y usuarios.
- Update/destroy de repositorio.
- Regla `asesor_externo` en Estadía.
- Límite 1–8 miembros / MIME y tamaños de upload.
- Upload/borrado de imágenes.
- Endpoint `usuarios.search`.

---

## 14. Decisiones / particularidades de diseño

1. **Alta administrativa:** no hay registro público; `/usuarios/create` exige permiso y asigna el rol durante el alta.
2. **Repos privados se ocultan** (404) en el show público.
3. **Admin = superusuario** vía `Gate::before` + acceso implícito en `AuthorizeMember`.
4. **Imágenes vs archivos:** imágenes en JSON del repo; documentos en tabla `files`.
5. **S3 fijo** en controladores de archivos (independiente de `FILESYSTEM_DISK`).
6. **UI por superficies:** el sitio público tiene navegación propia; trabajo y
   gestión conviven en una sola área privada.
7. Stack declarado en `AGENTS.md` (Zustand/Query/RHF/Zod) es **objetivo**; el runtime actual usa Inertia + props + `useState`.
8. Strings de dominio en español hardcodeados; locale Laravel default `en` en `.env.example`.

---

## 15. Flujos de usuario típicos

### Visitante

1. Entra a Home → explora destacados / busca → catálogo filtrado → abre repo público → descarga archivos públicos.

### Alumno / docente

1. Login → crea repositorio (wizard, invita colaboradores) → en Mi cuenta gestiona miembros y sube archivos → publica archivos (`is_public`) y/o marca el repo como público.

### Admin

1. Login → entra al panel → cambia a gestión institucional → administra usuarios y roles → crea usuarios desde `/usuarios/create`.

---

## 16. Estructura backend relevante

```
app/
├── Http/Controllers/     # Home, User, Role, Repositorio, RepositorioUsuario, File, Auth
├── Http/Middleware/      # AuthorizeMember, HandleInertiaRequests
├── Http/Requests/        # Validaciones por dominio
├── Models/               # User, Repositorio, File
└── Support/Catalog.php   # Carreras, niveles, tipos
database/
├── migrations/
├── seeders/              # PermissionsSeeder, DatabaseSeeder
└── factories/
routes/
├── web.php
└── auth.php
tests/Feature/            # Auth, Users, Roles, Repositories, Files, Home
```

---

*Fin del documento. Actualizar este MD cuando cambien reglas de negocio, permisos o módulos.*
