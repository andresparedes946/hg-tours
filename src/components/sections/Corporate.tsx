import QuoteLink from "@/components/QuoteLink";
import { corporate } from "@/config/content";

export default function Corporate() {
  return (
    <section id="corporativo" className="section corporate" aria-labelledby="corporativo-titulo">
      <div className="corporate-grid">
        <div className="corporate-intro" data-reveal>
          <p className="eyebrow-plain">Empresas</p>
          <h2 id="corporativo-titulo" className="display-3">
            Movilidad para empresas.
          </h2>
          <p className="corporate-lead">
            Tu equipo se mueve.
            <br />
            Nosotros nos encargamos del camino.
          </p>
          <QuoteLink className="btn btn-primary btn-lg btn-light" preset={{ service: "Corporativo" }}>
            Solicitar cotización corporativa →
          </QuoteLink>
        </div>
        <div data-reveal>
          <ul className="corporate-list">
            {corporate.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p className="corporate-note">Servicios posibles — a confirmar según disponibilidad.</p>
        </div>
      </div>
    </section>
  );
}
