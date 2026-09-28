"use client";

import Image from "next/image";
import { useState } from "react";
import { Eyebrow } from "@/components/ui";
import { equipment, img } from "@/config/content";

export default function Equipment() {
  const [active, setActive] = useState(0);
  return (
    <section className="section equipment" aria-labelledby="equipamiento-titulo">
      <div className="equipment-grid">
        <div className="equipment-text" data-reveal>
          <Eyebrow>Equipamiento</Eyebrow>
          <h2 id="equipamiento-titulo" className="display-3">
            Todo pensado para el viaje.
          </h2>
          <ul className="equipment-list">
            {equipment.map((h, i) => (
              <li key={h.n}>
                <button
                  type="button"
                  className={`equipment-item${active === i ? " is-active" : ""}`}
                  aria-pressed={active === i}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <span className="index">{h.n}</span>
                  <span className="equipment-copy">
                    <span className="equipment-title">{h.title}</span>
                    <span className="equipment-tag">{h.tag}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="equipment-photo" data-reveal data-cursor="VIEW">
          <Image
            src={img.tablero.src}
            alt="Tablero de la Sprinter con pantalla multimedia, salidas de aire y panel de climatización"
            fill
            sizes="(max-width: 800px) 100vw, 45vw"
          />
          {equipment.map((h, i) => (
            <button
              key={h.n}
              type="button"
              className={`hotspot${active === i ? " is-active" : ""}`}
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              aria-label={`${h.n}. ${h.title}`}
              aria-pressed={active === i}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              {h.n}
            </button>
          ))}
          <div className="hotspot-caption" aria-live="polite">
            {equipment[active].title}
          </div>
        </div>
      </div>
    </section>
  );
}
