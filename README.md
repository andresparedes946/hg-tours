# HG Tours — sitio web

Sitio de una página para HG Tours (traslados, turismo, corporativo y eventos en una Mercedes-Benz Sprinter negra). Reconstruye en Next.js el diseño exportado de Claude Design (`Sitio Sprinter.dc.html`).

**Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript, CSS global (tokens del diseño original), Phosphor Icons. No usa backend ni base de datos: el cotizador arma el mensaje y abre WhatsApp.

## Requisitos

- Node.js 20.9 o superior (probado con Node 24)
- npm

## Scripts

```bash
npm install        # instalar dependencias
npm run dev        # desarrollo en http://localhost:3000
npm run lint       # ESLint
npm run build      # build de producción (incluye chequeo de TypeScript)
npm run start      # servir el build de producción
```

## Dónde editar

| Qué | Archivo |
|---|---|
| Marca, WhatsApp, Instagram, email, testimonios | `src/config/site.ts` |
| Servicios, ficha de la unidad, equipamiento, seguridad, destinos, listas | `src/config/content.ts` |
| Validación y mensaje del cotizador | `src/lib/quote.ts` |
| Estilos y tokens de color | `src/app/globals.css` |
| Título, descripción y Open Graph | `src/app/layout.tsx`, `src/app/opengraph-image.jpg` |

Los datos en `null` o las listas vacías **no se muestran** (no se publican placeholders). Ver [CONTENIDO-PENDIENTE.md](CONTENIDO-PENDIENTE.md).

## Estructura

```
public/
  images/     fotos optimizadas (JPG ≤ 2200 px; Next.js sirve WebP/AVIF)
  videos/     videos H.264 en 1080p y 720p (sin audio)
src/
  app/        layout, página, estilos, icon.svg, opengraph-image, robots, sitemap
  components/ navegación, preloader, video, cursor, efectos, footer, WhatsApp
    sections/ una sección del sitio por archivo
  config/     datos editables (site.ts, content.ts)
  lib/        lógica del cotizador y preferencias de movimiento/datos
```

## Videos

- Los originales venían en HEVC (H.265), que no se reproduce en Firefox ni en muchos Chrome de Windows y Android. Se convirtieron a H.264.
- Se carga 720p en pantallas de hasta 900 px y 1080p en las más grandes.
- El video del hero se carga enseguida. El resto se descarga recién cuando la sección se acerca a la pantalla.
- Solo se reproducen mientras están visibles.
- Con "reducir movimiento" o "ahorro de datos" no se descarga video: se muestra la imagen fija.

Para reemplazar un video, generá las dos versiones (con ffmpeg):

```bash
ffmpeg -i original.mp4 -an -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -vf scale=1920:1080 -movflags +faststart public/videos/NOMBRE-1080.mp4
```

```bash
ffmpeg -i original.mp4 -an -c:v libx264 -preset slow -crf 25 -pix_fmt yuv420p -vf scale=1280:720 -movflags +faststart public/videos/NOMBRE-720.mp4
```

## Variables de entorno

Ver `.env.example`. La única es opcional:

- `NEXT_PUBLIC_SITE_URL`: dominio definitivo. Habilita la URL canónica y el sitemap. Sin ella, en Vercel se usa la URL de producción del proyecto para Open Graph.

## Publicar en GitHub y Vercel

1. Crear un repositorio vacío en GitHub (sin README) y subir el código:
   ```bash
   git remote add origin https://github.com/USUARIO/hg-tours.git
   ```
   ```bash
   git push -u origin main
   ```
2. En [vercel.com/new](https://vercel.com/new), importar el repositorio. Vercel detecta Next.js solo, así que no hace falta cambiar la configuración de build.
3. (Opcional) En **Settings → Environment Variables**, cargar `NEXT_PUBLIC_SITE_URL` cuando esté el dominio definitivo y volver a desplegar.
4. (Opcional) En **Settings → Domains**, conectar el dominio.

Cada `git push` a `main` genera un despliegue de producción, y cada rama o PR, una vista previa.
