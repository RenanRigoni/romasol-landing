import type { SolarEstimate } from "./solar";
import { formatCurrencyBRL, formatKwh, formatKwp } from "./format";

export const WHATSAPP_NUMBER = "5534997783777";
export const WHATSAPP_DISPLAY_NUMBER = "(34) 9 9778-3777";

export type CustomerProfile =
  | "residencial"
  | "comercial"
  | "industrial"
  | "rural";

const PROFILE_LABELS: Record<CustomerProfile, string> = {
  residencial: "Residencial",
  comercial: "Comercial",
  industrial: "Industrial",
  rural: "Rural",
};

interface BuildWhatsAppMessageParams {
  profile?: CustomerProfile;
  city?: string;
  monthlyBill?: number;
  estimate?: SolarEstimate;
  name?: string;
}

function buildMessageLines({
  profile,
  city,
  monthlyBill,
  estimate,
  name,
}: BuildWhatsAppMessageParams): string[] {
  const lines: string[] = [
    "Olá, equipe Romasol.",
    "",
    "Fiz uma simulação no site e gostaria de receber uma análise personalizada.",
    "",
  ];

  if (name) lines.push(`Nome: ${name}`);
  if (profile) lines.push(`Perfil: ${PROFILE_LABELS[profile]}`);
  if (city) lines.push(`Cidade: ${city}`);
  if (typeof monthlyBill === "number" && monthlyBill > 0) {
    lines.push(`Conta média: ${formatCurrencyBRL(monthlyBill)}/mês`);
  }

  if (estimate) {
    lines.push(`Consumo estimado: ${formatKwh(estimate.monthlyConsumptionKwh)}/mês`);
    lines.push(`Sistema estimado: ${formatKwp(estimate.installedPowerKwp)}`);
    lines.push(`Quantidade estimada: ${estimate.estimatedPanelCount} painéis`);
    lines.push(`Economia anual estimada: ${formatCurrencyBRL(estimate.annualSavings)}`);
  }

  return lines;
}

export function buildWhatsAppMessage(params: BuildWhatsAppMessageParams = {}): string {
  return buildMessageLines(params).join("\n");
}

export function buildWhatsAppUrl(params: BuildWhatsAppMessageParams = {}): string {
  const message = buildWhatsAppMessage(params);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
