import type { CustomerProfile } from "./whatsapp";

export interface SegmentDefinition {
  id: CustomerProfile;
  label: string;
  problem: string;
  benefit: string;
  calculatorHint: string;
  image: string;
}

export const SEGMENTS: SegmentDefinition[] = [
  {
    id: "residencial",
    label: "Residencial",
    problem: "A conta de energia sobe todo ano e pesa no orçamento da família.",
    benefit:
      "Reduza a conta de luz da sua casa e proteja o orçamento familiar de futuros reajustes de tarifa.",
    calculatorHint: "Simule a economia usando o valor médio da sua conta residencial.",
    image: "/stock/residencial.jpg",
  },
  {
    id: "comercial",
    label: "Comercial",
    problem: "Custos operacionais fixos reduzem a margem do negócio todo mês.",
    benefit:
      "Diminua o custo operacional da sua empresa e ganhe previsibilidade financeira no médio e longo prazo.",
    calculatorHint: "Use a conta média do seu estabelecimento comercial para simular.",
    image: "/stock/comercial.jpg",
  },
  {
    id: "industrial",
    label: "Industrial",
    problem: "Alta demanda energética exige um projeto dimensionado com precisão técnica.",
    benefit:
      "Projetos dimensionados por engenharia conforme demanda, perfil de consumo e infraestrutura elétrica da indústria.",
    calculatorHint: "A simulação abaixo é um ponto de partida; sistemas industriais exigem análise técnica detalhada.",
    image: "/stock/industrial.jpg",
  },
  {
    id: "rural",
    label: "Rural",
    problem: "Irrigação, refrigeração e maquinário dependem de energia constante e cara.",
    benefit:
      "Suporte a irrigação, refrigeração, maquinário e instalações distribuídas da propriedade rural.",
    calculatorHint: "Simule com base na conta de energia da sua propriedade ou unidade produtiva.",
    image: "/stock/rural.jpg",
  },
];

export function getSegmentById(id: CustomerProfile): SegmentDefinition {
  const segment = SEGMENTS.find((item) => item.id === id);
  if (!segment) {
    throw new Error(`Segmento desconhecido: ${id}`);
  }
  return segment;
}
