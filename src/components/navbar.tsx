"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";

import {ModeToggle} from "@/components/mode-toggle";

import styles from "./navbar.module.css";
import SearchForm from "./search-form";
import {UnitToggle} from "./unit-toggle";

const Navbar = () => {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">Vieweather</Link>
        </div>
        {!(pathname === "/") && (
          <div className={styles.searchForm}>
            <SearchForm withButton={false} />
          </div>
        )}
        <div className={styles.togglers}>
          <UnitToggle />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
