# Contenido pendiente de confirmar con HG Tours

Mientras un dato está en `null` (o una lista vacía), el sitio **no lo muestra**:
no se publican placeholders, textos de ejemplo ni enlaces vacíos.

## Datos de contacto — `src/config/site.ts`

| Dato | Estado | Efecto mientras falta |
|---|---|---|
| Nombre comercial definitivo | Provisorio: `HG TOURS` | Se usa el provisorio |
| WhatsApp | Confirmado: `5491123832536` | — |
| Instagram (usuario) | Falta | Se ocultan la sección Instagram y el enlace del footer |
| Email | Falta | No se muestra en el footer |
| Dominio definitivo | Falta (`NEXT_PUBLIC_SITE_URL`) | Sin canonical ni sitemap |

## Contenido — `src/config/content.ts` y `src/config/site.ts`

- **La unidad:** capacidad de equipaje. (Ya cargados: 19 pasajeros, año 2026.)
- **Seguridad:** mantenimiento del vehículo, experiencia y formación de los conductores, habilitaciones y seguros. La lista se oculta hasta tener al menos un dato.
- **Testimonios:** opiniones reales y autorizadas (`site.testimonials`). La sección se oculta si no hay.
- **Destinos:** duración, lugar de salida y modalidad de cada uno (`destinations[].info`). Confirmar además qué destinos se ofrecen realmente.
- **Servicios corporativos y eventos:** confirmar la lista (hoy aclara "a confirmar según disponibilidad").
- **Equipamiento:** solo figura lo visible en la foto del tablero (pantalla multimedia Bluetooth/USB, salidas de aire, climatización). Agregar otros ítems solo si están verificados.

## Recursos visuales faltantes

- Foto de Buenos Aires: es el único destino sin imagen. Hoy muestra un panel tipográfico con el nombre y las coordenadas. El resto ya tiene foto (`public/images/destinos/`).
- La foto de Mendoza tiene un cartel que dice "Bodega Uco Valley". Si no es una bodega real con la que trabajan, conviene reemplazarla para no sugerir un acuerdo.
- Logo o isotipo de la marca (favicon y marca). Hoy se usa la línea dorada del diseño.
- Opcional: una versión horizontal del video de Bariloche para escritorio (la actual es vertical 9:16 y se muestra completa con fondo difuminado).

## Notas sobre los recursos

- En el video de la Sprinter en ruta de montaña (generado con Higgsfield; se usa en "La unidad" y en el CTA final) la camioneta se ve de un tono más claro que la unidad real negra. Conviene revisarlo.
- Las fotos originales con caras de frente no se usaron.
- `interior-luz.jpg` (usada en Servicios, Confort e Instagram, igual que en el diseño) muestra pasajeros y conductor de espaldas o de perfil. Confirmar que están de acuerdo con aparecer, o reemplazarla.
