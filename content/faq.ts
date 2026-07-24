export type FaqCategory =
  | "economia"
  | "instalacao"
  | "financiamento"
  | "empresas";

export interface FaqItem {
  question: string;
  answer: string;
  category: FaqCategory;
  priority?: boolean;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Quanto a energia solar pode reduzir a minha conta?",
    answer:
      "A redução varia conforme consumo, irradiação local e dimensionamento do sistema. Nossa simulação usa uma estimativa conservadora de 90% de economia sobre o valor da conta; a Romasol já registrou casos de até 95%, mas o percentual exato depende da análise técnica do seu imóvel.",
    category: "economia",
    priority: true,
  },
  {
    question: "Como é calculado o tamanho correto do sistema?",
    answer:
      "O dimensionamento considera seu consumo médio mensal, o potencial de geração da região e as características do telhado ou área disponível. A simulação do site é um ponto de partida; o dimensionamento definitivo é feito por engenharia após a análise da fatura e do local.",
    category: "economia",
    priority: true,
  },
  {
    question: "A energia solar funciona em dias nublados?",
    answer:
      "Sim. Os painéis continuam gerando energia em dias nublados, com produção reduzida em relação a dias de sol pleno. O sistema é dimensionado considerando a média de irradiação da região ao longo do ano, não apenas dias ideais.",
    category: "instalacao",
    priority: true,
  },
  {
    question: "Posso instalar energia solar em um imóvel alugado?",
    answer:
      "É possível, mas depende de autorização do proprietário para a instalação física dos equipamentos. Fale com nossa equipe para avaliar as opções disponíveis para o seu caso.",
    category: "instalacao",
    priority: true,
  },
  {
    question: "O que acontece durante a noite?",
    answer:
      "Sem geração solar, o imóvel consome energia da rede elétrica normalmente (ou de um sistema de armazenamento, quando o projeto incluir baterias). O sistema é conectado à rede para garantir fornecimento contínuo.",
    category: "instalacao",
    priority: true,
  },
  {
    question: "Quanto tempo leva a instalação?",
    answer:
      "O prazo varia conforme o porte do projeto, disponibilidade de equipamentos e processo de homologação junto à distribuidora local. Nossa equipe informa um cronograma específico após a vistoria técnica.",
    category: "instalacao",
    priority: true,
  },
  {
    question: "O projeto pode ser financiado?",
    answer:
      "Sim, a Romasol tem relacionamento com instituições financeiras para viabilizar o investimento. Condições, taxas e prazos são tratados diretamente com o banco escolhido durante a proposta.",
    category: "financiamento",
    priority: true,
  },
  {
    question: "Quais garantias estão disponíveis?",
    answer:
      "Os equipamentos contam com garantia de fábrica, que varia por fabricante e componente (módulos, inversores e estrutura). Os detalhes de garantia são apresentados na proposta técnica do seu projeto.",
    category: "financiamento",
    priority: true,
  },
  {
    question: "Que tipo de manutenção o sistema exige?",
    answer:
      "A manutenção é simples e pouco frequente: limpeza periódica dos módulos e inspeções de rotina no sistema elétrico. Nossa equipe orienta sobre a periodicidade recomendada para o seu projeto.",
    category: "instalacao",
  },
  {
    question: "O que acontece se o meu consumo aumentar no futuro?",
    answer:
      "O sistema é dimensionado com base no seu consumo atual. Se o consumo aumentar de forma significativa, é possível avaliar uma ampliação do sistema junto à nossa equipe técnica.",
    category: "economia",
  },
  {
    question: "O sistema precisa de aprovação da distribuidora de energia?",
    answer:
      "Sim. Todo sistema fotovoltaico conectado à rede passa por processo de homologação junto à distribuidora local. A Romasol conduz essa etapa como parte do projeto.",
    category: "instalacao",
  },
  {
    question: "Empresas e propriedades rurais podem usar o mesmo tipo de sistema?",
    answer:
      "O princípio é o mesmo, mas o dimensionamento muda conforme o perfil de consumo: comércios, indústrias e propriedades rurais têm demandas diferentes (horário de pico, sazonalidade, equipamentos). Cada projeto é dimensionado individualmente.",
    category: "empresas",
  },
];
