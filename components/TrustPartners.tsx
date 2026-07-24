import Image from "next/image";
import { Reveal } from "./ui/Reveal";
import { withBasePath } from "@/lib/basePath";

export function TrustPartners() {
  return (
    <section className="bg-navy-950 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="font-display max-w-xl text-2xl font-semibold leading-tight tracking-tight text-offwhite-50 sm:text-3xl">
            Quem confia e quem viabiliza os projetos Romasol.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-white/10">
          <Reveal delay={0.06}>
            <div className="lg:pr-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-solar-500">
                Empresas que confiam na Romasol
              </p>
              <div className="mt-6">
                <Image
                  src={withBasePath("/brand/clientes-parceiros.png")}
                  alt="Logos de empresas clientes da Romasol"
                  width={500}
                  height={500}
                  className="h-auto w-full max-w-sm"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="lg:pl-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-solar-500">
                Financiamento com instituições parceiras
              </p>
              <div className="mt-6 overflow-hidden rounded-2xl bg-offwhite-50 p-6">
                <Image
                  src={withBasePath("/brand/parceiros-financeiros.png")}
                  alt="Logos de instituições financeiras parceiras da Romasol"
                  width={500}
                  height={500}
                  className="h-auto w-full max-w-sm"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
