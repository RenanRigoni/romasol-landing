"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { FEATURED_PROJECT_CASES, SECONDARY_PROJECT_CASES } from "@/content/projects";
import { formatCurrencyBRL, formatInteger, formatKwp } from "@/lib/format";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { trackEvent } from "@/lib/analytics";
import { ensureGsapRegistered, prefersReducedMotion, useReducedMotion } from "@/lib/gsap";

export function ProjectShowcase() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const gsap = ensureGsapRegistered();
      if (prefersReducedMotion()) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current;
        if (!track) return;

        const leftInset = track.getBoundingClientRect().left;
        const scrollDistance = track.scrollWidth - window.innerWidth + leftInset * 2;

        const tween = gsap.to(track, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            scrub: 0.6,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      id="projetos"
      ref={rootRef}
      className={`relative overflow-hidden bg-navy-950 py-24 ${
        reducedMotion ? "" : "lg:h-screen lg:py-0"
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-6">
        <SectionHeading
          eyebrow="Projetos realizados"
          title="Resultado real, documentado por projeto."
          description="Números publicados de instalações concluídas pela Romasol, com painéis, potência e economia anual estimada."
        />

        <div
          className={`mt-10 -mx-6 overflow-x-auto px-6 ${reducedMotion ? "" : "lg:overflow-visible"}`}
        >
          <div
            ref={trackRef}
            className="flex gap-6 lg:w-max"
          >
            {FEATURED_PROJECT_CASES.map((project, index) => (
              <Reveal key={project.name} delay={index * 0.04} className="shrink-0">
                <div
                  className="group h-full w-[78vw] max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] sm:w-80 lg:w-[360px]"
                  onMouseEnter={() => trackEvent("project_case_viewed", { project: project.name })}
                >
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`Instalação fotovoltaica real — ${project.name}`}
                      width={600}
                      height={600}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col gap-3 p-6">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-lg font-semibold text-offwhite-50">
                        {project.name}
                      </h3>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-300">
                        {project.segment}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-center">
                      <Metric label="Painéis" value={formatInteger(project.panelCount)} />
                      <Metric label="Potência" value={formatKwp(project.installedPowerKwp)} />
                      <Metric
                        label="Economia/ano"
                        value={formatCurrencyBRL(project.annualSavingsBRL)}
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-10">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Mais projetos concluídos
            </p>
            <div className="scrollbar-none flex gap-4 overflow-x-auto pb-2">
              {SECONDARY_PROJECT_CASES.map((project) => (
                <div
                  key={project.name}
                  className="w-48 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
                >
                  <div className="relative aspect-square w-full">
                    <Image
                      src={project.image}
                      alt={`Instalação fotovoltaica real — ${project.name}`}
                      width={260}
                      height={260}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="truncate text-sm font-semibold text-offwhite-50">{project.name}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      {formatInteger(project.panelCount)} painéis · {formatKwp(project.installedPowerKwp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-semibold text-solar-400">{value}</span>
      <span className="text-[11px] uppercase tracking-wide text-slate-400">{label}</span>
    </div>
  );
}
