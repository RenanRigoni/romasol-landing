"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/Button";
import { WHATSAPP_DISPLAY_NUMBER, buildWhatsAppUrl } from "@/lib/whatsapp";
import { REGIONS } from "@/lib/cities";
import { useAppState } from "./AppStateProvider";
import { BASE_PATH, withBasePath } from "@/lib/basePath";

const NAV_LINKS = [
  { href: `${BASE_PATH}/#projetos`, label: "Projetos" },
  { href: `${BASE_PATH}/#solucoes`, label: "Soluções" },
  { href: `${BASE_PATH}/#calculadora`, label: "Calculadora" },
  { href: `${BASE_PATH}/#engenharia`, label: "Engenharia" },
  { href: `${BASE_PATH}/#faq`, label: "FAQ" },
];

const SOLUTIONS = ["Residencial", "Comercial", "Industrial", "Rural"];

const INSTAGRAM_URL = "https://www.instagram.com/gruporomasol/";

export function Footer() {
  const { profile, city, monthlyBill, estimate } = useAppState();
  const ctaHref = buildWhatsAppUrl({ profile, city, monthlyBill, estimate });

  return (
    <footer className="bg-navy-950">
      <div className="border-b border-white/10 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight text-offwhite-50 sm:text-3xl">
                Pronto para entender quanto seu projeto pode economizar?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-300">
                Receba uma análise inicial baseada no seu consumo e perfil de instalação.
              </p>
            </div>
            <Button
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              className="shrink-0"
            >
              Receber uma simulação personalizada
            </Button>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr] lg:gap-10">
            <div className="flex flex-col gap-5">
              <Image
                src={withBasePath("/brand/logo-romasol.png")}
                alt="Romasol Engenharia e Energia Solar"
                width={1024}
                height={684}
                className="h-16 w-auto self-start"
              />
              <p className="max-w-xs text-base leading-relaxed text-slate-300">
                Engenharia e energia solar para residências, empresas, indústrias e propriedades
                rurais.
              </p>
              <div className="flex flex-col gap-2.5 text-base">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 transition-colors hover:text-solar-400"
                >
                  Instagram @gruporomasol
                </a>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 transition-colors hover:text-solar-400"
                >
                  WhatsApp: {WHATSAPP_DISPLAY_NUMBER}
                </a>
              </div>
            </div>

            <div>
              <p className="font-display text-base font-semibold text-offwhite-50">Navegação</p>
              <ul className="mt-5 flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-base text-slate-300 transition-colors hover:text-solar-400"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-display text-base font-semibold text-offwhite-50">Soluções</p>
              <ul className="mt-5 flex flex-col gap-3">
                {SOLUTIONS.map((solution) => (
                  <li key={solution}>
                    <a
                      href={`${BASE_PATH}/#solucoes`}
                      className="text-base text-slate-300 transition-colors hover:text-solar-400"
                    >
                      {solution}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-display text-base font-semibold text-offwhite-50">Atendimento</p>
              <ul className="mt-5 flex flex-col gap-3 text-base text-slate-300">
                {REGIONS.map((region) => (
                  <li key={region.hub}>
                    {region.hub} / {region.state}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center gap-4 border-t border-white/10 pt-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Romasol Engenharia e Energia Solar</p>
            <div className="flex items-center gap-6">
              <Link href="/politica-de-privacidade" className="transition-colors hover:text-solar-400">
                Política de Privacidade
              </Link>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-solar-400"
              >
                Instagram
              </a>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-solar-400"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
