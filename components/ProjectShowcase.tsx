"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import { PROJECT_CASES } from "@/content/projects";
import { formatCurrencyBRL, formatInteger, formatKwp } from "@/lib/format";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { trackEvent } from "@/lib/analytics";
import { withBasePath } from "@/lib/basePath";

export function ProjectShowcase() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
    setSlideCount(api.scrollSnapList().length);
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sincroniza estado inicial do Embla no mount (padrão oficial da lib)
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="projetos" className="bg-navy-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Projetos realizados"
            title="Resultado real, documentado por projeto."
            description="Números publicados de instalações concluídas pela Romasol, com painéis, potência e economia anual estimada."
          />
        </Reveal>

        <div className="relative mt-10">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {PROJECT_CASES.map((project, index) => (
                <div
                  key={project.name}
                  className="min-w-0 shrink-0 grow-0 basis-[78vw] max-w-sm sm:basis-80 lg:basis-[360px]"
                >
                  <Reveal delay={Math.min(index, 4) * 0.04}>
                    <div
                      className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02]"
                      onMouseEnter={() => trackEvent("project_case_viewed", { project: project.name })}
                    >
                      <div className="relative aspect-square w-full overflow-hidden lg:aspect-[3/2]">
                        <Image
                          src={withBasePath(project.image)}
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
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Projeto anterior"
            className="absolute left-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-navy-950/80 text-offwhite-50 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solar-500 disabled:pointer-events-none disabled:opacity-30 sm:flex"
          >
            <ChevronIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Próximo projeto"
            className="absolute right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-navy-950/80 text-offwhite-50 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solar-500 disabled:pointer-events-none disabled:opacity-30 sm:flex"
          >
            <ChevronIcon direction="right" />
          </button>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <span className="shrink-0 font-display text-sm font-semibold text-offwhite-50">
            {String(selectedIndex + 1).padStart(2, "0")}
            <span className="text-slate-400"> / {String(slideCount).padStart(2, "0")}</span>
          </span>
          <div className="flex flex-1 gap-1.5" aria-hidden="true">
            {Array.from({ length: slideCount }).map((_, index) => (
              <span
                key={index}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  index === selectedIndex ? "bg-solar-500" : "bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={`h-4 w-4 ${direction === "left" ? "" : "rotate-180"}`}
      aria-hidden="true"
    >
      <path
        d="M15 5l-7 7 7 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
