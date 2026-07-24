"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ensureGsapRegistered, prefersReducedMotion } from "@/lib/gsap";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const MONTHLY_BILL = 600;
const YEARS = 4;
const SAVINGS_FACTOR = 0.9;

const TOTAL_WITHOUT_SOLAR = MONTHLY_BILL * 12 * YEARS;
const TOTAL_SAVINGS = Math.round(TOTAL_WITHOUT_SOLAR * SAVINGS_FACTOR);
const REMAINING_COST = TOTAL_WITHOUT_SOLAR - TOTAL_SAVINGS;
const SAVINGS_PERCENT = Math.round((TOTAL_SAVINGS / TOTAL_WITHOUT_SOLAR) * 100);

const currency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export function FinancingSection() {
  const rootRef = useRef<HTMLElement>(null);
  const segmentRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const tickWrapRef = useRef<HTMLDivElement>(null);
  const sparklineRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      if (!segmentRef.current || !numberRef.current) return;

      if (prefersReducedMotion()) {
        segmentRef.current.style.width = `${SAVINGS_PERCENT}%`;
        numberRef.current.textContent = currency(TOTAL_SAVINGS);
        return;
      }

      const gsap = ensureGsapRegistered();
      const counter = { value: 0 };

      if (sparklineRef.current) {
        const length = sparklineRef.current.getTotalLength();
        gsap.set(sparklineRef.current, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(sparklineRef.current, {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 70%",
            once: true,
          },
        });
      }

      gsap.to(counter, {
        value: TOTAL_SAVINGS,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 70%",
          once: true,
        },
        onUpdate: () => {
          if (numberRef.current) numberRef.current.textContent = currency(counter.value);
        },
      });

      gsap.to(segmentRef.current, {
        width: `${SAVINGS_PERCENT}%`,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 70%",
          once: true,
        },
      });

      if (tickWrapRef.current) {
        gsap.from(tickWrapRef.current.children, {
          opacity: 0,
          duration: 0.4,
          stagger: 0.04,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 70%",
            once: true,
          },
        });
      }
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-navy-950 py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(45% 55% at 12% 8%, rgba(47,99,255,0.10), transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-offwhite-50 sm:text-4xl md:text-5xl">
              O projeto pode ser financiado.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Financiamento transforma anos de economia em uma decisão viável hoje. A Romasol tem
              relacionamento com instituições financeiras para viabilizar o investimento; condições,
              taxas e prazos são definidos com o banco escolhido durante a proposta.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Exemplo ilustrativo · conta média de {currency(MONTHLY_BILL)}/mês
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative">
            <div
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-solar-500/70 via-solar-500/15 to-transparent"
              aria-hidden="true"
            />

            <div className="relative grid grid-cols-1 gap-10 pt-9 lg:grid-cols-[minmax(280px,0.8fr)_minmax(500px,1.4fr)] lg:items-start lg:gap-12">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-solar-400">
                  Economia estimada em {YEARS} anos
                </p>
                <span className="mt-3 block h-[3px] w-10 bg-solar-500" aria-hidden="true" />
                <p className="mt-3 font-display text-5xl font-semibold tracking-tight text-offwhite-50 sm:text-6xl lg:text-[3.75rem]">
                  <span ref={numberRef}>{currency(0)}</span>
                </p>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
                  Sobre um total de {currency(TOTAL_WITHOUT_SOLAR)} que seriam pagos à
                  concessionária no mesmo período, sem energia solar.
                </p>
              </div>

              <div className="relative">
                <svg
                  className="pointer-events-none absolute -top-8 right-0 h-24 w-2/3 opacity-[0.25]"
                  viewBox="0 0 400 140"
                  preserveAspectRatio="none"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    ref={sparklineRef}
                    d="M0 132 C 60 128, 110 120, 150 104 C 200 84, 240 88, 280 62 C 325 32, 350 28, 400 4"
                    stroke="#F5B301"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="relative flex items-baseline justify-between text-sm">
                  <span className="text-slate-400">
                    Sem energia solar · {currency(TOTAL_WITHOUT_SOLAR)}
                  </span>
                  <span className="font-semibold text-solar-400">
                    {SAVINGS_PERCENT}% economizado
                  </span>
                </div>

                <div ref={tickWrapRef} className="relative mt-3 flex gap-[3px]" aria-hidden="true">
                  {Array.from({ length: 40 }).map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 flex-1 ${index % 5 === 0 ? "bg-white/20" : "bg-white/10"}`}
                    />
                  ))}
                </div>

                <div className="relative mt-1.5 h-5 w-full overflow-hidden bg-white/[0.04]">
                  <div
                    ref={segmentRef}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-solar-500/80 to-solar-400"
                    style={{ width: 0 }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                  <span>Custo remanescente · {currency(REMAINING_COST)}</span>
                  <span>Economia · {currency(TOTAL_SAVINGS)}</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px] uppercase tracking-wide text-slate-600">
                  <span>Mês 0</span>
                  <span>Mês {YEARS * 12}</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-col gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-lg text-xs leading-relaxed text-slate-500">
              Comparativo meramente ilustrativo, sem considerar o valor do investimento inicial,
              taxas de financiamento ou variações tarifárias. Não representa uma proposta financeira.
            </p>
            <Button
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="shrink-0"
            >
              Receber simulação de financiamento
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
