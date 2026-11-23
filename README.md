# Repositorio Institucional de Proyectos Académicos

Sistema web para publicar, consultar y gestionar proyectos académicos: integradoras, estadías y proyectos especiales.

## Stack

| Capa | Tecnología |
|------|------------|
| Backend | Laravel 13, Inertia.js v3, Spatie Permission, Wayfinder |
| Frontend | React 19, Vite, Tailwind CSS v4, shadcn/ui |
| Storage | Disco configurable (`public` local o Amazon S3) |
| Tests | Pest (PHP), Vitest / Playwright (FE, según infra) |

## Documentación

La fuente de verdad del **comportamiento implementado** está en [`docs/`](docs/README.md):

- Reglas y escenarios por módulo → [`docs/business/`](docs/business/)
- Esquema de BD → [`docs/technical/database-schema.md`](docs/technical/database-schema.md)
- Convenciones para editar docs → [`docs/AGENTS.md`](docs/AGENTS.md)

Guía para agentes de código (skills, comandos FE): [`AGENTS.md`](AGENTS.md).

## Desarrollo

```bash
# Backend
composer install
cp .env.example .env   # si aplica
php artisan key:generate
php artisan migrate
php artisan serve

# Frontend
pnpm install
pnpm dev
```

Comandos útiles adicionales: ver [`AGENTS.md`](AGENTS.md).

## Licencia

Proyecto institucional. Consultar al equipo del repositorio para términos de uso interno.
