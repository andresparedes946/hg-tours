import { site } from "@/config/site";

/**
 * Se publica solo cuando hay testimonios reales cargados en `site.testimonials`.
 * No se muestran opiniones de ejemplo.
 */
export default function Testimonials() {
  const items = site.testimonials;
  if (items.length === 0) return null;
  return (
    <section className="section testimonials" aria-labelledby="testimonios-titulo">
      <h2 id="testimonios-titulo" className="display-3 section-title" data-reveal>
        Viajar es confiar.
      </h2>
      <div className="testimonials-grid">
        {items.map((t) => (
          <figure key={t.author + t.quote.slice(0, 16)} className="testimonial" data-reveal>
            <blockquote>“{t.quote}”</blockquote>
            <figcaption>
              {t.author}
              {t.detail && ` · ${t.detail}`}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
