import {Link} from "@/navigation";
import {useTranslations} from "next-intl";

import styles from "./not-found.module.css";

const NotFound = () => {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>{t("notFound.title")}</h2>
      <p className={styles.description}>{t("notFound.description")}</p>
      <Link href="/" passHref>
        <button className={styles.backHomeButton}>
          {t("notFound.goBack")}
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
