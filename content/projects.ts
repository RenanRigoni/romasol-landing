export interface ProjectCase {
  name: string;
  segment: string;
  panelCount: number;
  installedPowerKwp: number;
  annualSavingsBRL: number;
  image: string;
  featured: boolean;
}

// Números publicados em romasolengenharia.com.br/cases-de-sucesso — não alterar.
export const PROJECT_CASES: ProjectCase[] = [
  {
    name: "Supermercado Tigrão",
    segment: "Comercial",
    panelCount: 65,
    installedPowerKwp: 33.15,
    annualSavingsBRL: 45349,
    image: "/cases/tigrao.png",
    featured: true,
  },
  {
    name: "Gráfica Gaia",
    segment: "Comercial / Industrial",
    panelCount: 76,
    installedPowerKwp: 33.82,
    annualSavingsBRL: 46265,
    image: "/cases/gaia.png",
    featured: true,
  },
  {
    name: "Fazenda Boa Vista",
    segment: "Rural",
    panelCount: 50,
    installedPowerKwp: 31.55,
    annualSavingsBRL: 42886,
    image: "/cases/fbv.png",
    featured: true,
  },
  {
    name: "Sattva Controladoria",
    segment: "Comercial",
    panelCount: 78,
    installedPowerKwp: 30.25,
    annualSavingsBRL: 41382,
    image: "/cases/sattva.png",
    featured: true,
  },
  {
    name: "Butiquim",
    segment: "Comercial",
    panelCount: 52,
    installedPowerKwp: 27.82,
    annualSavingsBRL: 38057,
    image: "/cases/butiquim.png",
    featured: true,
  },
  {
    name: "Dunateli Linguiçaria",
    segment: "Comercial",
    panelCount: 50,
    installedPowerKwp: 27.5,
    annualSavingsBRL: 37620,
    image: "/cases/linguica.png",
    featured: true,
  },
  {
    name: "Sorrizo Espetaria",
    segment: "Comercial",
    panelCount: 44,
    installedPowerKwp: 24.42,
    annualSavingsBRL: 33406,
    image: "/cases/sorriso.png",
    featured: false,
  },
  {
    name: "Fazenda Indianópolis",
    segment: "Rural",
    panelCount: 46,
    installedPowerKwp: 20.7,
    annualSavingsBRL: 28317,
    image: "/cases/fi.png",
    featured: false,
  },
  {
    name: "Talentos Restaurante",
    segment: "Comercial",
    panelCount: 35,
    installedPowerKwp: 17.85,
    annualSavingsBRL: 24418,
    image: "/cases/talentos.png",
    featured: false,
  },
  {
    name: "Uai Grill",
    segment: "Comercial",
    panelCount: 22,
    installedPowerKwp: 12.21,
    annualSavingsBRL: 16703,
    image: "/cases/uai.png",
    featured: false,
  },
  {
    name: "ADUFU",
    segment: "Institucional",
    panelCount: 45,
    installedPowerKwp: 12.21,
    annualSavingsBRL: 16703,
    image: "/cases/adufu.png",
    featured: false,
  },
  {
    name: "Açougue Califórnia",
    segment: "Comercial",
    panelCount: 20,
    installedPowerKwp: 2.2,
    annualSavingsBRL: 3009,
    image: "/cases/california.png",
    featured: false,
  },
];

export const FEATURED_PROJECT_CASES = PROJECT_CASES.filter((item) => item.featured);
export const SECONDARY_PROJECT_CASES = PROJECT_CASES.filter((item) => !item.featured);
