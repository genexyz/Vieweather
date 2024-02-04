"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {type ThemeProviderProps} from "next-themes/dist/types";

export type Unit = "imperial" | "metric" | "standard";
type UnitContextType = {
  unit: Unit;
  setUnit: (Unit: Unit) => void;
};

export const ThemeProvider = ({children, ...props}: ThemeProviderProps) => (
  <NextThemesProvider {...props}>{children}</NextThemesProvider>
);

const UnitContext = createContext<UnitContextType | undefined>(undefined);

export const UnitProvider = ({children}: {children: ReactNode}) => {
  const [unit, setUnit] = useState<Unit>("imperial");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const savedUnit =
      typeof window !== "undefined"
        ? (localStorage.getItem("unit") as Unit)
        : null;
    if (savedUnit) {
      setUnit(savedUnit);
    }
  }, []);

  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem("unit", unit);
    }
  }, [unit, hasMounted]);

  if (!hasMounted) {
    return null;
  }

  return (
    <UnitContext.Provider value={{unit, setUnit}}>
      {children}
    </UnitContext.Provider>
  );
};

export const useUnit = () => {
  const context = useContext(UnitContext);
  if (context === undefined) {
    throw new Error("useUnit must be used within a UnitProvider");
  }
  return context;
};
