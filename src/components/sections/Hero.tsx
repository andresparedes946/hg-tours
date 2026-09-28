import SmartVideo from "@/components/SmartVideo";
import { media } from "@/config/content";

export default function Hero() {
  return (
    <section id="inicio" className="hero" data-cursor="VIEW" aria-label="Inicio">
      <SmartVideo
        {...media.hero}
        fit="contain"
        eager
        blurVideo
        sizes="100vw"
        className="hero-media"
      />
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-content">
        <p className="hero-kicker">Traslados · Turismo · Corporativo · Eventos</p>
        <h1 className="hero-title">
          <span>¿A dónde</span>
          <span>vamos?</span>
        </h1>
        <p className="hero-sub">Tu próximo destino empieza acá.</p>
        <div className="hero-ctas">
          <a href="#cotizar" className="btn btn-primary btn-lg btn-glass">
            Cotizar viaje →
          </a>
          <a href="#destinos" className="btn btn-ghost btn-lg">
            Explorar destinos ↓
          </a>
        </div>
      </div>
      <a href="#servicios" className="scroll-cue" aria-label="Bajar a Servicios">
        <span className="scroll-cue-label" aria-hidden="true">Scroll</span>
        <span className="scroll-cue-track" aria-hidden="true">
          <span className="scroll-cue-bar" />
        </span>
      </a>
    </section>
  );
}
