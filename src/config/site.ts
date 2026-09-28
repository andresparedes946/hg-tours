/**
 * Datos editables de la empresa.
 *
 * Todo lo que figura acá se muestra en el sitio. Los valores en `null` o las
 * listas vacías NO se publican: la sección o el dato correspondiente se oculta
 * hasta que se complete con información real y aprobada por HG Tours.
 *
 * Ver CONTENIDO-PENDIENTE.md para la lista de datos a confirmar.
 */

export type Testimonial = { quote: string; author: string; detail?: string };

export const site = {
  /** Nombre comercial. PENDIENTE: confirmar nombre definitivo. */
  brand: "HG TOURS",
  /** Nombre para títulos y metadatos. */
  name: "HG Tours",
  description:
    "Traslados, turismo, viajes corporativos y eventos en una Mercedes-Benz Sprinter negra. Cotizá tu próximo viaje por Argentina.",
  country: "Argentina",
  locale: "es_AR",

  /**
   * URL pública definitiva (sin barra final). Se toma de NEXT_PUBLIC_SITE_URL.
   * Mientras no esté definida no se publica canonical ni sitemap.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || null,

  contact: {
    /**
     * WhatsApp en formato internacional, solo dígitos (54 9 + característica + número).
     * PENDIENTE: número tomado del diseño original — confirmar con el cliente antes de publicar.
     */
    whatsapp: "5491123832536",
    /** Mensaje inicial para los botones directos de WhatsApp. */
    whatsappGreeting: "Hola, quisiera consultar por un viaje/traslado.",
    /** PENDIENTE: usuario de Instagram sin @ (ej. "hgtours"). null = sección oculta. */
    instagram: null as string | null,
    /** PENDIENTE: email de contacto. null = no se muestra. */
    email: null as string | null,
  },

  /** PENDIENTE: testimonios reales y autorizados. Lista vacía = sección oculta. */
  testimonials: [] as Testimonial[],
};

export const whatsappUrl = (message: string = site.contact.whatsappGreeting) =>
  `https://wa.me/${site.contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

export const instagramUrl = () =>
  site.contact.instagram ? `https://www.instagram.com/${site.contact.instagram}/` : null;
