# Archivos e imágenes

> Prefijo de IDs: `FILE` · Estado: vigente

## Resumen

Documentos del repositorio (tabla `files` + disco) e imágenes de portada/galería (JSON `repositories.images`).
No cubre metadatos del repositorio ni visibilidad del proyecto: ver [05-repositories.md](05-repositories.md).

## Actores

| Actor | Qué hace aquí |
|-------|---------------|
| Miembro / admin | Sube, edita, borra documentos e imágenes |
| Visitante | Solo ve/descarga archivos con `is_public = true` en repos públicos |

## Reglas de negocio

| ID | Regla |
|----|-------|
| FILE-R1 | Subir/editar/borrar documentos e imágenes exige miembro del repo (o admin) + permisos `files.*`. |
| FILE-R2 | Archivos nuevos suelen nacer privados; el miembro puede marcar `is_public`. |
| FILE-R3 | En show público solo se listan archivos con `is_public = true`. |
| FILE-R4 | Descarga de archivo privado: admin o miembro. |
| FILE-R5 | `document_path` de cartas/aceptación de asesores empresariales se trata como privado (URL firmada temporal cuando se exponga). |
| FILE-R6 | Imágenes viven en JSON `repositories.images` (paths); eliminar por índice actualiza ese JSON. |

## Escenarios

| ID | Actor | Situación | Resultado esperado | Regla |
|----|-------|-----------|--------------------|-------|
| FILE-01 | Visitante | Intenta descargar un `files` del repo con `is_public = false` | Descarga denegada (403 / no autorizado) | FILE-R4 |
| FILE-02 | Visitante | Abre show de repo público con 2 docs públicos, 1 privado y cover en `images` | Lista solo los 2 docs públicos; cover accesible por URL pública; el privado no aparece | FILE-R3 |
| FILE-03 | Miembro del repo | Sube un documento nuevo | Fila en `files` creada, normalmente con `is_public = false`, almacenada en el disco configurado | FILE-R2 |
| FILE-04 | Miembro | Marca ese documento como `is_public = true` | El archivo pasa a listarse también en el show público | FILE-R2 |
| FILE-05 | Miembro | Elimina la imagen en el índice 1 de `repositories.images` (había 3 paths) | El JSON `images` queda con 2 paths; no hay tabla hija que borrar | FILE-R6 |
| FILE-06 | Usuario autenticado no miembro (ni admin) | Intenta subir o borrar un archivo del repo | **403** / denegado | FILE-R1 |

## Referencias

- Código: controladores/servicios de files; panel de repositorio
- Tablas: `files`; columna `repositories.images` ([database-schema](../technical/database-schema.md))
- Permisos: `files.*`
- Relacionados: [05-repositories.md](05-repositories.md)
