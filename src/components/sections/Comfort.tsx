import Image from "next/image";
import { img } from "@/config/content";

const shots = [
  { ...img.interiorLuz, label: "Experiencia", text: "desde el primer kilómetro.", alt: "Interior de la Sprinter iluminado por luz natural", ratio: "4 / 5", pos: "50% 50%" },
  { ...img.interiorPasillo, label: "Confort", text: "para disfrutar el camino.", alt: "Pasillo central y butacas de la Sprinter", ratio: "4 / 5", pos: "50% 55%" },
  { ...img.interiorTrasero, label: "Espacio", text: "para viajar cómodamente.", alt: "Butacas traseras de la Sprinter", ratio: "5 / 4", pos: "50% 60%" },
];

function Shot({ s, sizes }: { s: (typeof shots)[number]; sizes: string }) {
  return (
    <figure className="comfort-shot" data-reveal data-cursor="VIEW">
      <div className="comfort-frame" style={{ aspectRatio: s.ratio }}>
        <Image src={s.src} alt={s.alt} fill sizes={sizes} style={{ objectPosition: s.pos }} />
      </div>
      <figcaption>
        <span className="comfort-label">{s.label}</span>
        <span>{s.text}</span>
      </figcaption>
    </figure>
  );
}

export default function Comfort() {
  return (
    <section className="section comfort" aria-labelledby="confort-titulo">
      <h2 id="confort-titulo" className="display-3 comfort-title" data-reveal>
        El viaje también es parte del destino.
      </h2>
      <div className="comfort-grid">
        <div className="comfort-main">
          <Shot s={shots[0]} sizes="(max-width: 800px) 100vw, 55vw" />
        </div>
        <div className="comfort-side">
          <Shot s={shots[1]} sizes="(max-width: 800px) 100vw, 40vw" />
          <Shot s={shots[2]} sizes="(max-width: 800px) 100vw, 40vw" />
        </div>
      </div>
      <p className="manifesto" data-reveal>
        <span>Subí.</span>
        <span>Disfrutá.</span>
        <span>Descubrí.</span>
      </p>
    </section>
  );
}
