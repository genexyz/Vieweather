"use client";

import {useEffect, useRef, useState} from "react";
import {usePathname, useRouter} from "next/navigation";

import {Unit, useUnit} from "@/app/providers";

import styles from "./unit-toggle.module.css";

export const UnitToggle = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {unit, setUnit} = useUnit();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const updateUrlWithUnit = (newUnit: Unit) => {
    if (pathname.includes("/forecast/")) {
      router.replace(`${pathname}?unit=${newUnit}`);
    }
  };

  // Handle close dropdown on outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const changeUnit = (newUnit: Unit) => {
    setUnit(newUnit);
    updateUrlWithUnit(newUnit);
    setMenuOpen(false);
  };

  const unitLabel = (unit: Unit) => {
    switch (unit) {
      case "imperial":
        return "Imperial";
      case "metric":
        return "Metric";
      case "standard":
        return "Kelvin";
      default:
        return "";
    }
  };

  return (
    <div
      className={`${styles.unitToggle} ${menuOpen ? styles.open : ""}`}
      ref={wrapperRef}
    >
      <button
        className={styles.toggleButton}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={`Current unit: ${unitLabel(unit)}`}
      >
        {unitLabel(unit)}
        <span className={styles.arrow} />
      </button>
      {menuOpen && (
        <div className={styles.dropdownMenu}>
          <button
            onClick={() => changeUnit("imperial")}
            className={`${styles.menuItem} ${unit === "imperial" ? styles.active : ""}`}
          >
            Imperial
          </button>
          <button
            onClick={() => changeUnit("metric")}
            className={`${styles.menuItem} ${unit === "metric" ? styles.active : ""}`}
          >
            Metric
          </button>
          <button
            onClick={() => changeUnit("standard")}
            className={`${styles.menuItem} ${unit === "standard" ? styles.active : ""}`}
          >
            Kelvin
          </button>
        </div>
      )}
    </div>
  );
};
