"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { needs } from "@/config/content";
import { Eyebrow } from "@/components/ui";
import { useQuote } from "@/components/QuoteProvider";

export default function Services() {
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const { preset } = useQuote();

  // En pantallas táctiles no hay hover: la foto rota sola mientras se ve la sección.
  useEffect(() => {
    const touch = window.matchMedia("(hover: none)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = panelRef.current;
    if (!touch || reduced || !el) return;
    let timer = 0;
    const io = new IntersectionObserver(([entry]) => {
      window.clearInterval(timer);
      if (entry.isIntersecting) timer = window.setInterval(() => setActive((a) => (a + 1) % needs.length), 3500);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  return (
    <section id="servicios" className="section services" aria-labelledby="servicios-titulo">
      <Eyebrow>Servicios</Eyebrow>
      <h2 id="servicios-titulo" className="display-2 section-title" data-reveal>
        ¿Qué necesitás?
      </h2>
      <div className="services-grid">
        <ul className="services-list">
          {needs.map((n, i) => (
            <li key={n.n}>
              <a
                href="#cotizar"
                className={`service-item${active === i ? " is-active" : ""}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => preset({ service: n.service })}
              >
                <span className="service-head">
                  <span className="index">{n.n}</span>
                  <span className="service-title">{n.title}</span>
                  <span className="service-cta" aria-hidden="true">
                    Cotizar →
                  </span>
                </span>
                <span className="service-desc">{n.desc}</span>
              </a>
            </li>
          ))}
        </ul>
        <div ref={panelRef} className="services-panel" data-cursor="VIEW" aria-hidden="true">
          {needs.map((n, i) => (
            <Image
              key={n.n}
              src={n.image}
              alt=""
              fill
              sizes="(max-width: 959px) 100vw, 45vw"
              className={`services-img${active === i ? " is-active" : ""}`}
              style={{ objectPosition: n.pos }}
            />
          ))}
          <div className="services-caption">{needs[active].caption}</div>
        </div>
      </div>
    </section>
  );
}
