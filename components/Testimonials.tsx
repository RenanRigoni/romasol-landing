import { TESTIMONIALS } from "@/content/testimonials";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

export function Testimonials() {
  const featured =
    TESTIMONIALS.find((testimonial) => testimonial.name === "Sattva Controladoria") ??
    TESTIMONIALS[0];
  const supporting = TESTIMONIALS.filter((testimonial) => testimonial !== featured);

  return (
    <section className="overflow-hidden bg-navy-900/60 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading title="O que dizem os clientes da Romasol." />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-[3fr_2fr] lg:gap-20">
          <Reveal>
            <div className="relative">
              <span
                className="pointer-events-none absolute -left-2 -top-10 select-none font-display text-[6rem] leading-none text-white/[0.05] sm:-top-14 sm:text-[8rem] lg:-top-16 lg:text-[9rem]"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <div className="relative border-t border-white/10 pt-7">
                <p className="font-display text-2xl leading-snug text-offwhite-50 sm:text-3xl md:text-[2.25rem] md:leading-[1.2]">
                  &ldquo;{featured.quote}&rdquo;
                </p>
                <div className="mt-6 flex flex-col gap-1">
                  <p className="text-sm font-semibold text-solar-400">
                    {featured.name}
                    <span className="ml-2 font-normal text-slate-400">{featured.city}</span>
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                    Avaliação publicada por cliente
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-12">
            {supporting.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={0.15 + index * 0.1}>
                <div className="border-t border-white/10 pt-6">
                  <p
                    className={`font-display leading-snug text-offwhite-50 ${
                      testimonial.quote.length < 60 ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
                    }`}
                  >
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="mt-4 flex flex-col gap-1">
                    <p className="text-sm font-semibold text-solar-400">
                      {testimonial.name}
                      <span className="ml-2 font-normal text-slate-400">{testimonial.city}</span>
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                      Avaliação publicada por cliente
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
