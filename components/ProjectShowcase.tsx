"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import {
  FEATURED_PROJECT_CASES,
  SECONDARY_PROJECT_CASES,
  type ProjectCase,
} from "@/content/projects";
import { formatCurrencyBRL, formatInteger, formatKwp } from "@/lib/format";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { trackEvent } from "@/lib/analytics";
import { ensureGsapRegistered, prefersReducedMotion, ScrollTrigger, useReducedMotion } from "@/lib/gsap";
import { withBasePath } from "@/lib/basePath";

const PINNED_PROJECTS = FEATURED_PROJECT_CASES.slice(0, 4);
const GRID_PROJECTS = [...FEATURED_PROJECT_CASES.slice(4), ...SECONDARY_PROJECT_CASES];

export function ProjectShowcase() {
  const rootRef = useRef<HTMLElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const gsap = ensureGsapRegistered();
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const steps = PINNED_PROJECTS.length;

        const trigger = ScrollTrigger.create({
          trigger: rootRef.current,
          start: "top top",
          end: () => `+=${(steps - 1) * window.innerHeight * 0.7}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressFillRef.current) {
              progressFillRef.current.style.transform = `scaleX(${self.progress})`;
            }
            const nextIndex = Math.min(steps - 1, Math.floor(self.progress * steps));
            setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
          },
        });

        return () => trigger.kill();
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <>
      <section
        id="projetos"
        ref={rootRef}
        className={`relative bg-navy-950 ${reducedMotion ? "py-24" : "py-24 lg:py-0"}`}
      >
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className={reducedMotion ? "" : "lg:hidden"}>
            <SectionHeading
              eyebrow="Projetos realizados"
              title="Resultado real, documentado por projeto."
              description="Números publicados de instalações concluídas pela Romasol, com painéis, potência e economia anual estimada."
            />
          </Reveal>

          {reducedMotion ? null : (
            <div className="hidden lg:flex lg:min-h-[100svh] lg:items-center">
              <div className="grid w-full grid-cols-[0.85fr_1.15fr] items-center gap-16">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-solar-400">
                    Projetos realizados
                  </p>
                  <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-offwhite-50 lg:text-5xl">
                    Resultado real, documentado por projeto.
                  </h2>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-slate-300">
                    Números publicados de instalações concluídas pela Romasol, com painéis,
                    potência e economia anual estimada.
                  </p>

                  <div className="mt-12">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-3xl font-semibold text-offwhite-50">
                        {String(activeIndex + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-slate-400">
                        / {String(PINNED_PROJECTS.length).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="relative mt-4 h-1 w-48 overflow-hidden rounded-full bg-white/10">
                      <div
                        ref={progressFillRef}
                        className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-solar-500"
                        style={{ transform: "scaleX(0)" }}
                      />
                    </div>
                    <div className="mt-5 flex gap-2" aria-hidden="true">
                      {PINNED_PROJECTS.map((project, index) => (
                        <span
                          key={project.name}
                          className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                            index === activeIndex ? "bg-solar-400" : "bg-white/10"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative h-[clamp(520px,68svh,780px)] w-full overflow-hidden rounded-3xl border border-white/10">
                  {PINNED_PROJECTS.map((project, index) => (
                    <div
                      key={project.name}
                      className="absolute inset-0 transition-opacity duration-700 ease-out"
                      style={{
                        opacity: index === activeIndex ? 1 : 0,
                        pointerEvents: index === activeIndex ? "auto" : "none",
                      }}
                      aria-hidden={index !== activeIndex}
                      onMouseEnter={() =>
                        index === activeIndex &&
                        trackEvent("project_case_viewed", { project: project.name })
                      }
                    >
                      <Image
                        src={withBasePath(project.image)}
                        alt={`Instalação fotovoltaica real — ${project.name}`}
                        fill
                        sizes="(min-width: 1024px) 55vw, 90vw"
                        className="object-cover"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/10 to-transparent"
                        aria-hidden="true"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-8">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-display text-2xl font-semibold text-offwhite-50 sm:text-3xl">
                            {project.name}
                          </h3>
                          <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">
                            {project.segment}
                          </span>
                        </div>
                        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/15 pt-5">
                          <Metric label="Painéis" value={formatInteger(project.panelCount)} />
                          <Metric label="Potência" value={formatKwp(project.installedPowerKwp)} />
                          <Metric
                            label="Economia/ano"
                            value={formatCurrencyBRL(project.annualSavingsBRL)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className={reducedMotion ? "mt-10" : "mt-10 lg:hidden"}>
            <div className="flex flex-col gap-6">
              {PINNED_PROJECTS.map((project) => (
                <StaticProjectCard key={project.name} project={project} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="relative bg-navy-950 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal delay={0.15}>
            <div className="pt-10">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
                Mais projetos concluídos
              </p>
              <div className="scrollbar-none flex gap-4 overflow-x-auto pb-2">
                {GRID_PROJECTS.map((project) => (
                  <div
                    key={project.name}
                    className="w-48 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
                  >
                    <div className="relative aspect-square w-full">
                      <Image
                        src={withBasePath(project.image)}
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
      </div>
    </>
  );
}

function StaticProjectCard({ project }: { project: ProjectCase }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02]">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={withBasePath(project.image)}
          alt={`Instalação fotovoltaica real — ${project.name}`}
          fill
          sizes="90vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-offwhite-50">{project.name}</h3>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-300">
            {project.segment}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-center">
          <Metric label="Painéis" value={formatInteger(project.panelCount)} />
          <Metric label="Potência" value={formatKwp(project.installedPowerKwp)} />
          <Metric label="Economia/ano" value={formatCurrencyBRL(project.annualSavingsBRL)} />
        </div>
      </div>
    </div>
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
