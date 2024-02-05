"use client";

import {Link, usePathname} from "@/navigation";
import {useTranslations} from "next-intl";

import {ModeToggle} from "@/components/mode-toggle";

import {LocaleToggle} from "./locale-toggle";
import styles from "./navbar.module.css";
import SearchForm from "./search-form";
import {UnitToggle} from "./unit-toggle";

const Navbar = () => {
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">{t("navbar.title")}</Link>
        </div>
        {!(pathname === "/") && (
          <div className={styles.searchForm}>
            <SearchForm withButton={false} />
          </div>
        )}
        <div className={styles.togglers}>
          <LocaleToggle />
          <UnitToggle />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
