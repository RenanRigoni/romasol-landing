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

const BANK_LOGOS: { file: string; name: string; tone: "light" | "dark" }[] = [
  { file: "banco-01", name: "Caixa", tone: "dark" },
  { file: "banco-02", name: "Bradesco", tone: "dark" },
  { file: "banco-03", name: "Sol Agora", tone: "light" },
  { file: "banco-04", name: "Sicredi", tone: "dark" },
  { file: "banco-05", name: "Solfácil", tone: "light" },
  { file: "banco-06", name: "Banco do Brasil", tone: "light" },
  { file: "banco-07", name: "BTG Pactual", tone: "light" },
  { file: "banco-08", name: "Santander", tone: "dark" },
  { file: "banco-09", name: "Solplace", tone: "dark" },
  { file: "banco-10", name: "Sicoob", tone: "light" },
  { file: "banco-11", name: "BV", tone: "light" },
  { file: "banco-12", name: "Credsolaris", tone: "light" },
];

function LogoTile({
  src,
  alt,
  tone = "dark",
}: {
  src: string;
  alt: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={`flex h-20 items-center justify-center rounded-xl border p-3 ${
        tone === "light"
          ? "border-white/10 bg-offwhite-50"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <Image
        src={withBasePath(src)}
        alt={alt}
        width={200}
        height={120}
        className="h-full w-full object-contain"
      />
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
                    tone={logo.tone}
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
