"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { BASE_PATH, withBasePath } from "@/lib/basePath";

const NAV_LINKS = [
  { href: `${BASE_PATH}/#projetos`, label: "Projetos" },
  { href: `${BASE_PATH}/#solucoes`, label: "Soluções" },
  { href: `${BASE_PATH}/#calculadora`, label: "Calculadora" },
  { href: `${BASE_PATH}/#engenharia`, label: "Engenharia" },
  { href: `${BASE_PATH}/#faq`, label: "FAQ" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-navy-950/90 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href={`${BASE_PATH}/#topo`} className="flex items-center gap-2" aria-label="Romasol — página inicial">
          <Image
            src={withBasePath("/brand/logo-romasol.png")}
            alt="Romasol Engenharia e Energia Solar"
            width={140}
            height={94}
            className="h-10 w-auto sm:h-12"
            priority
          />
        </a>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-offwhite-50/85 transition-colors hover:text-solar-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="text-sm"
            onClick={() => trackEvent("whatsapp_click", { location: "header" })}
          >
            Simular no WhatsApp
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span
            className={`block h-0.5 w-6 bg-offwhite-50 transition-transform ${
              isMenuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-offwhite-50 transition-opacity ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-offwhite-50 transition-transform ${
              isMenuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {isMenuOpen ? (
        <div className="lg:hidden fixed inset-0 top-[64px] z-40 bg-navy-950 px-6 py-8 flex flex-col gap-6">
          <nav className="flex flex-col gap-5" aria-label="Navegação móvel">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-lg font-medium text-offwhite-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <Button
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="mt-auto w-full"
            onClick={() => {
              trackEvent("whatsapp_click", { location: "header_mobile" });
              setIsMenuOpen(false);
            }}
          >
            Simular no WhatsApp
          </Button>
        </div>
      ) : null}
    </header>
  );
}
