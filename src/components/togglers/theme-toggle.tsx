"use client";

import {useEffect, useRef, useState} from "react";
import {useTranslations} from "next-intl";
import {useTheme} from "next-themes";

import ClearIcon from "@/components/icons/clear";
import MoonIcon from "@/components/icons/moon";

import styles from "./theme-toggle.module.css";

const ThemeToggle = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {theme, setTheme} = useTheme();
  const t = useTranslations();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const changeTheme = (theme: "dark" | "light" | "system") => {
    setTheme(theme);
    setMenuOpen(false);
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

  return (
    <div className={styles.themeToggle} ref={wrapperRef}>
      <button
        className={styles.toggleButton}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={t("themeToggle.toggleTheme")}
      >
        <ClearIcon className={styles.sunIcon} />
        <MoonIcon className={styles.moonIcon} />
      </button>
      {menuOpen && (
        <div className={styles.dropdownMenu}>
          <button
            onClick={() => changeTheme("light")}
            className={`${styles.menuItem} ${
              theme === "light" ? styles.active : ""
            }`}
          >
            {t("themeToggle.light")}
          </button>
          <button
            onClick={() => changeTheme("dark")}
            className={`${styles.menuItem} ${
              theme === "dark" ? styles.active : ""
            }`}
          >
            {t("themeToggle.dark")}
          </button>
          <button
            onClick={() => changeTheme("system")}
            className={`${styles.menuItem} ${
              theme === "system" ? styles.active : ""
            }`}
          >
            {t("themeToggle.system")}
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
