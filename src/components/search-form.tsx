"use client";

import {useRouter} from "@/navigation";
import {useTranslations} from "next-intl";

import QuestionIcon from "@/components/icons/question";
import {useUnit} from "@/app/providers";

import styles from "./search-form.module.css";

const SearchForm = ({withButton = true}: {withButton?: boolean}) => {
  const router = useRouter();
  const t = useTranslations();
  const {unit} = useUnit();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {elements} = event.currentTarget;

    const input = elements.namedItem("location");
    const isInput = input instanceof HTMLInputElement;
    if (!isInput || input == null) return;

    const location = input.value.toLowerCase().trim();

    router.push(`/forecast/${encodeURIComponent(location)}?unit=${unit}`);
  };

  return (
    <form
      className={`${styles.searchForm} ${!withButton && styles.navbarForm}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.inputContainer}>
        <input
          type="text"
          name="location"
          required
          autoFocus
          placeholder={t("searchForm.placeholder")}
          aria-label={t("searchForm.ariaLabel")}
          aria-required="true"
          className={styles.searchInput}
        />
        <div className={styles.questionIcon} tabIndex={0}>
          <QuestionIcon />
        </div>
        <div className={styles.tooltip}>
          <div className={styles.tooltipArrow}></div>
          <div className={styles.tooltipContent}>
            <p className={styles.tooltipHeading}>{t("tooltip.citySearch")}</p>
            <p className={styles.tooltipParagraph}>
              {t("tooltip.cityTooltipText")}
            </p>
            <p className={styles.tooltipParagraph}>
              {t("tooltip.cityUSStateTooltipText")}
            </p>
            <p className={styles.tooltipHeading}>{t("tooltip.zipSearch")}</p>
            <p className={styles.tooltipParagraph}>
              {t("tooltip.zipTooltipText")}
            </p>
          </div>
        </div>
      </div>
      {withButton && (
        <button type="submit" className={styles.searchButton}>
          {t("searchForm.buttonText")}
        </button>
      )}
    </form>
  );
};

export default SearchForm;
