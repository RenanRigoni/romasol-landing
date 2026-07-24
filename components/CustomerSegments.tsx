"use client";

import Image from "next/image";
import { SEGMENTS } from "@/lib/segments";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { trackEvent } from "@/lib/analytics";
import { useAppState } from "./AppStateProvider";
import { withBasePath } from "@/lib/basePath";

export function CustomerSegments() {
  const { profile, setProfile } = useAppState();
  const activeId = profile ?? "residencial";
  const active = SEGMENTS.find((segment) => segment.id === activeId) ?? SEGMENTS[0];

  return (
    <section id="solucoes" className="bg-navy-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            title="Um projeto para cada tipo de consumo."
            description="Selecione seu perfil para ver o benefício mais relevante e ajustar a simulação abaixo."
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-3">
              {SEGMENTS.map((segment) => (
                <button
                  key={segment.id}
                  type="button"
                  onClick={() => {
                    setProfile(segment.id);
                    trackEvent("customer_profile_selected", { profile: segment.id });
                  }}
                  className={`rounded-full border px-5 py-3 text-sm font-semibold transition-colors ${
                    activeId === segment.id
                      ? "border-solar-500 bg-solar-500 text-navy-950"
                      : "border-white/15 text-offwhite-50/85 hover:border-white/30"
                  }`}
                  aria-pressed={activeId === segment.id}
                >
                  {segment.label}
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-solar-400">
                O desafio
              </p>
              <p className="mt-2 text-lg leading-relaxed text-offwhite-50">{active.problem}</p>
              <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-solar-400">
                O benefício
              </p>
              <p className="mt-2 leading-relaxed text-slate-300">{active.benefit}</p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative overflow-hidden rounded-3xl border border-white/10">
              <Image
                key={active.image}
                src={withBasePath(active.image)}
                alt={`Energia solar para o perfil ${active.label} (imagem ilustrativa)`}
                width={800}
                height={800}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
