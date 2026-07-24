export interface RegionGroup {
  hub: string;
  state: string;
  cities: string[];
}

export const REGIONS: RegionGroup[] = [
  {
    hub: "Uberlândia",
    state: "MG",
    cities: [
      "Uberlândia",
      "Araguari",
      "Indianópolis",
      "Tupaciguara",
      "Monte Alegre de Minas",
      "Prata",
      "Araporã",
      "Centralina",
      "Canápolis",
      "Capinópolis",
      "Cascalho Rico",
      "Estrela do Sul",
      "Romaria",
      "Nova Ponte",
      "Veríssimo",
    ],
  },
  {
    hub: "Catalão",
    state: "GO",
    cities: [
      "Catalão",
      "Ouvidor",
      "Goiandira",
      "Três Ranchos",
      "Nova Aurora",
      "Cumari",
      "Anhanguera",
      "Davinópolis",
      "Campo Alegre de Goiás",
      "Corumbaíba",
      "Ipameri",
    ],
  },
];

export const ALL_CITIES: string[] = REGIONS.flatMap((region) => region.cities);
