# Instrucciones para IA: organización de la documentación

Aplican a cualquier IA que cree, mueva, divida o edite archivos dentro de `docs/`.
Este archivo define **estructura y estilo**. No describe el contenido del sistema.

## Principios

1. **El código manda.** Si el código y el doc divergen, el doc se corrige para coincidir con el código. Nunca al revés.
2. **Un archivo, una pregunta.** Cada archivo responde un solo tipo de pregunta (ver "Dónde va cada cosa").
3. **Una sola fuente por dato.** Si algo ya está documentado en otro archivo, se enlaza; no se copia ni se resume de nuevo.
4. **Documentar lo que es, no lo que será.** Limitaciones, deuda y funciones ausentes van en `99-known-gaps.md`, no en el módulo.
5. **Lo verificable gana a lo narrativo.** Reglas y escenarios concretos, no explicaciones generales.

## Estructura de carpetas

```text
docs/
├── README.md              índice: "necesito X → ve a Y"
├── AGENTS.md              este archivo
├── _templates/            plantillas (no son documentación del sistema)
├── business/              qué hace el sistema: un archivo por módulo
├── flows/                 recorridos de punta a punta que cruzan varios módulos
├── technical/             arquitectura, esquema de BD, convenciones
└── decisions/             ADRs: por qué se eligió X (opcional)
```

## Dónde va cada cosa

| Contenido | Archivo |
|-----------|---------|
| Qué es el sistema, actores, principios | `business/00-overview.md` |
| Términos usados en varios módulos | `business/01-glossary.md` |
| Roles, permisos, capas de autorización | `business/02-roles-and-permissions.md` |
| Reglas y escenarios de una entidad o módulo | `business/NN-<modulo>.md` (usar plantilla) |
| Historia que atraviesa varios módulos | `flows/<nombre>.md` |
| Tablas, FKs, enums | `technical/database-schema.md` |
| Limitaciones, deuda, "hoy no existe X" | `business/99-known-gaps.md` |
| Decisión de diseño con alternativas descartadas | `decisions/NNNN-<titulo>.md` |

Un término propio de un solo módulo va en su sección "Conceptos clave". Si aparece en dos o más módulos, pasa al glosario.

## Cuándo crear, dividir o unir archivos

**Crear un módulo nuevo** solo si cumple al menos dos:
- Tiene ciclo de vida propio (estados, alta, cierre).
- Tiene reglas que no dependen de otro módulo.
- Alguien lo consultaría por separado.

**Dividir** un archivo cuando mezcla dos entidades con ciclo de vida o reglas distintas. El contenedor se documenta antes que lo contenido (ej. periodo antes que asesor).

**Unir** dos archivos si siempre se leen juntos y ninguno tiene reglas propias.

Los flujos de punta a punta van en `flows/`, nunca dentro de un módulo.

## Convenciones

**Archivos**
- Nombre en inglés, minúsculas, con guiones: `academic-advisors.md`.
- Módulos de `business/` con prefijo numérico de orden de lectura: `NN-nombre.md`. `99` queda reservado para known-gaps.
- Todo módulo nuevo parte de `_templates/module.md`.

**Idioma**
- Texto explicativo en español.
- Identificadores (tablas, columnas, permisos, roles, estados, rutas) en inglés, entre backticks, tal como están en el código.

**IDs**
- Cada módulo tiene un prefijo único de 3-4 letras (`ADV`, `PER`, `AUTH`).
- Reglas: `<PREFIJO>-R1`, `R2`… Escenarios: `<PREFIJO>-01`, `02`…
- Un ID nunca se reutiliza ni se renumera. Si se elimina, queda el hueco.
- Cada escenario referencia la regla que lo origina.

**Escenarios**
- Columnas fijas: `ID | Actor | Situación | Resultado esperado | Regla`.
- Un único resultado por escenario. Prohibido "X / Y" o "depende".
- **Situación:** precondiciones concretas (estado previo, datos, permisos). Debe bastar para reproducir el caso.
- **Resultado esperado:** efecto observable único (código HTTP, estado resultante, fila creada/no, campo actualizado). No usar solo "OK" o "Error".

**Diagramas**
- Mermaid. Elegir el tipo por lo que muestra: `stateDiagram` para estados, `flowchart` para decisiones, `sequenceDiagram` para varios actores.
- Un diagrama no se narra: no repetir en prosa lo que ya dice.
- Una sola línea en blanco antes y después.

**Enlaces**
- Relativos y verificados contra la estructura real.
- Al mover o renombrar un archivo, actualizar todos los enlaces entrantes y el `README.md` en el mismo cambio.

## Estilo: cero ruido, cero pérdida

**Eliminar:**
- Frases que repiten lo que dice una tabla o diagrama cercano.
- Introducciones del tipo "En esta sección se explica…".
- Contenido duplicado entre archivos (dejar uno y enlazar).
- Adjetivos y énfasis sin información ("muy importante", "básicamente").
- Ejemplos que ilustran lo mismo que otro ya presente.
- Secciones vacías o con "N/A".

**Conservar siempre:**
- Condiciones y umbrales exactos (cupos, límites, estados, valores por defecto).
- Excepciones y overrides con su requisito (permiso, motivo).
- Efectos secundarios (qué se libera, qué queda como historial).
- El "por qué" cuando la regla no es obvia (una línea).
- Todo ID existente y todo escenario existente.

**Prueba antes de borrar:** si quitar la frase no cambia lo que un lector puede hacer o decidir, es ruido. Si cambia, se queda.

**Longitud:** prosa en párrafos de máximo 3 líneas. Preferir tabla o lista cuando hay 3+ elementos comparables.

## Al aplicar cambios

**Antes de editar**
1. Leer `README.md` y los archivos que se van a tocar.
2. Identificar si el cambio es de contenido (reglas/escenarios) o estructural (mover/dividir/unir).
3. Para cambios de contenido, verificar contra el código; no inferir.

**Cambios estructurales (mover, dividir, unir, renombrar)**
- Conservar todo el contenido útil: reubicar, no resumir.
- Mantener los IDs existentes. Al dividir, cada regla conserva su ID en el archivo donde queda.
- Actualizar `README.md` y todos los enlaces.
- No mezclar un cambio estructural con cambios de contenido en el mismo paso, salvo que se pida.

**Al terminar, entregar un resumen breve con:**
- Archivos creados, movidos, eliminados.
- Contenido que cambió de lugar (de dónde a dónde).
- Cualquier dato que no se pudo verificar contra el código.

## Prohibido

- Inventar reglas, permisos o comportamientos no confirmados en el código.
- Cambiar significado de una regla al reescribirla para reducir ruido.
- Dejar enlaces rotos o referencias a archivos que ya no existen.
- Mezclar estado actual con "pendiente/futuro" en un módulo.
- Crear archivos fuera de la estructura definida sin proponerlo primero.
- Copiar tablas o reglas de un archivo a otro en lugar de enlazar.

## Checklist de entrega

- [ ] El archivo sigue `_templates/module.md` (sin secciones vacías).
- [ ] Prefijo de IDs único y sin colisiones.
- [ ] Cada escenario tiene un único resultado y referencia una regla.
- [ ] Nada duplicado de otro archivo; se enlaza.
- [ ] Limitaciones movidas a `99-known-gaps.md`.
- [ ] `README.md` y enlaces actualizados.
- [ ] No se perdió ninguna regla, umbral ni excepción respecto a la versión anterior.
