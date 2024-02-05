"use client";

import {useRouter} from "@/navigation";
import {useTranslations} from "next-intl";

import {useUnit} from "@/app/providers";

import styles from "./search-form.module.css";

const SearchForm = ({withButton = true}: {withButton?: boolean}) => {
  const router = useRouter();
  const t = useTranslations();
  const {unit} = useUnit();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {elements} = event.currentTarget;

    const input = elements.namedItem("city");
    const isInput = input instanceof HTMLInputElement;
    if (!isInput || input == null) return;

    const city = input.value;
    console.log(city);

    router.push(`/forecast/${encodeURIComponent(city)}?unit=${unit}`);
  };

  return (
    <form
      className={`${styles.searchForm} ${!withButton && styles.navbarForm}`}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="city"
        required
        placeholder={t("searchForm.placeholder")}
        aria-label={t("searchForm.ariaLabel")}
        aria-required="true"
        className={styles.searchInput}
      />
      {withButton && (
        <button type="submit" className={styles.searchButton}>
          {t("searchForm.buttonText")}
        </button>
      )}
    </form>
  );
};

export default SearchForm;
