"use client";

import { useState, type FormEvent } from "react";
import { ALL_CITIES } from "@/lib/cities";
import { formatPhoneBR, isValidPhoneBR } from "@/lib/format";
import { buildWhatsAppUrl, type CustomerProfile } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { useAppState } from "./AppStateProvider";

interface FormFields {
  name: string;
  phone: string;
  city: string;
  monthlyBill: string;
  profile: CustomerProfile | "";
  ownership: "propria" | "alugada" | "";
}

const EMPTY_FIELDS: FormFields = {
  name: "",
  phone: "",
  city: "",
  monthlyBill: "",
  profile: "",
  ownership: "",
};

type FieldErrors = Partial<Record<keyof FormFields, string>>;

/**
 * Sem webhook/CRM configurado: o lead é encaminhado via WhatsApp.
 * Quando um endpoint real existir, plugue a chamada aqui — nunca simule sucesso
 * sem que o envio (WhatsApp ou API) de fato tenha ocorrido.
 */
function submitLead(fields: FormFields) {
  const url = buildWhatsAppUrl({
    name: fields.name,
    profile: fields.profile || undefined,
    city: fields.city || undefined,
    monthlyBill: fields.monthlyBill ? Number(fields.monthlyBill) : undefined,
  });
  window.open(url, "_blank", "noopener,noreferrer");
}

export function LeadForm() {
  const { monthlyBill: contextMonthlyBill, city: contextCity, profile: contextProfile } =
    useAppState();
  const [fields, setFields] = useState<FormFields>(() => ({
    ...EMPTY_FIELDS,
    monthlyBill: contextMonthlyBill ? String(contextMonthlyBill) : "",
    city: contextCity ?? "",
    profile: contextProfile ?? "",
  }));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasOpenedWhatsApp, setHasOpenedWhatsApp] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  function updateField<K extends keyof FormFields>(key: K, value: FormFields[K]) {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent("lead_form_started");
    }
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): FieldErrors {
    const nextErrors: FieldErrors = {};
    if (!fields.name.trim()) nextErrors.name = "Informe seu nome.";
    if (!isValidPhoneBR(fields.phone)) nextErrors.phone = "Informe um WhatsApp válido com DDD.";
    if (!fields.city) nextErrors.city = "Selecione sua cidade.";
    if (!fields.monthlyBill || Number(fields.monthlyBill) <= 0) {
      nextErrors.monthlyBill = "Informe o valor médio da sua conta.";
    }
    if (!fields.profile) nextErrors.profile = "Selecione seu perfil.";
    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    trackEvent("lead_form_submitted", { profile: fields.profile, city: fields.city });
    submitLead(fields);
    setHasOpenedWhatsApp(true);
    setIsSubmitting(false);
  }

  if (hasOpenedWhatsApp) {
    return (
      <div className="rounded-2xl border border-solar-500/30 bg-solar-500/10 p-6 text-center">
        <p className="font-display text-lg font-semibold text-offwhite-50">
          Abrimos o WhatsApp em uma nova aba.
        </p>
        <p className="mt-2 text-sm text-slate-300">
          Complete o envio da mensagem por lá para falar diretamente com a equipe Romasol.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <Field label="Nome" htmlFor="lead-name" error={errors.name}>
        <input
          id="lead-name"
          type="text"
          value={fields.name}
          onChange={(event) => updateField("name", event.target.value)}
          className="input-base"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "lead-name-error" : undefined}
        />
      </Field>

      <Field label="WhatsApp" htmlFor="lead-phone" error={errors.phone}>
        <input
          id="lead-phone"
          type="tel"
          inputMode="numeric"
          placeholder="(34) 99999-9999"
          value={fields.phone}
          onChange={(event) => updateField("phone", formatPhoneBR(event.target.value))}
          className="input-base"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "lead-phone-error" : undefined}
        />
      </Field>

      <Field label="Cidade" htmlFor="lead-city" error={errors.city}>
        <select
          id="lead-city"
          value={fields.city}
          onChange={(event) => updateField("city", event.target.value)}
          className="input-base"
          aria-invalid={Boolean(errors.city)}
        >
          <option value="">Selecione</option>
          {ALL_CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Conta média mensal (R$)" htmlFor="lead-bill" error={errors.monthlyBill}>
        <input
          id="lead-bill"
          type="number"
          min={0}
          inputMode="decimal"
          value={fields.monthlyBill}
          onChange={(event) => updateField("monthlyBill", event.target.value)}
          className="input-base"
          aria-invalid={Boolean(errors.monthlyBill)}
        />
      </Field>

      <Field label="Perfil" htmlFor="lead-profile" error={errors.profile}>
        <select
          id="lead-profile"
          value={fields.profile}
          onChange={(event) => updateField("profile", event.target.value as CustomerProfile)}
          className="input-base"
          aria-invalid={Boolean(errors.profile)}
        >
          <option value="">Selecione</option>
          <option value="residencial">Residencial</option>
          <option value="comercial">Comercial</option>
          <option value="industrial">Industrial</option>
          <option value="rural">Rural</option>
        </select>
      </Field>

      <Field label="Imóvel" htmlFor="lead-ownership">
        <select
          id="lead-ownership"
          value={fields.ownership}
          onChange={(event) => updateField("ownership", event.target.value as FormFields["ownership"])}
          className="input-base"
        >
          <option value="">Selecione (opcional)</option>
          <option value="propria">Própria</option>
          <option value="alugada">Alugada</option>
        </select>
      </Field>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 rounded-full bg-solar-500 px-6 py-3.5 text-sm font-semibold text-navy-950 transition-transform active:scale-[0.98] disabled:opacity-60"
      >
        {isSubmitting ? "Abrindo WhatsApp..." : "Receber análise personalizada"}
      </button>

      <p className="text-xs leading-relaxed text-slate-400">
        Seus dados são usados apenas para contato sobre a sua simulação. Ao enviar, você será
        direcionado ao WhatsApp da Romasol com um resumo pré-preenchido.
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-offwhite-50">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-xs text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
