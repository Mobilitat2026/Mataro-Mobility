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

### Pendiente
- Refactor del visor para reutilizar el contenedor principal del mapa.
- Optimización responsive.