# Contenido pendiente de confirmar con HG Tours

Mientras un dato está en `null` (o una lista vacía), el sitio **no lo muestra**:
no se publican placeholders, textos de ejemplo ni enlaces vacíos.

## Datos de contacto — `src/config/site.ts`

| Dato | Estado | Efecto mientras falta |
|---|---|---|
| Nombre comercial definitivo | Provisorio: `HG TOURS` | Se usa el provisorio |
| WhatsApp | Provisorio: `5491123832536` (tomado del diseño) | **Confirmar antes de publicar**: todas las consultas llegan a este número |
| Instagram (usuario) | Falta | Se ocultan la sección Instagram y el enlace del footer |
| Email | Falta | No se muestra en el footer |
| Dominio definitivo | Falta (`NEXT_PUBLIC_SITE_URL`) | Sin canonical ni sitemap |

## Contenido — `src/config/content.ts` y `src/config/site.ts`

- **La unidad:** cantidad de pasajeros, capacidad de equipaje, año / modelo.
- **Seguridad:** mantenimiento del vehículo, experiencia y formación de los conductores, habilitaciones y seguros. La lista se oculta hasta tener al menos un dato.
- **Testimonios:** opiniones reales y autorizadas (`site.testimonials`). La sección se oculta si no hay.
- **Destinos:** duración, lugar de salida y modalidad de cada uno (`destinations[].info`). Confirmar además qué destinos se ofrecen realmente.
- **Servicios corporativos y eventos:** confirmar la lista (hoy aclara "a confirmar según disponibilidad").
- **Equipamiento:** solo figura lo visible en la foto del tablero (pantalla multimedia Bluetooth/USB, salidas de aire, climatización). Agregar otros ítems solo si están verificados.

## Recursos visuales faltantes

- Fotos o videos propios de 7 destinos (Salta, Iguazú, Córdoba, Mendoza, Buenos Aires, Costa Atlántica y Patagonia). Hoy muestran un panel tipográfico con el nombre y las coordenadas. Solo Bariloche tiene video.
- Logo o isotipo de la marca (favicon y marca). Hoy se usa la línea dorada del diseño.
- Opcional: una versión horizontal del video de Bariloche para escritorio (la actual es vertical 9:16 y se muestra completa con fondo difuminado).

## Notas sobre los recursos

- En el video de Bariloche (generado con Higgsfield) la camioneta se ve de un tono más claro que la unidad real negra. Conviene revisarlo.
- Las fotos originales con caras de frente no se usaron.
- `interior-luz.jpg` (usada en Servicios, Confort e Instagram, igual que en el diseño) muestra pasajeros y conductor de espaldas o de perfil. Confirmar que están de acuerdo con aparecer, o reemplazarla.
