import type { Metadata } from "next";
import Link from "next/link";
import { AppStateProvider } from "@/components/AppStateProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { WHATSAPP_DISPLAY_NUMBER, buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Política de Privacidade — Romasol Engenharia",
};

export default function PrivacyPolicyPage() {
  return (
    <AppStateProvider>
      <Header />
      <main className="bg-navy-950 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight text-offwhite-50 sm:text-4xl">
            Política de Privacidade
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            Última atualização: {new Date().toLocaleDateString("pt-BR", { year: "numeric", month: "long" })}
          </p>

          <div className="mt-10 flex flex-col gap-8 text-base leading-relaxed text-slate-300">
            <section>
              <h2 className="font-display text-xl font-semibold text-offwhite-50">
                Quais dados coletamos
              </h2>
              <p className="mt-3">
                Ao usar a simulação de economia ou o formulário deste site, você pode informar
                voluntariamente nome, número de WhatsApp, cidade, valor médio da conta de energia
                e perfil de consumo (residencial, comercial, industrial ou rural).
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-offwhite-50">
                Como usamos esses dados
              </h2>
              <p className="mt-3">
                Esses dados são usados apenas para montar uma mensagem de contato e abrir uma
                conversa no WhatsApp com a equipe da Romasol. Não mantemos um banco de dados ou
                CRM conectado a este site: o envio do formulário não armazena suas informações em
                nossos servidores, apenas prepara a mensagem que você mesmo envia pelo WhatsApp.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-offwhite-50">
                Cookies e navegação
              </h2>
              <p className="mt-3">
                Este site não utiliza cookies de rastreamento nem pixels de terceiros para
                publicidade. Alguns eventos de navegação (como abrir a calculadora ou enviar o
                formulário) são registrados localmente no navegador para entender o uso do site,
                sem identificar você pessoalmente.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-offwhite-50">
                Compartilhamento com terceiros
              </h2>
              <p className="mt-3">
                Não vendemos nem compartilhamos seus dados com terceiros. A única comunicação
                gerada a partir deste site é a mensagem de WhatsApp que você envia diretamente
                para a Romasol.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-offwhite-50">
                Fale conosco
              </h2>
              <p className="mt-3">
                Para dúvidas sobre esta política ou sobre seus dados, fale com a Romasol pelo
                WhatsApp{" "}
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-solar-400 hover:underline"
                >
                  {WHATSAPP_DISPLAY_NUMBER}
                </a>
                .
              </p>
            </section>
          </div>

          <Link
            href="/"
            className="mt-14 inline-block text-sm font-semibold text-slate-300 transition-colors hover:text-solar-400"
          >
            ← Voltar para o site
          </Link>
        </div>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </AppStateProvider>
  );
}
