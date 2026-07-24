type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";
  const titleColor = tone === "light" ? "text-offwhite-50" : "text-ink-900";
  const descColor = tone === "light" ? "text-slate-300" : "text-ink-900/70";

  return (
    <div className={`flex flex-col gap-4 max-w-2xl ${alignClass}`}>
      {eyebrow ? (
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-solar-500">
          {eyebrow}
        </span>
      ) : null}
      <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.1] tracking-tight ${titleColor}`}>
        {title}
      </h2>
      {description ? (
        <p className={`text-base sm:text-lg leading-relaxed ${descColor}`}>{description}</p>
      ) : null}
    </div>
  );
}
