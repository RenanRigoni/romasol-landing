"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { ensureGsapRegistered, prefersReducedMotion } from "@/lib/gsap";
import { withBasePath } from "@/lib/basePath";

interface Step {
  number: number;
  phaseId: string;
  title: string;
  description: string;
}

interface Phase {
  id: string;
  label: string;
}

const PHASES: Phase[] = [
  { id: "diagnostico", label: "Diagnóstico" },
  { id: "planejamento", label: "Planejamento" },
  { id: "execucao", label: "Execução" },
  { id: "operacao", label: "Operação" },
];

const STEPS: Step[] = [
  {
    number: 1,
    phaseId: "diagnostico",
    title: "Análise de consumo",
    description:
      "Avaliamos sua fatura de energia real e perfil de consumo, sem estimativas genéricas de mercado.",
  },
  {
    number: 2,
    phaseId: "diagnostico",
    title: "Simulação técnica",
    description: "Dimensionamos o sistema com base no consumo real.",
  },
  {
    number: 3,
    phaseId: "planejamento",
    title: "Proposta personalizada",
    description: "Você recebe uma proposta detalhada com o projeto.",
  },
  {
    number: 4,
    phaseId: "planejamento",
    title: "Vistoria técnica",
    description: "Nossa equipe avalia o local da instalação.",
  },
  {
    number: 5,
    phaseId: "planejamento",
    title: "Engenharia e homologação",
    description:
      "Projeto elétrico e estrutural detalhado, com início do processo de aprovação junto à distribuidora.",
  },
  {
    number: 6,
    phaseId: "execucao",
    title: "Instalação",
    description: "Execução da instalação por equipe especializada.",
  },
  {
    number: 7,
    phaseId: "execucao",
    title: "Conexão à rede",
    description:
      "Processo de aprovação concluído junto à distribuidora e sistema liberado para operação.",
  },
  {
    number: 8,
    phaseId: "operacao",
    title: "Monitoramento e suporte",
    description: "Acompanhamento contínuo da geração e suporte técnico.",
  },
];

