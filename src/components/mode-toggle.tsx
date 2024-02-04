import {useEffect, useRef, useState} from "react";
import {useTheme} from "next-themes";

import ClearIcon from "./icons/clear";
import MoonIcon from "./icons/moon";
import styles from "./mode-toggle.module.css";

export const ModeToggle = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {setTheme} = useTheme();
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
    <div className={styles.modeToggle} ref={wrapperRef}>
      <button
        className={styles.toggleButton}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle theme"
      >
        <ClearIcon className={styles.sunIcon} />
        <MoonIcon className={styles.moonIcon} />
      </button>
      {menuOpen && (
        <div className={styles.dropdownMenu}>
          <button
            onClick={() => changeTheme("light")}
            className={styles.menuItem}
          >
            Light
          </button>
          <button
            onClick={() => changeTheme("dark")}
            className={styles.menuItem}
          >
            Dark
          </button>
          <button
            onClick={() => changeTheme("system")}
            className={styles.menuItem}
          >
            System
          </button>
        </div>
      )}
    </div>
  );
};
