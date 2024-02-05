"use client";

import {useEffect, useRef, useState} from "react";
import {useSearchParams} from "next/navigation";
import {locales, usePathname, useRouter} from "@/navigation";
import {useLocale, useTranslations} from "next-intl";

import styles from "./locale-toggle.module.css";

export const LocaleToggle = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const currentLocale = useLocale() || "en";
  const allLocales = locales.map((locale) => locale.toLowerCase());
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const unit = searchParams.get("unit");

  const updateUrlWithLocale = (newLocale: string) => {
    const updatedPathname = `${pathname}?unit=${unit}`;
    router.push(unit ? updatedPathname : pathname, {locale: newLocale});
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

  const changeLocale = (newLocale: string) => {
    setMenuOpen(false);
    updateUrlWithLocale(newLocale);
  };

  const localeLabel = (locale: string) => t(`localeToggle.${locale}`) || locale;

  return (
    <div
      className={`${styles.localeToggle} ${menuOpen ? styles.open : ""}`}
      ref={wrapperRef}
    >
      <button
        className={styles.toggleButton}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={t("localeToggle.currentLocale", {
          locale: localeLabel(currentLocale),
        })}
      >
        {localeLabel(currentLocale)}
        <span className={styles.arrow} />
      </button>
      {menuOpen && (
        <div className={styles.dropdownMenu}>
          {allLocales.map((locale) => (
            <button
              key={locale}
              onClick={() => changeLocale(locale)}
              className={`${styles.menuItem} ${
                currentLocale === locale ? styles.active : ""
              }`}
            >
              {localeLabel(locale)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
