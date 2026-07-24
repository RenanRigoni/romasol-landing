"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/content/faq";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const priorityItems = FAQ_ITEMS.filter((item) => item.priority);
  const secondaryItems = FAQ_ITEMS.filter((item) => !item.priority);
  const visibleItems = showAll ? FAQ_ITEMS : priorityItems;

  function toggle(index: number, question: string) {
    const isOpening = openIndex !== index;
    setOpenIndex(isOpening ? index : null);
    if (isOpening) {
      trackEvent("faq_opened", { question });
    }
  }

  return (
    <section id="faq" className="bg-navy-950 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.6fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-solar-500">
                Dúvidas frequentes
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-offwhite-50 sm:text-4xl">
                Perguntas antes de decidir.
              </h2>
              <p className="mt-4 max-w-sm text-slate-300">
                Reunimos as dúvidas mais comuns de quem está avaliando um projeto de energia
                solar com a Romasol.
              </p>
              <Button
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                className="mt-8 !px-0"
              >
                Ainda tem alguma dúvida? Fale com a equipe →
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col divide-y divide-white/10 border-t border-white/10">
              {visibleItems.map((item) => {
                const index = FAQ_ITEMS.indexOf(item);
                const isOpen = openIndex === index;
                return (
                  <div key={item.question}>
                    <h3>
                      <button
                        type="button"
                        onClick={() => toggle(index, item.question)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${index}`}
                        className="flex w-full items-center justify-between gap-6 py-6 text-left"
                      >
                        <span
                          className={`text-base transition-colors duration-200 sm:text-lg ${
                            isOpen ? "font-semibold text-solar-400" : "font-medium text-offwhite-50"
                          }`}
                        >
                          {item.question}
                        </span>
                        <span className="relative h-4 w-4 shrink-0" aria-hidden="true">
                          <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-solar-400" />
                          <span
                            className={`absolute left-1/2 top-1/2 w-px -translate-x-1/2 -translate-y-1/2 bg-solar-400 transition-transform duration-300 ease-out ${
                              isOpen ? "h-0" : "h-4"
                            }`}
                          />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`faq-panel-${index}`}
                      role="region"
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {!showAll && secondaryItems.length > 0 ? (
              <div className="border-t border-white/10 pt-6">
                <button
                  type="button"
                  onClick={() => setShowAll(true)}
                  className="text-sm font-semibold text-slate-300 underline decoration-white/20 underline-offset-4 transition-colors hover:text-solar-400"
                >
                  Ver todas as dúvidas ({secondaryItems.length})
                </button>
              </div>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
