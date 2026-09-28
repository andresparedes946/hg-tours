import type { ServiceType, TripType } from "@/config/content";

export type QuoteForm = {
  service: ServiceType;
  trip: TripType;
  origin: string;
  destination: string;
  date: string; // AAAA-MM-DD
  time: string; // HH:MM
  pax: string;
  notes: string;
};

export type QuoteField = keyof QuoteForm;
export type QuoteErrors = Partial<Record<QuoteField, string>>;

export const emptyQuote: QuoteForm = {
  service: "Turismo",
  trip: "Ida",
  origin: "",
  destination: "",
  date: "",
  time: "",
  pax: "",
  notes: "",
};

export const MAX_PAX = 99;

/** Fecha local de hoy en formato AAAA-MM-DD (para el mínimo del selector). */
export function todayISO(now = new Date()) {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** `today` en AAAA-MM-DD; si no se conoce (render en servidor) no se valida el pasado. */
export function validateQuote(f: QuoteForm, today?: string): QuoteErrors {
  const e: QuoteErrors = {};
  if (f.origin.trim().length < 2) e.origin = "Indicá desde dónde salís.";
  if (f.destination.trim().length < 2) e.destination = "Indicá a dónde querés ir.";
  if (!f.date) e.date = "Elegí la fecha del viaje.";
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(f.date)) e.date = "La fecha no es válida.";
  else if (today && f.date < today) e.date = "La fecha no puede ser anterior a hoy.";
  if (f.time && !/^\d{2}:\d{2}$/.test(f.time)) e.time = "La hora no es válida.";
  const pax = Number(f.pax);
  if (!f.pax.trim()) e.pax = "Indicá cuántos pasajeros viajan.";
  else if (!Number.isInteger(pax) || pax < 1) e.pax = "Ingresá un número entero mayor a 0.";
  else if (pax > MAX_PAX) e.pax = `Para más de ${MAX_PAX} pasajeros escribinos directo por WhatsApp.`;
  if (f.notes.length > 800) e.notes = "Las observaciones pueden tener hasta 800 caracteres.";
  return e;
}

/** 2026-10-05 → 05/10/2026 */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return y && m && d ? `${d}/${m}/${y}` : iso;
}

export function buildQuoteMessage(f: QuoteForm) {
  const lines = [
    "Hola, quisiera solicitar una cotización.",
    "",
    `• Servicio: ${f.service}`,
    `• Origen: ${f.origin.trim()}`,
    `• Destino: ${f.destination.trim()}`,
    `• Fecha: ${formatDate(f.date)}`,
    f.time ? `• Hora: ${f.time} h` : null,
    `• Pasajeros: ${f.pax.trim()}`,
    `• Viaje: ${f.trip}`,
    f.notes.trim() ? `• Observaciones: ${f.notes.trim()}` : null,
  ];
  return lines.filter((l): l is string => l !== null).join("\n");
}

export function quoteSummary(f: QuoteForm) {
  return [
    f.service,
    `${f.origin.trim()} → ${f.destination.trim()}`,
    formatDate(f.date) + (f.time ? ` · ${f.time} h` : ""),
    `${f.pax.trim()} ${Number(f.pax) === 1 ? "pasajero" : "pasajeros"}`,
    f.trip,
  ].join(" · ");
}
