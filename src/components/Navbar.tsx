"use client";

import { useEffect, useRef, useState } from "react";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import { navLinks } from "@/config/content";

export default function Navbar({ brand }: { brand: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menú móvil: bloquea el scroll, cierra con Escape o al pasar a desktop.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.classList.add("menu-open");
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const button = buttonRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 960px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      root.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      button?.focus({ preventScroll: true });
    };
  }, [open]);

  const close = () => setOpen(false);
  const menuLinks = [...navLinks, { label: "Cotizar", href: "#cotizar" }];

  return (
    <>
      <nav className={`nav${scrolled || open ? " is-solid" : ""}`} aria-label="Principal">
        <a href="#inicio" className="brand" onClick={close}>
          <span className="brand-line" aria-hidden="true" />
          {brand}
        </a>
        <div className="nav-links">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
        <a href="#cotizar" className="btn btn-primary nav-cta" onClick={close}>
          Cotizar
        </a>
        <button
          ref={buttonRef}
          type="button"
          className="btn btn-ghost btn-icon nav-toggle"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <List size={22} />}
        </button>
      </nav>
      <div id="menu-movil" ref={menuRef} className={`mobile-menu${open ? " is-open" : ""}`} hidden={!open}>
        {menuLinks.map((l) => (
          <a key={l.href} href={l.href} onClick={close}>
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}