export function ProcessTimeline() {
  const rootRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!prefersReducedMotion()) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.getAttribute("data-step-index"));
          setActiveIndex(index);
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );

    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      if (!railRef.current || !lineRef.current) return;
      if (prefersReducedMotion()) return;

      const gsap = ensureGsapRegistered();
      const progress = { value: 0 };
      const lastIndexRef = { current: -1 };

      const tween = gsap.to(progress, {
        value: 1,
        ease: "none",
        scrollTrigger: {
          trigger: railRef.current,
          start: "top 65%",
          end: "bottom 55%",
          scrub: 0.4,
        },
        onUpdate: () => {
          if (lineRef.current) {
            lineRef.current.style.transform = `scaleY(${progress.value})`;
          }
          const nextIndex = Math.min(
            STEPS.length - 1,
            Math.floor(progress.value * STEPS.length),
          );
          if (nextIndex !== lastIndexRef.current) {
            lastIndexRef.current = nextIndex;
            setActiveIndex(nextIndex);
          }
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: rootRef },
  );

  useEffect(() => {
    if (!prefersReducedMotion() || !lineRef.current) return;
    lineRef.current.style.transform = `scaleY(${(activeIndex + 1) / STEPS.length})`;
  }, [activeIndex]);

  const activePhaseId = STEPS[activeIndex].phaseId;
  const activePhaseIndex = PHASES.findIndex((phase) => phase.id === activePhaseId);

  return (
    <section id="engenharia" ref={rootRef} className="bg-navy-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-offwhite-50 sm:text-4xl">
              Um projeto de engenharia, concluído em etapas.
            </h2>
            <p className="mt-4 max-w-md text-slate-300">
              Cada etapa reduz incerteza para você acompanhar o projeto com segurança, do
              primeiro contato à operação do sistema.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {PHASES.map((phase, index) => (
                <span
                  key={phase.id}
                  className={`text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-500 ${
                    index === activePhaseIndex ? "text-solar-400" : "text-slate-400"
                  }`}
                >
                  {phase.label}
                </span>
              ))}
            </div>

            <div className="relative mt-8 aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl border border-white/10">
              <PhasePanel phaseId="diagnostico" active={activePhaseId === "diagnostico"} />
              <PhasePanel phaseId="planejamento" active={activePhaseId === "planejamento"} />
              <PhasePanel phaseId="execucao" active={activePhaseId === "execucao"} />
              <PhasePanel phaseId="operacao" active={activePhaseId === "operacao"} />
            </div>
          </div>

          <div ref={railRef} className="relative pl-14">
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-white/10" aria-hidden="true" />
            <div
              ref={lineRef}
              className="absolute left-[19px] top-2 bottom-2 w-px origin-top bg-solar-500"
              style={{ transform: "scaleY(0)" }}
              aria-hidden="true"
            />

            <ol className="flex flex-col">
              {STEPS.map((step, index) => {
                const isActive = index === activeIndex;
                const isPast = index < activeIndex;
                const isFirstOfPhase = index === 0 || STEPS[index - 1].phaseId !== step.phaseId;
                const phase = PHASES.find((p) => p.id === step.phaseId);

                return (
                  <li
                    key={step.number}
                    ref={(el) => {
                      stepRefs.current[index] = el;
                    }}
                    data-step-index={index}
                    className="relative py-6 transition-opacity duration-500"
                    style={{ opacity: isActive ? 1 : isPast ? 0.55 : 0.35 }}
                  >
                    {isFirstOfPhase ? (
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                        {phase?.label}
                      </p>
                    ) : null}

                    <div className="flex items-start gap-5">
                      <span
                        className={`absolute -left-14 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-display text-sm font-semibold transition-colors duration-500 ${
                          isActive
                            ? "border-solar-500 bg-solar-500 text-navy-950"
                            : isPast
                              ? "border-solar-500/50 text-solar-400"
                              : "border-white/15 text-slate-400"
                        }`}
                      >
                        {String(step.number).padStart(2, "0")}
                      </span>

                      <div>
                        <h3
                          className={`font-display text-lg font-semibold transition-colors duration-500 sm:text-xl ${
                            isActive ? "text-offwhite-50" : "text-offwhite-50/80"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhasePanel({ phaseId, active }: { phaseId: string; active: boolean }) {
  return (
    <div
      className="absolute inset-0 transition-opacity duration-700"
      style={{ opacity: active ? 1 : 0 }}
      aria-hidden={!active}
    >
      {phaseId === "diagnostico" ? <PanelDiagnostico /> : null}
      {phaseId === "planejamento" ? <PanelPlanejamento /> : null}
      {phaseId === "execucao" ? <PanelExecucao /> : null}
      {phaseId === "operacao" ? <PanelOperacao /> : null}
    </div>
  );
}

function BlueprintGrid() {
  return (
    <div
      className="absolute inset-0 opacity-[0.12]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(92,130,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(92,130,255,0.6) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
      aria-hidden="true"
    />
  );
}

function PanelDiagnostico() {
  const bars = [38, 62, 48, 78, 54, 88, 66, 72];
  return (
    <div className="relative flex h-full w-full items-end gap-2.5 bg-navy-950 p-8">
      <BlueprintGrid />
      {bars.map((height, index) => (
        <div
          key={index}
          className="relative z-10 flex-1 rounded-t-[2px] bg-gradient-to-t from-solar-500/90 to-solar-400/20"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}

function PanelPlanejamento() {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-navy-950 p-8">
      <BlueprintGrid />
      <svg viewBox="0 0 200 140" className="relative z-10 h-full w-full max-w-xs" fill="none">
        <path d="M20 122 L100 24 L180 122 Z" stroke="#5c82ff" strokeWidth="1" strokeDasharray="3 4" />
        {[0, 1, 2, 3].map((row) => (
          <line
            key={row}
            x1={38 + row * 9}
            y1={112 - row * 6}
            x2={162 - row * 9}
            y2={112 - row * 6}
            stroke="#F5B301"
            strokeWidth="1"
            opacity={0.55}
          />
        ))}
        <circle cx="100" cy="24" r="2.5" fill="#F5B301" />
      </svg>
    </div>
  );
}

function PanelExecucao() {
  return (
    <div className="relative h-full w-full bg-navy-950">
      <Image
        src={withBasePath("/cases/butiquim.png")}
        alt="Instalação fotovoltaica real da Romasol em telhado comercial"
        fill
        sizes="(min-width: 1024px) 33vw, 90vw"
        className="object-cover"
      />
    </div>
  );
}

function PanelOperacao() {
  return (
    <div className="relative flex h-full w-full flex-col justify-center gap-8 bg-navy-950 p-8">
      <BlueprintGrid />
      <svg viewBox="0 0 300 90" className="relative z-10 w-full" fill="none">
        <path
          d="M8 74 L70 74 L96 20 L150 20 L176 68 L292 68"
          stroke="#F5B301"
          strokeWidth="1.5"
          strokeDasharray="5 7"
        />
        <circle cx="292" cy="68" r="3.5" fill="#F5B301" className="animate-pulse" />
      </svg>
      <div className="relative z-10 flex gap-6 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        <span>Geração</span>
        <span>Bateria</span>
        <span>Consumo</span>
      </div>
    </div>
  );
}
