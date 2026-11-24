# Flujo: asignación de asesores académicos

Recorrido de punta a punta que cruza periodos, repositorios y docentes.
Detalle de reglas: [06-project-periods.md](../business/06-project-periods.md), [07-academic-advisors.md](../business/07-academic-advisors.md).

```mermaid
flowchart LR
  P[Periodo open] --> I[Alumnos inscritos]
  P --> R[Repositorios del periodo]
  R --> E[¿Quiénes son elegibles?]
  E --> C[¿Quién tiene cupo?]
  C --> A[Asignar o repartir]
  A --> L[Asesor primary activo en el repo]
  L --> C2[Opcional: agregar co-asesores]
```

```mermaid
sequenceDiagram
  participant Gestor as Director / Dir. carrera
  participant Periodo
  participant Alumnos
  participant Repos
  participant Docentes

  Gestor->>Periodo: Crear (draft) e inscribir alumnos
  Gestor->>Periodo: Abrir
  Gestor->>Docentes: Ajustar cupos / disponibilidad
  Alumnos->>Repos: Crear proyectos del periodo
  Gestor->>Docentes: Proponer / aplicar reparto o asignar a mano
  Note over Repos,Docentes: Cada assign valida carrera + cupo + elegibilidad
```

Hoy **no** hay un botón del alumno tipo “solicitar asesor y que el sistema asigne uno solo”.
