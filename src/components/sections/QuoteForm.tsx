"use client";

import { useId, useRef, useState, useSyncExternalStore } from "react";
import { CheckCircle, WarningCircle, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { Eyebrow } from "@/components/ui";
import { useQuote } from "@/components/QuoteProvider";
import { serviceTypes, tripTypes } from "@/config/content";
import { whatsappUrl } from "@/config/site";
import { buildQuoteMessage, MAX_PAX, quoteSummary, todayISO, validateQuote, type QuoteErrors, type QuoteField } from "@/lib/quote";

type Status = "form" | "ready" | "opened";
const FIELD_ORDER: QuoteField[] = ["origin", "destination", "date", "time", "pax", "notes"];
const noopSubscribe = () => () => {};

/** Fecha de hoy según el reloj del visitante (en el servidor no se conoce su zona horaria). */
const useToday = () => useSyncExternalStore(noopSubscribe, todayISO, () => undefined);

export default function QuoteForm() {
  const { form, update, reset, presetKey } = useQuote();
  const [status, setStatus] = useState<Status>("form");
  const [touched, setTouched] = useState<Partial<Record<QuoteField, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [seenPreset, setSeenPreset] = useState(presetKey);
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;

  // Si otra sección precarga datos, volvemos al formulario para que se vean.
  if (seenPreset !== presetKey) {
    setSeenPreset(presetKey);
    setStatus("form");
  }

  const today = useToday();
  const errors: QuoteErrors = validateQuote(form, today);
  const showError = (f: QuoteField) => (submitted || touched[f]) && errors[f];
  const errorCount = Object.keys(errors).length;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (errorCount > 0) {
      const first = FIELD_ORDER.find((f) => errors[f]);
      if (first) formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(id(first))}`)?.focus();
      return;
    }
    setStatus("ready");
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const startOver = () => {
    reset();
    setTouched({});
    setSubmitted(false);
    setStatus("form");
  };

  const field = (name: Exclude<QuoteField, "service" | "trip">, label: string, input: React.ReactNode, optional = false) => (
    <div className={`field${showError(name) ? " has-error" : ""}`}>
      <label htmlFor={id(name)} className="field-label">
        {label}
        {optional && <span className="field-optional"> (opcional)</span>}
      </label>
      {input}
      {showError(name) && (
        <p id={id(`${name}-error`)} className="field-error">
          {errors[name]}
        </p>
      )}
    </div>
  );

  const inputProps = (name: Exclude<QuoteField, "service" | "trip">) => ({
    id: id(name),
    name,
    value: form[name],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => update({ [name]: e.target.value }),
    onBlur: () => setTouched((t) => ({ ...t, [name]: true })),
    "aria-invalid": showError(name) ? true : undefined,
    "aria-describedby": showError(name) ? id(`${name}-error`) : undefined,
    className: "input",
  });

  const message = buildQuoteMessage(form);

  return (
    <section id="cotizar" className="section quote" aria-labelledby="cotizar-titulo">
      <div className="quote-inner">
        <Eyebrow>Cotizador</Eyebrow>
        <h2 id="cotizar-titulo" className="display-2 section-title">
          ¿A dónde querés ir?
        </h2>

        {status === "form" && (
          <form ref={formRef} className="quote-form" onSubmit={onSubmit} noValidate>
            <fieldset className="choice-group">
              <legend className="field-label">Tipo de servicio</legend>
              <div className="choice-row">
                {serviceTypes.map((s) => (
                  <label key={s} className="pill">
                    <input type="radio" name="service" value={s} checked={form.service === s} onChange={() => update({ service: s })} />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="quote-fields">
              {field("origin", "Origen", <input {...inputProps("origin")} placeholder="Ciudad o dirección" autoComplete="off" required />)}
              {field("destination", "Destino", <input {...inputProps("destination")} placeholder="¿A dónde vamos?" autoComplete="off" required />)}
              {field("date", "Fecha", <input {...inputProps("date")} type="date" min={today} required />)}
              {field("time", "Hora", <input {...inputProps("time")} type="time" />, true)}
              {field("pax", "Pasajeros", <input {...inputProps("pax")} type="number" inputMode="numeric" min={1} max={MAX_PAX} step={1} placeholder="Cantidad" required />)}
              <fieldset className="choice-group">
                <legend className="field-label">Tipo de viaje</legend>
                <div className="choice-row choice-row--split">
                  {tripTypes.map((t) => (
                    <label key={t} className="pill pill--block">
                      <input type="radio" name="trip" value={t} checked={form.trip === t} onChange={() => update({ trip: t })} />
                      <span>{t}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            {field("notes", "Observaciones", <textarea {...inputProps("notes")} rows={3} maxLength={800} placeholder="Equipaje, paradas, horarios especiales…" />, true)}

            {submitted && errorCount > 0 && (
              <p className="form-alert" role="alert">
                <WarningCircle size={18} aria-hidden="true" />
                Revisá {errorCount === 1 ? "el campo marcado" : `los ${errorCount} campos marcados`} para continuar.
              </p>
            )}

            <div className="quote-actions">
              <button type="submit" className="btn btn-primary btn-lg">
                Preparar consulta →
              </button>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="link-muted">
                <WhatsappLogo size={18} aria-hidden="true" />o escribinos directo por WhatsApp
              </a>
            </div>
          </form>
        )}

        {status !== "form" && (
          <div className="quote-result">
            {status === "ready" ? (
              <>
                <h3 ref={headingRef} tabIndex={-1} className="quote-result-title">
                  Tu consulta está lista.
                </h3>
                <p className="quote-result-text">
                  Todavía no fue enviada. Tocá <strong>Enviar por WhatsApp</strong>: se abre la conversación con este mensaje y lo enviás desde ahí.
                </p>
              </>
            ) : (
              <>
                <CheckCircle size={40} className="quote-result-icon" aria-hidden="true" />
                <h3 ref={headingRef} tabIndex={-1} className="quote-result-title">
                  Abrimos WhatsApp con tu consulta.
                </h3>
                <p className="quote-result-text" role="status">
                  Para que nos llegue, confirmá el envío en WhatsApp. Si no se abrió, usá el botón de nuevo.
                </p>
              </>
            )}
            <p className="quote-summary">{quoteSummary(form)}</p>
            <details className="quote-preview">
              <summary>Ver mensaje</summary>
              <pre>{message}</pre>
            </details>
            <div className="quote-actions">
              <a
                href={whatsappUrl(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
                onClick={() => setStatus("opened")}
              >
                <WhatsappLogo size={18} aria-hidden="true" />
                {status === "ready" ? "Enviar por WhatsApp →" : "Abrir WhatsApp de nuevo →"}
              </a>
              <button type="button" className="btn btn-ghost btn-lg" onClick={() => setStatus("form")}>
                Editar datos
              </button>
              <button type="button" className="btn btn-ghost btn-lg" onClick={startOver}>
                Nueva consulta
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
