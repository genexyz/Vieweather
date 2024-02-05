import {useTranslations} from "next-intl";
import {unstable_setRequestLocale} from "next-intl/server";

import SearchForm from "@/components/search-form";

import styles from "./page.module.css";

const Home = ({params: {locale}}: {params: {locale: string}}) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{t("home.title")}</h1>
      <p className={styles.description}>{t("home.description")}</p>
      <SearchForm />
    </main>
  );
};

export default Home;
