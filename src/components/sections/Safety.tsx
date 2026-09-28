import Image from "next/image";
import { Eyebrow } from "@/components/ui";
import { img, trust } from "@/config/content";

export default function Safety() {
  // Solo se publican los compromisos con información confirmada.
  const items = trust.filter((t) => t.body);
  return (
    <section className="section safety" aria-labelledby="seguridad-titulo">
      <Eyebrow>Seguridad</Eyebrow>
      <h2 id="seguridad-titulo" className="display-2 section-title" data-reveal>
        Viajá tranquilo.
      </h2>
      <div className="safety-grid">
        <figure className="safety-photo safety-photo--wide" data-reveal data-cursor="VIEW">
          <Image src={img.interiorAncho.src} alt="Interior de la Sprinter con martillo de emergencia a la vista" fill sizes="(max-width: 800px) 100vw, 62vw" />
          <figcaption className="pin pin--right" style={{ left: "89.5%", top: "64%" }}>
            <span className="pin-dot" aria-hidden="true" />
            <span className="pin-label">Martillo de emergencia</span>
          </figcaption>
        </figure>
        <figure className="safety-photo safety-photo--tall" data-reveal data-cursor="VIEW">
          <Image src={img.techo.src} alt="Salida de emergencia en el techo de la Sprinter" fill sizes="(max-width: 800px) 100vw, 32vw" style={{ objectPosition: "50% 35%" }} />
          <figcaption className="pin-label pin-label--bottom">Salida de emergencia en techo</figcaption>
        </figure>
      </div>
      {items.length > 0 && (
        <ul className="trust-list">
          {items.map((t) => (
            <li key={t.n} className="trust-row" data-reveal>
              <span className="index">{t.n}</span>
              <span className="trust-title">{t.title}</span>
              <span className="trust-body">{t.body}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
