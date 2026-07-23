# Changelog


## v2.3.0 - Integración Google My Maps

### Añadido
- Integración de Google My Maps para los servicios municipales.
- Soporte para URLs de mapas desde `services.json`.
- Visualización de los mapas:
  - CID
  - PMR
  - Bicicletes.
- Nuevo visor central para servicios.

### Mejorado
- Arquitectura de servicios preparada para añadir nuevos mapas sin modificar JavaScript.
- Mejor experiencia de navegación entre servicios y mapa principal.


## Cambios recientes

### Refactor del sistema de mapas

- Creado un contenedor único `#map-container` para gestionar las vistas de mapas.
- Integrados Leaflet y Google My Maps dentro del mismo sistema de visualización.
- Eliminadas dependencias de posicionamiento fijo para el área del mapa.
- Mejorada la adaptación del mapa en dispositivos móviles.
- Añadido recalculo automático del tamaño de Leaflet mediante `invalidateSize()`.
- Corregidos problemas de altura del mapa en navegadores móviles.