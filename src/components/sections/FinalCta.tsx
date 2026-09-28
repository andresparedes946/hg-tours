import SmartVideo from "@/components/SmartVideo";
import { media } from "@/config/content";

export default function FinalCta() {
  return (
    <section className="final-cta" data-cursor="PLAY" aria-labelledby="cta-titulo">
      <SmartVideo {...media.bariloche} fit="contain" sizes="100vw" />
      <div className="final-cta-shade" aria-hidden="true" />
      <div className="final-cta-content">
        <h2 id="cta-titulo" className="hero-title">
          <span>¿A dónde</span>
          <span>vamos?</span>
        </h2>
        <p className="hero-sub">Contanos tu próximo destino.</p>
        <a href="#cotizar" className="btn btn-primary btn-lg btn-glass">
          Cotizar viaje →
        </a>
      </div>
    </section>
  );
}
