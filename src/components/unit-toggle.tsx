"use client";

import {useEffect, useRef, useState} from "react";
import {usePathname, useRouter} from "@/navigation";
import {useTranslations} from "next-intl";

import {Unit, useUnit} from "@/app/providers";

import styles from "./unit-toggle.module.css";

export const UnitToggle = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {unit, setUnit} = useUnit();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();

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
        return t("unitToggle.imperial");
      case "metric":
        return t("unitToggle.metric");
      case "standard":
        return t("unitToggle.kelvin");
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
        aria-label={t("unitToggle.currentUnit", {unit: unitLabel(unit)})}
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
            {t("unitToggle.imperial")}
          </button>
          <button
            onClick={() => changeUnit("metric")}
            className={`${styles.menuItem} ${unit === "metric" ? styles.active : ""}`}
          >
            {t("unitToggle.metric")}
          </button>
          <button
            onClick={() => changeUnit("standard")}
            className={`${styles.menuItem} ${unit === "standard" ? styles.active : ""}`}
          >
            {t("unitToggle.kelvin")}
          </button>
        </div>
      )}
    </div>
  );
};
