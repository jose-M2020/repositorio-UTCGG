# Glosario

Términos usados en **dos o más** módulos. Términos de un solo módulo van en su sección "Conceptos clave".

| Término | Significado |
|---------|-------------|
| **Repositorio** | Proyecto académico registrado en el sistema (`repositories`). |
| **Miembro** | Usuario en la pivot `repository_user` con acceso de gestión al repo. |
| **Catálogo institucional** | Carreras, tipos de proyecto y niveles educativos activos. |
| **Periodo / temporada** | Ventana (`project_periods`) por tipo de proyecto: `draft` → `open` → `closed`. |
| **Inscrito** | Alumno en `project_period_participants` de un periodo. |
| **Asesor académico** | Docente (`users` + `teacher_profiles`) asignado vía `repository_advisors`. |
| **Asesor empresarial** | Persona externa (no usuario) en catálogo `business_advisors`. |
| **Afiliación** | Vínculo persona↔empresa en el tiempo (`business_advisor_affiliations`), con contacto. |
| **Asignación BA** | Fila en `repository_business_advisors`: vínculo al repo + **snapshot**. |
| **Snapshot** | JSON inmutable de cómo se capturó el asesor/empresa en ese proyecto. |
| **Capacidad** | Tope de proyectos que un asesor académico puede llevar en un periodo. |
| **Carga (load)** | Conteo de asignaciones académicas activas (`released_at` null) del asesor en el periodo. |
| **Override** | Asignar fuera de elegibilidad/capacidad con permiso + motivo. |
| **Career-scoped** | Actor limitado a carreras de sus `career_assignments` activas como director. |
| **pending_review** | Registro de catálogo creado por usuario; aún no validado. |
| **verified** | Registro de catálogo usable en búsqueda global. |
| **merged** | Registro absorbido por otro; no se usa para nuevas búsquedas. |
| **Confirmación BA** | El asesor externo confirma/rechaza por enlace firmado (o el académico confirma en papel). |
