"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { ensureGsapRegistered, prefersReducedMotion, useReducedMotion } from "@/lib/gsap";
import { withBasePath } from "@/lib/basePath";

const STAGES = [
  {
    label: "Gerar",
    status: "Gerando energia",
    title: "O sistema capta energia solar durante o dia.",
    description: "Os módulos fotovoltaicos convertem luz solar em energia elétrica para a casa, empresa ou propriedade rural.",
    filter: "saturate(1.15) brightness(1.05)",
    wash: "radial-gradient(65% 55% at 50% 15%, rgba(245,179,1,0.30), transparent 70%)",
  },
  {
    label: "Armazenar",
    status: "Armazenando reserva",
    title: "O excedente pode ser armazenado em baterias.",
    description: "Em projetos híbridos, a energia gerada além do consumo imediato fica disponível para uso posterior.",
    filter: "saturate(0.9) hue-rotate(-8deg) brightness(0.82) contrast(1.05)",
    wash: "radial-gradient(60% 55% at 78% 60%, rgba(92,130,255,0.32), transparent 70%)",
  },
  {
    label: "Gerenciar",
    status: "Gerenciando fluxo",
    title: "Inversores equilibram geração, consumo e bateria.",
    description: "O sistema monitora em tempo real de onde vem e para onde vai cada parte da energia produzida.",
    filter: "saturate(1) brightness(0.9) contrast(1.12)",
    wash: "radial-gradient(70% 60% at 50% 55%, rgba(92,130,255,0.22), transparent 70%)",
  },
  {
    label: "Decidir automaticamente",
    status: "Decidindo automaticamente",
    title: "A fonte mais eficiente é priorizada a cada momento.",
    description: "Rede, geração solar e bateria trabalham juntas sem exigir intervenção manual do usuário.",
    filter: "saturate(1.2) brightness(0.88) contrast(1.18)",
    wash: "radial-gradient(65% 55% at 30% 65%, rgba(245,179,1,0.26), transparent 70%)",
  },
];

