"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { calculateSolarEstimate } from "@/lib/solar";
import { formatCurrencyBRL, formatInteger, formatKwh, formatKwp } from "@/lib/format";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { ALL_CITIES } from "@/lib/cities";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";
import { useAppState } from "./AppStateProvider";
import { ensureGsapRegistered, prefersReducedMotion } from "@/lib/gsap";

const QUICK_AMOUNTS = [300, 600, 900, 1200];

export function SolarCalculator() {
  const { profile, city, setCity, monthlyBill, setMonthlyBill, setEstimate } = useAppState();
  const [rawInput, setRawInput] = useState(monthlyBill ? String(monthlyBill) : "");
  const [hasStarted, setHasStarted] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const monthlyValueRef = useRef<HTMLSpanElement>(null);
  const annualValueRef = useRef<HTMLSpanElement>(null);
  const fourYearValueRef = useRef<HTMLSpanElement>(null);
  const hasRevealedRef = useRef(false);

  const parsedBill = useMemo(() => {
    const numeric = Number(rawInput.replace(/[^\d.,]/g, "").replace(",", "."));
    return Number.isFinite(numeric) ? numeric : 0;
  }, [rawInput]);

  const result = useMemo(
    () => (parsedBill > 0 ? calculateSolarEstimate({ monthlyBill: parsedBill }) : undefined),
    [parsedBill],
  );

  useEffect(() => {
    setMonthlyBill(parsedBill > 0 ? parsedBill : undefined);
    setEstimate(result);
  }, [parsedBill, result, setMonthlyBill, setEstimate]);

  useGSAP(
    () => {
      if (!result) {
        hasRevealedRef.current = false;
        return;
      }

      const setText = (ref: React.RefObject<HTMLSpanElement | null>, value: number) => {
        if (ref.current) ref.current.textContent = formatCurrencyBRL(value);
      };

      const isFirstReveal = !hasRevealedRef.current;
      hasRevealedRef.current = true;

      if (isFirstReveal && !prefersReducedMotion()) {
        const gsap = ensureGsapRegistered();
        const rows = resultRef.current?.querySelectorAll("[data-result-row]");
        if (rows?.length) {
          gsap.fromTo(
            rows,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power2.out" },
          );
        }

        const counters: Array<[React.RefObject<HTMLSpanElement | null>, number]> = [
          [monthlyValueRef, result.monthlySavings],
          [annualValueRef, result.annualSavings],
          [fourYearValueRef, result.fourYearSavings],
        ];

        counters.forEach(([ref, target]) => {
          const counter = { value: 0 };
          gsap.to(counter, {
            value: target,
            duration: 1.1,
            ease: "power2.out",
            onUpdate: () => setText(ref, Math.round(counter.value)),
          });
        });
      } else {
        setText(monthlyValueRef, result.monthlySavings);
        setText(annualValueRef, result.annualSavings);
        setText(fourYearValueRef, result.fourYearSavings);
      }
    },
    { dependencies: [result], scope: resultRef },
  );

  function handleInputChange(value: string) {
    if (!hasStarted && value) {
      setHasStarted(true);
      trackEvent("calculator_started");
    }
    setRawInput(value);
  }

  function handleQuickAmount(amount: number) {
    handleInputChange(String(amount));
  }

  const whatsappHref = buildWhatsAppUrl({ profile, city, monthlyBill: parsedBill, estimate: result });

  return (
    <section id="calculadora" className="bg-navy-900/60 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            title="Veja o potencial de economia da sua conta."
            description="Informe o valor médio da sua conta de energia. É a única informação usada no cálculo abaixo."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid grid-cols-1 gap-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <div>
                <label htmlFor="monthly-bill" className="text-sm font-semibold text-offwhite-50">
                  Conta média mensal (R$)
                </label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {QUICK_AMOUNTS.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleQuickAmount(amount)}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                        Number(rawInput) === amount
                          ? "border-solar-500 bg-solar-500 text-navy-950"
                          : "border-white/15 text-offwhite-50/85 hover:border-white/30"
                      }`}
                    >
                      R$ {amount}
                    </button>
                  ))}
                </div>
                <input
                  id="monthly-bill"
                  type="text"
                  inputMode="decimal"
                  placeholder="Outro valor, ex: 750"
                  value={rawInput}
                  onChange={(event) => handleInputChange(event.target.value)}
                  className="mt-4 w-full rounded-xl border border-white/15 bg-navy-950 px-4 py-3.5 text-lg text-offwhite-50 outline-none transition-colors focus:border-solar-500"
                  aria-describedby="monthly-bill-hint"
                />
                <p id="monthly-bill-hint" className="mt-2 text-xs text-slate-400">
                  Valor usado diretamente na fórmula de estimativa.
                </p>
              </div>

              <div className="border-t border-white/10 pt-6">
                <label htmlFor="city-select" className="text-sm font-semibold text-offwhite-50">
                  Cidade (opcional, apenas para contato)
                </label>
                <select
                  id="city-select"
                  value={city ?? ""}
                  onChange={(event) => setCity(event.target.value || undefined)}
                  className="mt-3 w-full rounded-xl border border-white/15 bg-navy-950 px-4 py-3 text-offwhite-50 outline-none focus:border-solar-500"
                >
                  <option value="">Selecione sua cidade</option>
                  {ALL_CITIES.map((cityName) => (
                    <option key={cityName} value={cityName}>
                      {cityName}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs text-slate-400">
                  Não altera o cálculo, apenas ajuda a personalizar o atendimento.
                </p>
              </div>
            </div>

            <div
              ref={resultRef}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-navy-950 p-6"
            >
              {result ? (
                <div className="flex flex-col gap-5">
                  <ResultRow label="Consumo estimado" value={formatKwh(result.monthlyConsumptionKwh)} suffix="/mês" />
                  <ResultRow label="Potência necessária" value={formatKwp(result.requiredPowerKwp)} />
                  <ResultRow label="Painéis estimados" value={`${formatInteger(result.estimatedPanelCount)} painéis`} />
                  <ResultRow label="Potência instalada" value={formatKwp(result.installedPowerKwp)} />
                  <div className="my-1 border-t border-white/10" />
                  <ResultRow label="Economia mensal" valueRef={monthlyValueRef} highlight />
                  <ResultRow label="Economia anual" valueRef={annualValueRef} highlight />
                  <ResultRow label="Economia em 4 anos" valueRef={fourYearValueRef} highlight />

                  <Button
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    className="mt-2 w-full"
                    onClick={() => {
                      trackEvent("calculator_completed", { monthlyBill: parsedBill });
                      trackEvent("calculator_lead_click");
                    }}
                  >
                    Receber uma análise personalizada
                  </Button>

                  <p className="text-xs leading-relaxed text-slate-400">
                    Estimativa com fator de economia conservador de 90% sobre o valor da conta.
                    A Romasol já registrou casos de economia de até 95%, mas o percentual real
                    depende da análise técnica do seu imóvel.
                  </p>
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 py-12 text-center text-slate-400">
                  <p>Informe o valor da sua conta para ver a simulação.</p>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-slate-400">
          Esta é uma estimativa inicial baseada na tarifa média de energia e no potencial regional
          de geração solar. O dimensionamento definitivo depende da análise da fatura, localização,
          irradiação, orientação do telhado, sombreamento, estrutura elétrica e condições técnicas
          do imóvel.
        </p>
      </div>
    </section>
  );
}

function ResultRow({
  label,
  value,
  valueRef,
  suffix,
  highlight,
}: {
  label: string;
  value?: string;
  valueRef?: React.RefObject<HTMLSpanElement | null>;
  suffix?: string;
  highlight?: boolean;
}) {
  return (
    <div data-result-row className="flex items-baseline justify-between gap-4">
      <span className="text-sm text-slate-300">{label}</span>
      <span
        ref={valueRef}
        className={`font-display text-lg font-semibold ${
          highlight ? "text-solar-400" : "text-offwhite-50"
        }`}
      >
        {value}
        {suffix ? <span className="text-xs text-slate-400">{suffix}</span> : null}
      </span>
    </div>
  );
}
