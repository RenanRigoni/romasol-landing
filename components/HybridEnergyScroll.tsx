"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { ensureGsapRegistered, prefersReducedMotion, useReducedMotion } from "@/lib/gsap";

const STAGES = [
  {
    label: "Gerar",
    title: "O sistema capta energia solar durante o dia.",
    description: "Os módulos fotovoltaicos convertem luz solar em energia elétrica para a casa, empresa ou propriedade rural.",
  },
  {
    label: "Armazenar",
    title: "O excedente pode ser armazenado em baterias.",
    description: "Em projetos híbridos, a energia gerada além do consumo imediato fica disponível para uso posterior.",
  },
  {
    label: "Gerenciar",
    title: "Inversores equilibram geração, consumo e bateria.",
    description: "O sistema monitora em tempo real de onde vem e para onde vai cada parte da energia produzida.",
  },
  {
    label: "Decidir automaticamente",
    title: "A fonte mais eficiente é priorizada a cada momento.",
    description: "Rede, geração solar e bateria trabalham juntas sem exigir intervenção manual do usuário.",
  },
];

function StageDiagram({ stageIndex }: { stageIndex: number }) {
  if (stageIndex === 0) {
    return (
      <svg viewBox="0 0 64 64" className="h-14 w-14" fill="none" aria-hidden="true">
        <circle cx="32" cy="20" r="7" stroke="#F5B301" strokeWidth="1.5" />
        <path d="M32 6v4M32 30v4M18 20h4M46 20h4M22 10l3 3M42 10l-3 3" stroke="#F5B301" strokeWidth="1.5" />
        <path d="M8 52 L26 52 L30 44 L38 44 L42 52 L56 52" stroke="#5c82ff" strokeWidth="1.2" strokeDasharray="3 4" />
      </svg>
    );
  }
  if (stageIndex === 1) {
    return (
      <svg viewBox="0 0 64 64" className="h-14 w-14" fill="none" aria-hidden="true">
        <rect x="16" y="16" width="28" height="36" rx="2" stroke="#5c82ff" strokeWidth="1.5" />
        <rect x="25" y="11" width="10" height="5" rx="1" fill="#5c82ff" />
        <rect x="20" y="40" width="20" height="8" fill="#F5B301" opacity="0.85" />
        <rect x="20" y="30" width="20" height="8" fill="#F5B301" opacity="0.55" />
        <rect x="20" y="20" width="20" height="8" fill="none" stroke="#F5B301" strokeWidth="1" opacity="0.4" />
      </svg>
    );
  }
  if (stageIndex === 2) {
    return (
      <svg viewBox="0 0 64 64" className="h-14 w-14" fill="none" aria-hidden="true">
        <circle cx="14" cy="16" r="5" stroke="#F5B301" strokeWidth="1.4" />
        <circle cx="14" cy="48" r="5" stroke="#5c82ff" strokeWidth="1.4" />
        <circle cx="50" cy="32" r="6" stroke="#F5B301" strokeWidth="1.4" />
        <path d="M18 19 L45 30M18 45 L45 34" stroke="#5c82ff" strokeWidth="1.2" strokeDasharray="2 4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14" fill="none" aria-hidden="true">
      <circle cx="10" cy="32" r="3.5" fill="#F5B301" />
      <path d="M13 32 L28 32" stroke="#F5B301" strokeWidth="1.5" />
      <path d="M28 32 L46 14" stroke="#5c82ff" strokeWidth="1.2" strokeDasharray="2 4" opacity="0.5" />
      <path d="M28 32 L46 32" stroke="#F5B301" strokeWidth="1.5" />
      <path d="M28 32 L46 50" stroke="#5c82ff" strokeWidth="1.2" strokeDasharray="2 4" opacity="0.5" />
      <circle cx="49" cy="32" r="3" fill="#F5B301" />
    </svg>
  );
}

export function HybridEnergyScroll() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const gsap = ensureGsapRegistered();
      if (prefersReducedMotion()) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-stage-panel]");
        const overlays = gsap.utils.toArray<HTMLElement>("[data-stage-overlay]");

        gsap.set(overlays, { opacity: 0 });
        gsap.set(overlays[0], { opacity: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "+=300%",
            scrub: 0.6,
            pin: true,
            onUpdate: (self) => {
              const index = Math.min(
                STAGES.length - 1,
                Math.floor(self.progress * STAGES.length),
              );
              setActiveStage(index);
            },
          },
        });

        panels.forEach((panel, index) => {
          if (index === 0) return;
          tl.fromTo(
            panel,
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.4 },
            index - 0.1,
          ).to(panels[index - 1], { autoAlpha: 0, y: -16, duration: 0.4 }, index - 0.1);
        });

        overlays.forEach((overlay, index) => {
          if (index === 0) return;
          tl.to(overlays[index - 1], { opacity: 0, duration: 0.4 }, index - 0.1).to(
            overlay,
            { opacity: 1, duration: 0.4 },
            index - 0.1,
          );
        });

        return () => tl.kill();
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className={`relative bg-navy-900/60 py-24 ${reducedMotion ? "" : "lg:py-0"}`}
    >
      <div
        className={`mx-auto max-w-7xl px-6 ${
          reducedMotion ? "" : "lg:flex lg:h-screen lg:items-center"
        }`}
      >
        <div className={`mb-10 ${reducedMotion ? "" : "lg:hidden"}`}>
          <h2 className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-offwhite-50 sm:text-4xl">
            Não é apenas gerar energia. É gerenciar inteligência energética.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className={reducedMotion ? "hidden" : "hidden lg:block"}>
            <p className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-offwhite-50 xl:text-5xl">
              Não é apenas gerar energia.
              <br />
              <span className="text-solar-400">É gerenciar inteligência energética.</span>
            </p>

            <div className="relative mt-14 h-40">
              {STAGES.map((stage, index) => (
                <div
                  key={stage.label}
                  data-stage-panel
                  className="absolute inset-0"
                  style={{ opacity: index === 0 ? 1 : 0 }}
                >
                  <span className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-solar-500">
                    {String(index + 1).padStart(2, "0")} · {stage.label}
                  </span>
                  <p className="mt-3 text-2xl font-semibold text-offwhite-50">{stage.title}</p>
                  <p className="mt-3 max-w-md text-slate-300">{stage.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex gap-2">
              {STAGES.map((stage, index) => (
                <div
                  key={stage.label}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    index <= activeStage ? "bg-solar-500" : "bg-white/10"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 lg:aspect-auto lg:h-[70vh]">
            <Image
              src="/stock/hibrido.jpg"
              alt="Painéis solares em telhado industrial ao entardecer, representando geração e gestão inteligente de energia"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "30% 55%" }}
            />
            {STAGES.map((stage, index) => (
              <div
                key={stage.label}
                data-stage-overlay
                className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent p-6"
                style={{ opacity: index === 0 ? 1 : 0 }}
              >
                <span className="rounded-full border border-solar-500/40 bg-navy-950/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-solar-400">
                  {stage.label}
                </span>
                <div className="rounded-xl border border-white/10 bg-navy-950/70 p-2">
                  <StageDiagram stageIndex={index} />
                </div>
              </div>
            ))}
          </div>

          <div className={`flex flex-col gap-6 ${reducedMotion ? "" : "lg:hidden"}`}>
            {STAGES.map((stage, index) => (
              <div key={stage.label} className="flex gap-4 border-l-2 border-solar-500/40 pl-5">
                <div className="flex-1">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-solar-500">
                    {String(index + 1).padStart(2, "0")} · {stage.label}
                  </span>
                  <p className="mt-2 text-lg font-semibold text-offwhite-50">{stage.title}</p>
                  <p className="mt-2 text-sm text-slate-300">{stage.description}</p>
                </div>
                <div className="shrink-0 self-start rounded-xl border border-white/10 bg-white/[0.03] p-1.5">
                  <StageDiagram stageIndex={index} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
