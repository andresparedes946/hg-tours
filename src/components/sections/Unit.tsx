import Image from "next/image";
import SmartVideo from "@/components/SmartVideo";
import { Eyebrow } from "@/components/ui";
import { img, media, unitSpecs } from "@/config/content";

export default function Unit() {
  const specs = unitSpecs.filter((s) => s.value);
  return (
    <section id="nosotros" className="unit" aria-labelledby="unidad-titulo">
      <div className="unit-banner" data-cursor="PLAY">
        <div className="parallax-layer" data-parallax>
          <SmartVideo {...media.bariloche} fit="contain" sizes="100vw" />
        </div>
        <div className="unit-banner-shade" aria-hidden="true" />
        <div className="unit-banner-content">
          <Eyebrow tone="light">La unidad</Eyebrow>
          <h2 id="unidad-titulo" className="display-1">
            <span>Viajá con</span>
            <span>nosotros.</span>
          </h2>
        </div>
      </div>
      <div className="unit-body">
        <figure className="unit-photo" data-reveal data-cursor="VIEW">
          <Image
            src={img.frente.src}
            width={img.frente.w}
            height={img.frente.h}
            alt="Frente de la Mercedes-Benz Sprinter negra de HG Tours"
            sizes="(max-width: 700px) 100vw, 520px"
            style={{ objectPosition: "50% 68%" }}
          />
        </figure>
        <div className="unit-text" data-reveal>
          <p className="lead">Una Mercedes-Benz Sprinter negra. La misma unidad que ves en cada foto de este sitio.</p>
          <dl className="spec-list">
            {specs.map((s) => (
              <div key={s.label} className="spec-row">
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
