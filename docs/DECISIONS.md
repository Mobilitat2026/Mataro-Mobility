# Decisions

- Documentació integrada al projecte.
## Decisión

Se adopta Google My Maps como plataforma para visualizar la información geográfica municipal.

Motivos

- Fácil mantenimiento.
- Actualización inmediata desde Google.
- No requiere modificar el código al actualizar la cartografía.
- Arquitectura escalable mediante services.json.

## Decisión: Arquitectura única para el sistema de mapas

### Fecha
Julio 2026

### Contexto

El sistema inicial utilizaba elementos independientes para Leaflet y Google My Maps, provocando diferencias de comportamiento entre dispositivos y problemas de adaptación en móviles.

### Decisión tomada

Se establece un único contenedor `#map-container` como responsable del área cartográfica.

Dentro del contenedor se integran:

- Mapa principal Leaflet.
- Visor alternativo Google My Maps.

### Motivos

- Simplificar la arquitectura frontend.
- Mejorar la experiencia móvil.
- Reducir reglas CSS específicas.
- Facilitar futuras integraciones de servicios cartográficos.

### Resultado

El sistema funciona correctamente en escritorio y dispositivos móviles.