function StageDiagram({ stageIndex, size = 56 }: { stageIndex: number; size?: number }) {
  const style = { width: size, height: size };

  if (stageIndex === 0) {
    return (
      <svg viewBox="0 0 64 64" style={style} fill="none" aria-hidden="true">
        <circle cx="32" cy="20" r="7" stroke="#F5B301" strokeWidth="1.5" />
        <path d="M32 6v4M32 30v4M18 20h4M46 20h4M22 10l3 3M42 10l-3 3" stroke="#F5B301" strokeWidth="1.5" />
        <path d="M8 52 L26 52 L30 44 L38 44 L42 52 L56 52" stroke="#5c82ff" strokeWidth="1.2" strokeDasharray="3 4" />
      </svg>
    );
  }
  if (stageIndex === 1) {
    return (
      <svg viewBox="0 0 64 64" style={style} fill="none" aria-hidden="true">
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
      <svg viewBox="0 0 64 64" style={style} fill="none" aria-hidden="true">
        <circle cx="14" cy="16" r="5" stroke="#F5B301" strokeWidth="1.4" />
        <circle cx="14" cy="48" r="5" stroke="#5c82ff" strokeWidth="1.4" />
        <circle cx="50" cy="32" r="6" stroke="#F5B301" strokeWidth="1.4" />
        <path d="M18 19 L45 30M18 45 L45 34" stroke="#5c82ff" strokeWidth="1.2" strokeDasharray="2 4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" style={style} fill="none" aria-hidden="true">
      <circle cx="10" cy="32" r="3.5" fill="#F5B301" />
      <path d="M13 32 L28 32" stroke="#F5B301" strokeWidth="1.5" />
      <path d="M28 32 L46 14" stroke="#5c82ff" strokeWidth="1.2" strokeDasharray="2 4" opacity="0.5" />
      <path d="M28 32 L46 32" stroke="#F5B301" strokeWidth="1.5" />
      <path d="M28 32 L46 50" stroke="#5c82ff" strokeWidth="1.2" strokeDasharray="2 4" opacity="0.5" />
      <circle cx="49" cy="32" r="3" fill="#F5B301" />
    </svg>
  );
}

function StageOverlayArt({ stageIndex }: { stageIndex: number }) {
  if (stageIndex === 0) {
    return (
      <svg viewBox="0 0 300 400" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
        <circle cx="150" cy="90" r="26" stroke="#F5B301" strokeWidth="2" opacity="0.9" />
        <path
          d="M150 34v14M150 132v14M94 90h14M192 90h14M111 51l10 10M179 51l-10 10M111 129l10-10M179 129l-10 10"
          stroke="#F5B301"
          strokeWidth="2"
          opacity="0.9"
        />
        <path d="M60 200 L110 200 M150 220 L200 220 M90 240 L140 240 M170 260 L230 260" stroke="#F5B301" strokeWidth="1.2" strokeDasharray="2 6" opacity="0.55" />
      </svg>
    );
  }
  if (stageIndex === 1) {
    return (
      <svg viewBox="0 0 300 400" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
        <rect x="196" y="150" width="68" height="120" rx="6" stroke="#5c82ff" strokeWidth="2" opacity="0.9" />
        <rect x="220" y="138" width="20" height="12" rx="2" fill="#5c82ff" opacity="0.9" />
        <rect x="203" y="228" width="54" height="35" fill="#F5B301" opacity="0.8" />
        <rect x="203" y="193" width="54" height="30" fill="#F5B301" opacity="0.5" />
        <rect x="203" y="158" width="54" height="30" fill="none" stroke="#F5B301" strokeWidth="1" opacity="0.35" />
      </svg>
    );
  }
  if (stageIndex === 2) {
    return (
      <svg viewBox="0 0 300 400" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
        <circle cx="70" cy="120" r="15" stroke="#F5B301" strokeWidth="2" opacity="0.9" />
        <circle cx="70" cy="270" r="15" stroke="#5c82ff" strokeWidth="2" opacity="0.9" />
        <circle cx="220" cy="195" r="18" stroke="#F5B301" strokeWidth="2" opacity="0.9" />
        <path d="M85 130 L205 185 M85 260 L205 205" stroke="#5c82ff" strokeWidth="1.4" strokeDasharray="3 6" opacity="0.6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 300 400" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
      <circle cx="50" cy="230" r="6" fill="#F5B301" />
      <path d="M56 230 L120 230" stroke="#F5B301" strokeWidth="2.2" />
      <path d="M120 230 L210 150" stroke="#5c82ff" strokeWidth="1.2" strokeDasharray="2 6" opacity="0.4" />
      <path d="M120 230 L210 230" stroke="#F5B301" strokeWidth="2.2" />
      <path d="M120 230 L210 310" stroke="#5c82ff" strokeWidth="1.2" strokeDasharray="2 6" opacity="0.4" />
      <circle cx="216" cy="230" r="8" fill="#F5B301" />
    </svg>
  );
}

export function HybridEnergyScroll() {
  const rootRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const gsap = ensureGsapRegistered();
      if (prefersReducedMotion()) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-stage-panel]");
        const icons = gsap.utils.toArray<HTMLElement>("[data-stage-icon]");
        const arts = gsap.utils.toArray<HTMLElement>("[data-stage-art]");
        const washes = gsap.utils.toArray<HTMLElement>("[data-stage-wash]");
        const statuses = gsap.utils.toArray<HTMLElement>("[data-stage-status]");

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

        if (imageRef.current) {
          STAGES.forEach((stage, index) => {
            if (index === 0) return;
            tl.to(imageRef.current, { filter: stage.filter, duration: 0.4 }, index - 0.1);
          });
        }

        const crossfadeGroups = [panels, icons, arts, washes, statuses];
        crossfadeGroups.forEach((group) => {
          group.forEach((el, index) => {
            if (index === 0) return;
            tl.to(group[index - 1], { autoAlpha: 0, duration: 0.35 }, index - 0.1).fromTo(
              el,
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.35 },
              index - 0.1,
            );
          });
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
            <p className="font-display text-2xl font-semibold leading-[1.15] tracking-tight text-offwhite-50/70">
              Não é apenas gerar energia. É gerenciar inteligência energética.
            </p>

            <div className="relative mt-8 h-48">
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
                  <p className="mt-2 font-display text-3xl font-semibold leading-tight text-offwhite-50 xl:text-4xl">
                    {stage.title}
                  </p>
                  <p className="mt-3 max-w-md text-slate-300">{stage.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-2">
              {STAGES.map((stage, index) => (
                <div
                  key={stage.label}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    index <= activeStage ? "bg-solar-500" : "bg-white/10"
                  }`}
                />
              ))}
            </div>

            <div className="relative mt-5 h-14">
              {STAGES.map((stage, index) => (
                <div
                  key={stage.label}
                  data-stage-icon
                  className="absolute inset-0 flex items-center gap-3"
                  style={{ opacity: index === 0 ? 1 : 0 }}
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                    <StageDiagram stageIndex={index} size={36} />
                  </div>
                  <span className="text-sm font-semibold uppercase tracking-[0.15em] text-solar-400">
                    Etapa atual · {stage.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 lg:aspect-auto lg:h-[70vh]">
            <Image
              ref={imageRef}
              src={withBasePath("/stock/hibrido.jpg")}
              alt="Painéis solares em telhado industrial ao entardecer, representando geração e gestão inteligente de energia"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "30% 55%", filter: STAGES[0].filter }}
            />

            {STAGES.map((stage, index) => (
              <div
                key={stage.label}
                data-stage-wash
                className="absolute inset-0"
                style={{ background: stage.wash, opacity: index === 0 ? 1 : 0 }}
                aria-hidden="true"
              />
            ))}

            {STAGES.map((stage, index) => (
              <div
                key={stage.label}
                data-stage-art
                className="absolute inset-0 opacity-[0.55]"
                style={{ opacity: index === 0 ? 0.55 : 0 }}
              >
                <StageOverlayArt stageIndex={index} />
              </div>
            ))}

            <div
              className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-navy-950/10 to-transparent"
              aria-hidden="true"
            />

            {STAGES.map((stage, index) => (
              <div
                key={stage.label}
                data-stage-status
                className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full border border-solar-500/40 bg-navy-950/70 px-4 py-1.5"
                style={{ opacity: index === 0 ? 1 : 0 }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-solar-400" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-wide text-solar-400">
                  {stage.status}
                </span>
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
