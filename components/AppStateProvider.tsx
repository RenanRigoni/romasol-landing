"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { CustomerProfile } from "@/lib/whatsapp";
import type { SolarEstimate } from "@/lib/solar";

interface AppState {
  profile: CustomerProfile | undefined;
  city: string | undefined;
  monthlyBill: number | undefined;
  estimate: SolarEstimate | undefined;
  setProfile: (profile: CustomerProfile) => void;
  setCity: (city: string | undefined) => void;
  setMonthlyBill: (value: number | undefined) => void;
  setEstimate: (estimate: SolarEstimate | undefined) => void;
}

const AppStateContext = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<CustomerProfile>();
  const [city, setCity] = useState<string>();
  const [monthlyBill, setMonthlyBill] = useState<number>();
  const [estimate, setEstimate] = useState<SolarEstimate>();

  const value = useMemo(
    () => ({
      profile,
      city,
      monthlyBill,
      estimate,
      setProfile,
      setCity,
      setMonthlyBill,
      setEstimate,
    }),
    [profile, city, monthlyBill, estimate],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppState {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState deve ser usado dentro de AppStateProvider");
  }
  return context;
}
