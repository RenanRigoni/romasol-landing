import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const TECH_ITEMS = [
  {
    label: "Equipamentos WEG",
    description: "Módulos e inversores WEG utilizados nos projetos Romasol.",
  },
  {
    label: "Proteção elétrica",
    description: "Componentes de proteção dimensionados para cada instalação.",
  },
  {
    label: "Monitoramento remoto",
    description: "Acompanhamento da geração via aplicativo.",
  },
  {
    label: "Garantias",
    description: "Garantia de fábrica por componente, conforme a proposta técnica.",
  },
];

export function TechnologyStrip() {
  return (
    <section className="bg-navy-900/60 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-solar-500">
            Tecnologia que acompanha cada etapa
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-7 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
            {TECH_ITEMS.map((item) => (
              <div key={item.label}>
                <p className="font-display text-base font-semibold text-offwhite-50">
                  {item.label}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-12 flex flex-col items-start gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm text-slate-300">
              Cada etapa é conduzida por engenharia própria, do diagnóstico ao suporte
              pós-instalação.
            </p>
            <Button
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="shrink-0"
            >
              Falar com nossa equipe técnica
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
