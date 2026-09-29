"use client";

import Image from "next/image";
import { useState } from "react";
import SmartVideo from "@/components/SmartVideo";
import QuoteLink from "@/components/QuoteLink";
import { Eyebrow } from "@/components/ui";
import { destinations } from "@/config/content";

// Proyección simple del mapa: longitud -74..-53, latitud -22..-55.
const px = (lon: number) => ((lon + 74) / 21) * 100;
const py = (lat: number) => ((-22 - lat) / 33) * 100;
const latTicks = [-25, -30, -35, -40, -45, -50, -55];
const coord = (lat: number, lon: number) => `${Math.abs(lat).toFixed(1)}°S · ${Math.abs(lon).toFixed(1)}°O`;

export default function Destinations() {
  const [activeKey, setActiveKey] = useState("bariloche");
  const active = destinations.find((d) => d.key === activeKey) ?? destinations[0];
  const info = [
    { k: "Duración", v: active.info.duration },
    { k: "Salida desde", v: active.info.departure },
    { k: "Modalidad", v: active.info.mode },
  ].filter((i) => i.v);

  return (
    <section id="destinos" className="section destinations" aria-labelledby="destinos-titulo">
      <Eyebrow>Algunos destinos</Eyebrow>
      <h2 id="destinos-titulo" className="display-2 section-title" data-reveal>
        Descubrí Argentina.
      </h2>
      <div className="dest-grid">
        <div className="dest-map-wrap">
          <div className="dest-map" data-cursor="EXPLORE" role="group" aria-label="Mapa de destinos">
            {latTicks.map((l) => (
              <div key={l} className="dest-lat" style={{ top: `${py(l)}%` }} aria-hidden="true">
                <span>{Math.abs(l)}°S</span>
              </div>
            ))}
            {destinations.map((d) => {
              const x = px(d.lon);
              const on = d.key === activeKey;
              return (
                <button
                  key={d.key}
                  type="button"
                  className={`dest-pin${on ? " is-active" : ""}${x > 60 ? " is-flipped" : ""}`}
                  style={{ left: `${x}%`, top: `${py(d.lat)}%` }}
                  aria-pressed={on}
                  onClick={() => setActiveKey(d.key)}
                  onMouseEnter={() => setActiveKey(d.key)}
                >
                  <span className="dest-dot" aria-hidden="true" />
                  <span className="dest-name">{d.name}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="dest-detail">
          <div className="dest-media" data-cursor="VIEW">
            {destinations.map((d) => (
              <div key={d.key} className={`dest-slide${d.key === activeKey ? " is-active" : ""}`} aria-hidden={d.key !== activeKey}>
                {d.video ? (
                  <SmartVideo {...d.video} fit="contain" sizes="(max-width: 900px) 100vw, 55vw" />
                ) : d.image ? (
                  <Image src={d.image.src} alt={d.image.alt} fill sizes="(max-width: 959px) 100vw, 60vw" className="dest-photo" />
                ) : (
                  // Sin foto propia del destino: panel tipográfico (no se usan imágenes genéricas).
                  <div className="dest-fallback">
                    <span className="dest-fallback-coord">{coord(d.lat, d.lon)}</span>
                    <span className="dest-fallback-name">{d.name}</span>
                    <span className="dest-fallback-line" aria-hidden="true" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="dest-info" aria-live="polite">
            <div className="dest-copy">
              <span className="dest-tag">Consultá disponibilidad</span>
              <h3 className="dest-title">{active.name}</h3>
              <p>{active.desc}</p>
            </div>
            <QuoteLink className="btn btn-primary btn-lg" preset={{ destination: active.name, service: "Turismo" }}>
              Consultar viaje →
            </QuoteLink>
          </div>
          {info.length > 0 && (
            <dl className="dest-facts">
              {info.map((i) => (
                <div key={i.k}>
                  <dt>{i.k}</dt>
                  <dd>{i.v}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}
