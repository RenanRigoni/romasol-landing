export function ProofBar() {
  return (
    <section className="border-b border-white/[0.06] bg-navy-950 py-7">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-y-3 px-6 text-center sm:flex-row sm:justify-center sm:gap-x-3 sm:text-left">
        <ProofItem accent="+1.000" text="projetos concluídos desde 2015" />
        <Divider />
        <ProofItem accent="Uberlândia + Catalão" text="e mais de 25 cidades da região" />
        <Divider />
        <ProofItem accent="Melhores 2026" text="reconhecimento TOP 100" />
      </div>
    </section>
  );
}

function ProofItem({ accent, text }: { accent: string; text: string }) {
  return (
    <p className="text-sm text-offwhite-100/80">
      <span className="font-semibold text-solar-400">{accent}</span>{" "}
      <span>{text}</span>
    </p>
  );
}

function Divider() {
  return <span className="hidden text-slate-600 sm:inline">·</span>;
}
