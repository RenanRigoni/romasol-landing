import { describe, expect, it } from "vitest";
import { calculateSolarEstimate } from "./solar";

describe("calculateSolarEstimate", () => {
  it("calculates the estimate for a R$300 monthly bill", () => {
    const result = calculateSolarEstimate({ monthlyBill: 300 });
    expect(result).toEqual({
      monthlyConsumptionKwh: 263,
      requiredPowerKwp: 2.1,
      estimatedPanelCount: 4,
      installedPowerKwp: 2.28,
      monthlySavings: 270,
      annualSavings: 3240,
      fourYearSavings: 12960,
    });
  });

  it("calculates the estimate for a R$600 monthly bill", () => {
    const result = calculateSolarEstimate({ monthlyBill: 600 });
    expect(result).toEqual({
      monthlyConsumptionKwh: 526,
      requiredPowerKwp: 4.2,
      estimatedPanelCount: 8,
      installedPowerKwp: 4.56,
      monthlySavings: 540,
      annualSavings: 6480,
      fourYearSavings: 25920,
    });
  });

  it("calculates the estimate for a R$1,100 monthly bill", () => {
    const result = calculateSolarEstimate({ monthlyBill: 1100 });
    expect(result).toEqual({
      monthlyConsumptionKwh: 965,
      requiredPowerKwp: 7.7,
      estimatedPanelCount: 14,
      installedPowerKwp: 7.98,
      monthlySavings: 990,
      annualSavings: 11880,
      fourYearSavings: 47520,
    });
  });

  it("returns a zeroed estimate for an empty (zero) value", () => {
    const result = calculateSolarEstimate({ monthlyBill: 0 });
    expect(result).toEqual({
      monthlyConsumptionKwh: 0,
      requiredPowerKwp: 0,
      estimatedPanelCount: 0,
      installedPowerKwp: 0,
      monthlySavings: 0,
      annualSavings: 0,
      fourYearSavings: 0,
    });
  });

  it("clamps an invalid negative value to zero", () => {
    const result = calculateSolarEstimate({ monthlyBill: -500 });
    expect(result.monthlyConsumptionKwh).toBe(0);
    expect(result.estimatedPanelCount).toBe(0);
    expect(result.monthlySavings).toBe(0);
  });

  it("treats a non-finite value as zero", () => {
    const result = calculateSolarEstimate({ monthlyBill: NaN });
    expect(result.estimatedPanelCount).toBe(0);
    expect(result.monthlySavings).toBe(0);
  });

  it("handles a very high business bill without overflow", () => {
    const result = calculateSolarEstimate({ monthlyBill: 50000 });
    expect(result.monthlyConsumptionKwh).toBe(Math.round(50000 / 1.14));
    expect(result.estimatedPanelCount).toBeGreaterThan(300);
    expect(result.installedPowerKwp).toBeGreaterThan(result.requiredPowerKwp);
    expect(result.annualSavings).toBe(Math.round(50000 * 0.9 * 12));
  });
});
