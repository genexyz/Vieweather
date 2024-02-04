"use client";

import Link from "next/link";

import {ModeToggle} from "@/components/mode-toggle";

import styles from "./navbar.module.css";
import SearchForm from "./search-form";
import {UnitToggle} from "./unit-toggle";

const Navbar = () => (
  <nav className={styles.navbar}>
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href="/">Vieweather</Link>
      </div>
      <div>
        <SearchForm withButton={false} />
      </div>
      <div className={styles.modeToggle}>
        <UnitToggle />
        <ModeToggle />
      </div>
    </div>
  </nav>
);

export default Navbar;
