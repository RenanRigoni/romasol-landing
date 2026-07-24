import Image from "next/image";
import { Reveal } from "./ui/Reveal";
import { withBasePath } from "@/lib/basePath";

const CLIENT_LOGOS = [
  { file: "cliente-01", name: "Soberana" },
  { file: "cliente-02", name: "Gráfica Gaia" },
  { file: "cliente-03", name: "Supermercado Tigrão" },
  { file: "cliente-04", name: "Nexus" },
  { file: "cliente-05", name: "cliente Romasol" },
  { file: "cliente-06", name: "Sattva Controladoria" },
  { file: "cliente-07", name: "Uai Grill" },
  { file: "cliente-08", name: "Bild" },
  { file: "cliente-09", name: "Vitta Residencial" },
  { file: "cliente-10", name: "Fases Medical Center" },
  { file: "cliente-11", name: "Dunateli Linguiçaria" },
  { file: "cliente-12", name: "Adufu" },
];

const BANK_LOGOS: { file: string; name: string; needsChip?: boolean }[] = [
  { file: "banco-01", name: "Caixa" },
  { file: "banco-02", name: "Bradesco" },
  { file: "banco-03", name: "Sol Agora", needsChip: true },
  { file: "banco-04", name: "Sicredi" },
  { file: "banco-05", name: "Solfácil", needsChip: true },
  { file: "banco-06", name: "Banco do Brasil", needsChip: true },
  { file: "banco-07", name: "BTG Pactual", needsChip: true },
  { file: "banco-08", name: "Santander" },
  { file: "banco-09", name: "Solplace" },
  { file: "banco-10", name: "Sicoob", needsChip: true },
  { file: "banco-11", name: "BV", needsChip: true },
  { file: "banco-12", name: "Credsolaris", needsChip: true },
];

function LogoTile({
  src,
  alt,
  needsChip = false,
}: {
  src: string;
  alt: string;
  needsChip?: boolean;
}) {
  const image = (
    <Image
      src={withBasePath(src)}
      alt={alt}
      width={200}
      height={120}
      className="h-full w-full object-contain"
    />
  );

  return (
    <div className="flex h-20 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] p-3">
      {needsChip ? (
        <div className="flex h-full w-full items-center justify-center rounded-md bg-offwhite-50 p-2">
          {image}
        </div>
      ) : (
        image
      )}
    </div>
  );
}

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
            <div className="lg:pr-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-solar-500">
                Empresas que já escolheram a Romasol
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {CLIENT_LOGOS.map((logo) => (
                  <LogoTile
                    key={logo.file}
                    src={`/brand/clientes/${logo.file}.png`}
                    alt={`Logo ${logo.name}`}
                  />
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="lg:pl-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-solar-500">
                Instituições que podem viabilizar o investimento
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {BANK_LOGOS.map((logo) => (
                  <LogoTile
                    key={logo.file}
                    src={`/brand/bancos/${logo.file}.png`}
                    alt={`Logo ${logo.name}`}
                    needsChip={logo.needsChip}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
