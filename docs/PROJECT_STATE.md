# PROJECT_STATE.md

# Estado del proyecto - Mataró Mobility

Fecha: 16/07/2026

## Funcionalidades implementadas

### Mapa
- Mapa Leaflet operativo.
- Marcadores personalizados mediante emojis.
- Marcador temporal durante la creación de incidencias.
- Selección de ubicación haciendo clic sobre el mapa.
- Aviso visual "Selecciona la ubicación de la incidencia".

### Incidencias
- Alta de incidencias.
- Eliminación de incidencias.
- Persistencia mediante LocalStorage.
- Carga inicial desde incidencias.json.

### Popup de incidencias
- Título.
- Descripción.
- Fecha de creación.
- Estado.
- Botón Eliminar.
- Botón "Marcar como resuelta".

### Estado de incidencias
- Nuevo campo `estado`.
- Nuevo campo `fecha`.
- Función `marcarComoResuelta()` implementada.
- Estilos CSS para:
  - `.estado.pendiente`
  - `.estado.resuelta`

## Trabajo en curso

Se ha iniciado la refactorización del popup.

Existe una función:

```js
crearContenidoPopup(incidencia, emoji)
```

que genera el HTML del popup.

Actualmente se está implementando:

- actualización dinámica del popup al cambiar una incidencia a "resuelta";
- ocultar el botón "Marcar como resuelta" cuando la incidencia ya está resuelta;
- mostrar el mensaje "✔ Incidencia resuelta".

Esta parte todavía está en desarrollo y debe revisarse antes de continuar.

## Próximos pasos

1. Finalizar la actualización dinámica del popup.
2. Ocultar el botón cuando la incidencia esté resuelta.
3. Añadir botón para volver a pendiente (opcional).
4. Mejorar diseño del popup.
5. Crear panel lateral de incidencias.
6. Añadir filtros por tipo y estado.
7. Centrar el mapa al seleccionar una incidencia desde el listado.

## Estado general

Proyecto estable.

Todas las funcionalidades principales siguen operativas.

Solo queda finalizar la nueva versión del popup antes de continuar con mejoras de interfaz.

