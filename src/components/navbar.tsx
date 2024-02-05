"use client";

import {Link, usePathname} from "@/navigation";
import {useTranslations} from "next-intl";

import LogoIcon from "@/components/icons/logo";
import SearchForm from "@/components/search-form";
import {LocaleToggle} from "@/components/togglers/locale-toggle";
import {ModeToggle} from "@/components/togglers/mode-toggle";
import {UnitToggle} from "@/components/togglers/unit-toggle";

import styles from "./navbar.module.css";

const Navbar = () => {
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/">
          <div className={styles.logo}>
            <LogoIcon className={styles.logoIcon} />
            <p>{t("navbar.title")}</p>
          </div>
        </Link>
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
