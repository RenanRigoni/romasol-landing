import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Versão de demonstração comercial em domínio temporário: indexação desativada
// até o cliente aprovar o projeto e ele ser publicado no domínio final.
export const metadata: Metadata = {
  title: "Romasol Engenharia — Energia Solar em Uberlândia e Catalão",
  description:
    "Projetos de energia solar dimensionados por engenharia para residências, empresas, indústrias e propriedades rurais. Simule sua economia com a Romasol.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Romasol Engenharia — Energia Solar em Uberlândia e Catalão",
    description:
      "Projetos de energia solar dimensionados por engenharia para residências, empresas, indústrias e propriedades rurais.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-navy-950">
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
