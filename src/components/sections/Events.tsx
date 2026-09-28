import Image from "next/image";
import QuoteLink from "@/components/QuoteLink";
import { events, img } from "@/config/content";

export default function Events() {
  return (
    <section id="eventos" className="section events" aria-labelledby="eventos-titulo">
      <div className="events-grid">
        <div className="events-text">
          <h2 id="eventos-titulo" className="display-2" data-reveal>
            <span>Tu evento.</span>
            <span className="muted">Nuestro camino.</span>
          </h2>
          <ul className="events-list">
            {events.map((e) => (
              <li key={e}>
                <QuoteLink className="events-item" preset={{ service: "Evento", notes: `Evento: ${e}` }}>
                  {e}
                  <span aria-hidden="true">→</span>
                </QuoteLink>
              </li>
            ))}
          </ul>
          <QuoteLink className="btn btn-primary btn-lg" preset={{ service: "Evento" }}>
            Consultar disponibilidad →
          </QuoteLink>
        </div>
        <figure className="events-photo" data-reveal data-cursor="VIEW">
          <Image src={img.frente.src} alt="Mercedes-Benz Sprinter negra estacionada, lista para un evento" fill sizes="(max-width: 800px) 100vw, 42vw" style={{ objectPosition: "30% 60%" }} />
        </figure>
      </div>
    </section>
  );
}
