import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const TECH_ITEMS = [
  {
    label: "Equipamentos WEG",
    description: "Módulos e inversores WEG utilizados em todos os projetos Romasol.",
  },
  {
    label: "Proteção elétrica",
    description: "Componentes de proteção elétrica dimensionados por instalação.",
  },
  {
    label: "Monitoramento remoto",
    description: "Acompanhamento da geração em tempo real, via aplicativo.",
  },
  {
    label: "Garantias",
    description: "Garantia de fábrica por componente, detalhada na proposta técnica.",
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
          <div className="mt-8 grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0 lg:divide-x lg:divide-white/10">
            {TECH_ITEMS.map((item) => (
              <div key={item.label} className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                <p className="font-display text-lg font-semibold text-offwhite-50">
                  {item.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-10 border-t border-white/10 pt-10 sm:grid sm:grid-cols-[1fr_auto] sm:items-center sm:gap-10">
            <p className="text-sm text-slate-300">
              Cada etapa é conduzida por engenharia própria, do diagnóstico ao suporte
              pós-instalação.
            </p>
            <Button
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="mt-5 shrink-0 sm:mt-0"
            >
              Falar com nossa equipe técnica
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
