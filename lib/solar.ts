export interface SolarEstimateInput {
  monthlyBill: number;
}

export interface SolarEstimate {
  monthlyConsumptionKwh: number;
  requiredPowerKwp: number;
  estimatedPanelCount: number;
  installedPowerKwp: number;
  monthlySavings: number;
  annualSavings: number;
  fourYearSavings: number;
}

export const ELECTRICITY_TARIFF = 1.14;
export const MONTHLY_GENERATION_PER_KWP = 125;
export const PANEL_POWER_KW = 0.57;
export const SAVINGS_FACTOR = 0.9;

export function calculateSolarEstimate(
  input: SolarEstimateInput,
): SolarEstimate {
  const monthlyBill = Number.isFinite(input.monthlyBill)
    ? Math.max(0, input.monthlyBill)
    : 0;

  const monthlyConsumptionKwh = monthlyBill / ELECTRICITY_TARIFF;

  const requiredPowerKwp = monthlyConsumptionKwh / MONTHLY_GENERATION_PER_KWP;

  const estimatedPanelCount =
    monthlyBill === 0 ? 0 : Math.ceil(requiredPowerKwp / PANEL_POWER_KW);

  const installedPowerKwp = estimatedPanelCount * PANEL_POWER_KW;

  const monthlySavings = monthlyBill * SAVINGS_FACTOR;

  const annualSavings = monthlySavings * 12;

  const fourYearSavings = annualSavings * 4;

  return {
    monthlyConsumptionKwh: Math.round(monthlyConsumptionKwh),
    requiredPowerKwp: Number(requiredPowerKwp.toFixed(1)),
    estimatedPanelCount,
    installedPowerKwp: Number(installedPowerKwp.toFixed(2)),
    monthlySavings: Math.round(monthlySavings),
    annualSavings: Math.round(annualSavings),
    fourYearSavings: Math.round(fourYearSavings),
  };
}
