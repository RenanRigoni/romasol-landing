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
  const [isExplainOpen, setIsExplainOpen] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const flowLineRef = useRef<HTMLDivElement>(null);
  const annualValueRef = useRef<HTMLSpanElement>(null);
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
        if (flowLineRef.current) flowLineRef.current.style.transform = "scaleX(0)";
        return;
      }

      const isFirstReveal = !hasRevealedRef.current;
      hasRevealedRef.current = true;

      if (isFirstReveal && !prefersReducedMotion()) {
        const gsap = ensureGsapRegistered();

        if (flowLineRef.current) {
          gsap.fromTo(
            flowLineRef.current,
            { scaleX: 0 },
            { scaleX: 1, duration: 1.1, ease: "power2.out" },
          );
        }

        const counter = { value: 0 };
        gsap.to(counter, {
          value: result.annualSavings,
          duration: 1.1,
          ease: "power2.out",
          onUpdate: () => {
            if (annualValueRef.current) {
              annualValueRef.current.textContent = formatCurrencyBRL(Math.round(counter.value));
            }
          },
        });
      } else {
        if (flowLineRef.current) flowLineRef.current.style.transform = "scaleX(1)";
        if (annualValueRef.current) {
          annualValueRef.current.textContent = formatCurrencyBRL(result.annualSavings);
        }
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
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x lg:divide-white/10">
              <div className="p-6 sm:p-10">
                <label htmlFor="monthly-bill" className="text-sm font-semibold text-offwhite-50">
                  Conta média mensal
                </label>
                <div className="mt-3 flex items-baseline gap-2 border-b-2 border-white/15 pb-2 transition-colors focus-within:border-solar-500">
                  <span className="font-display text-3xl font-semibold text-slate-500 sm:text-4xl">
                    R$
                  </span>
                  <input
                    id="monthly-bill"
                    type="text"
                    inputMode="decimal"
                    placeholder="600"
                    value={rawInput}
                    onChange={(event) => handleInputChange(event.target.value)}
                    className="w-full bg-transparent font-display text-3xl font-semibold text-offwhite-50 outline-none placeholder:text-slate-500 sm:text-4xl"
                    aria-describedby="monthly-bill-hint"
                  />
                </div>
                <p id="monthly-bill-hint" className="mt-2 text-xs text-slate-400">
                  Valor usado diretamente na fórmula de estimativa.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {QUICK_AMOUNTS.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleQuickAmount(amount)}
                      className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                        Number(rawInput) === amount
                          ? "border-solar-500 bg-solar-500 text-navy-950"
                          : "border-white/15 text-offwhite-50/85 hover:border-white/30"
                      }`}
                    >
                      R$ {amount}
                    </button>
                  ))}
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <label htmlFor="city-select" className="text-sm font-semibold text-offwhite-50">
                    Cidade (opcional, apenas para contato)
                  </label>
                  <select
                    id="city-select"
                    value={city ?? ""}
                    onChange={(event) => setCity(event.target.value || undefined)}
                    className="mt-3 w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 text-offwhite-50 outline-none focus:border-solar-500"
                  >
                    <option value="">Selecione sua cidade</option>
                    {ALL_CITIES.map((cityName) => (
                      <option key={cityName} value={cityName} className="bg-navy-950">
                        {cityName}
                      </option>
                    ))}
                  </select>
                  <p className="mt-2 text-xs text-slate-400">
                    Não altera o cálculo, apenas ajuda a personalizar o atendimento.
                  </p>
                </div>
              </div>

              <div ref={resultRef} className="relative overflow-hidden bg-navy-950 p-6 sm:p-10">
                <TechnicalGrid />

                <div className="relative">
                  <div className="flex items-center justify-between gap-2 text-[9px] font-semibold uppercase tracking-[0.08em] sm:text-[10px] sm:tracking-[0.15em]">
                    <span className={`whitespace-nowrap ${result ? "text-solar-400" : "text-slate-400"}`}>
                      Conta atual
                    </span>
                    <span className={`whitespace-nowrap ${result ? "text-solar-400" : "text-slate-400"}`}>
                      Sistema estimado
                    </span>
                    <span className={`whitespace-nowrap ${result ? "text-solar-400" : "text-slate-400"}`}>
                      Economia
                    </span>
                  </div>
                  <div className="relative mt-2.5 h-px bg-white/10">
                    <div
                      ref={flowLineRef}
                      className="absolute inset-y-0 left-0 w-full origin-left bg-solar-500"
                      style={{ transform: "scaleX(0)" }}
                    />
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
                    <Stat label="Consumo mensal" value={result ? formatKwh(result.monthlyConsumptionKwh) : "—"} />
                    <Stat label="Potência necessária" value={result ? formatKwp(result.requiredPowerKwp) : "—"} />
                    <Stat
                      label="Painéis estimados"
                      value={result ? `${formatInteger(result.estimatedPanelCount)} painéis` : "—"}
                    />
                    <Stat label="Potência instalada" value={result ? formatKwp(result.installedPowerKwp) : "—"} />
                  </div>

                  <div className="mt-8 border-t border-white/10 pt-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-solar-500">
                      Economia estimada por ano
                    </p>
                    <p
                      className={`mt-3 font-display text-4xl font-bold leading-none sm:text-5xl ${
                        result ? "text-solar-400" : "text-slate-500"
                      }`}
                    >
                      <span ref={annualValueRef}>{result ? formatCurrencyBRL(0) : "—"}</span>
                    </p>
                    <p className="mt-3 text-sm text-slate-400">
                      {result
                        ? `${formatCurrencyBRL(result.monthlySavings)}/mês · ${formatCurrencyBRL(result.fourYearSavings)} em 4 anos`
                        : "Informe sua conta ao lado para calcular"}
                    </p>
                  </div>

                  {result ? (
                    <div className="mt-6 flex flex-col gap-4">
                      <Button
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="primary"
                        className="w-full"
                        onClick={() => {
                          trackEvent("calculator_completed", { monthlyBill: parsedBill });
                          trackEvent("calculator_lead_click");
                        }}
                      >
                        Receber uma análise personalizada
                      </Button>

                      <div>
                        <p className="text-xs leading-relaxed text-slate-400">
                          Estimativa inicial. O dimensionamento definitivo depende de análise técnica.
                        </p>
                        <button
                          type="button"
                          onClick={() => setIsExplainOpen((prev) => !prev)}
                          className="mt-2 text-xs font-semibold text-slate-400 underline decoration-white/20 underline-offset-4 transition-colors hover:text-solar-400"
                        >
                          {isExplainOpen ? "Ocultar detalhes do cálculo" : "Entenda o cálculo"}
                        </button>
                        {isExplainOpen ? (
                          <p className="mt-3 text-xs leading-relaxed text-slate-400">
                            Estimativa baseada na tarifa média de energia e no potencial regional de
                            geração solar, com fator de economia conservador de 90% sobre o valor da
                            conta. A Romasol já registrou casos de economia de até 95%, mas o
                            dimensionamento definitivo depende da análise da fatura, localização,
                            irradiação, orientação do telhado, sombreamento, estrutura elétrica e
                            condições técnicas do imóvel.
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 font-display text-lg font-semibold text-offwhite-50">{value}</p>
    </div>
  );
}

function TechnicalGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(92,130,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(92,130,255,0.6) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
      aria-hidden="true"
    />
  );
}
