"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { Button } from "./ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { ensureGsapRegistered, prefersReducedMotion } from "@/lib/gsap";
import { withBasePath } from "@/lib/basePath";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const gsap = ensureGsapRegistered();
      if (prefersReducedMotion()) return;

      const lines = contentRef.current?.querySelectorAll("[data-hero-line]");
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        imageRef.current,
        { scale: 1.12, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.6, ease: "power2.out" },
      );

      if (lines?.length) {
        tl.fromTo(
          lines,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12 },
          "-=1.1",
        );
      }

      gsap.to(imageRef.current, {
        scale: 1.14,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(contentRef.current, {
        y: -60,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to("[data-hero-overlay]", {
        opacity: 0.92,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      id="topo"
      ref={rootRef}
      className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden bg-navy-950"
    >
      <div ref={imageRef} className="absolute inset-0">
        <Image
          src={withBasePath("/cases/gaia.png")}
          alt="Instalação fotovoltaica real da Romasol — telhado da Gráfica Gaia visto do alto"
          fill
          priority
          sizes="100vw"
          className="object-cover grayscale contrast-125"
        />
      </div>

      <div
        data-hero-overlay
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,11,31,0.62) 0%, rgba(5,11,31,0.8) 45%, rgba(5,11,31,0.97) 100%), radial-gradient(120% 90% at 50% 30%, rgba(10,71,255,0.24), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(46% 40% at 50% 42%, rgba(5,11,31,0.6), transparent 72%)",
        }}
        aria-hidden="true"
      />

      <div
        ref={contentRef}
        className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-7 px-6 text-center"
      >
        <h1
          data-hero-line
          className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-offwhite-50 sm:text-5xl md:text-6xl lg:text-[4.25rem]"
        >
          Gere energia.{" "}
          <span className="text-solar-400">Construa patrimônio.</span>
        </h1>

        <p
          data-hero-line
          className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg"
        >
          Engenharia solar sob medida para residências, empresas, indústrias
          e propriedades rurais.
        </p>

        <div data-hero-line className="flex flex-col gap-4 sm:flex-row">
          <Button
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            onClick={() => trackEvent("hero_cta_click", { cta: "simular" })}
          >
            Simular minha economia
          </Button>
          <Button
            href="#projetos"
            variant="secondary"
            onClick={() => trackEvent("hero_cta_click", { cta: "ver_projetos" })}
          >
            Ver projetos realizados
          </Button>
        </div>
      </div>
    </section>
  );
}
