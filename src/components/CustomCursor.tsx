"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor acompañante con etiqueta contextual ([data-cursor]).
 * Solo en dispositivos con puntero fino y sin "reducir movimiento".
 * No reemplaza el cursor del sistema: lo acompaña.
 */
export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const rec = new URLSearchParams(location.search).get("grabar");
    if (rec !== null) return recordingMode(c, Number(rec));
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let x = -100, y = -100, cx = x, cy = y, raf = 0, label = "";
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target instanceof Element ? e.target : null;
      let next: string | null = "";
      if (t?.closest("input, textarea, select, label")) next = null;
      else if (t?.closest("a, button")) next = "→";
      else next = t?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor ?? "";
      c.classList.toggle("is-hidden", next === null);
      if (next !== null && next !== label) {
        label = next;
        c.textContent = label;
        c.dataset.size = !label ? "dot" : label.length > 1 ? "lg" : "md";
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const loop = () => {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      c.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.3 ? requestAnimationFrame(loop) : 0;
    };
    const onLeave = () => c.classList.add("is-hidden");
    c.classList.add("is-active");
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      c.classList.remove("is-active");
    };
  }, []);

  return <div ref={ref} className="cursor" data-size="dot" aria-hidden="true" />;
}

const REC_KEY = "hg-cursor-grabar";

/**
 * Modo grabación (?grabar o ?grabar=90 para el diámetro en px): el círculo
 * "VIEW" queda fijo sobre la página, también en celulares, y se mueve
 * arrastrándolo con el dedo o el mouse. Sirve para tapar la patente al
 * filmar la pantalla. Recuerda la última posición en este dispositivo.
 */
function recordingMode(c: HTMLDivElement, size: number) {
  const d = size >= 30 && size <= 400 ? size : 64;
  // Posición en coordenadas de página: acompaña el scroll como el video.
  let px = window.innerWidth / 2;
  let py = window.innerHeight / 2;
  try {
    const saved = JSON.parse(localStorage.getItem(REC_KEY) ?? "null");
    if (typeof saved?.x === "number" && typeof saved?.y === "number") ({ x: px, y: py } = saved);
  } catch {}

  const place = () => {
    c.style.transform = `translate3d(${px - scrollX}px, ${py - scrollY}px, 0) translate(-50%, -50%)`;
  };
  let dx = 0, dy = 0;
  const onDown = (e: PointerEvent) => {
    e.preventDefault();
    c.setPointerCapture(e.pointerId);
    dx = px - (e.clientX + scrollX);
    dy = py - (e.clientY + scrollY);
  };
  const onMove = (e: PointerEvent) => {
    if (!c.hasPointerCapture(e.pointerId)) return;
    px = e.clientX + scrollX + dx;
    py = e.clientY + scrollY + dy;
    place();
  };
  const onUp = () => {
    try {
      localStorage.setItem(REC_KEY, JSON.stringify({ x: px, y: py }));
    } catch {}
  };

  c.textContent = "VIEW";
  c.dataset.size = "lg";
  c.style.width = c.style.height = `${d}px`;
  c.classList.add("is-active", "is-rec");
  place();
  c.addEventListener("pointerdown", onDown);
  c.addEventListener("pointermove", onMove);
  c.addEventListener("pointerup", onUp);
  c.addEventListener("pointercancel", onUp);
  window.addEventListener("scroll", place, { passive: true });
  window.addEventListener("resize", place);
  return () => {
    c.removeEventListener("pointerdown", onDown);
    c.removeEventListener("pointermove", onMove);
    c.removeEventListener("pointerup", onUp);
    c.removeEventListener("pointercancel", onUp);
    window.removeEventListener("scroll", place);
    window.removeEventListener("resize", place);
    c.classList.remove("is-active", "is-rec");
    c.removeAttribute("style");
  };
}
