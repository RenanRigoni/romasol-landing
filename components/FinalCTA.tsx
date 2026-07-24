import { REGIONS } from "@/lib/cities";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { LeadForm } from "./LeadForm";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-navy-900/60 py-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 60% at 85% 15%, rgba(245,179,1,0.08), transparent 65%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <div className="flex flex-col gap-8">
              <SectionHeading
                title="Fale com a Romasol e receba uma análise personalizada."
                description="Engenharia própria, mais de 1.000 projetos concluídos desde 2015 e atendimento direto com nossa equipe técnica."
              />

              <div>
                <Button
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                >
                  Falar no WhatsApp agora
                </Button>
              </div>

              <div className="border-t border-white/10 pt-8">
                <p className="text-sm font-semibold uppercase tracking-wide text-solar-400">
                  Onde atendemos
                </p>
                <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {REGIONS.map((region) => (
                    <div key={region.hub}>
                      <p className="font-display font-semibold text-offwhite-50">
                        {region.hub} / {region.state}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-300">
                        {region.cities.join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-slate-400">
                  Atendemos Uberlândia (MG), Catalão (GO) e as cidades da região listadas acima.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <p className="font-display text-lg font-semibold text-offwhite-50">
                Prefere que a gente te chame?
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Preencha os dados e vamos abrir o WhatsApp com o resumo pronto.
              </p>
              <div className="mt-6">
                <LeadForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
