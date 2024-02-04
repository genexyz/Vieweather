import Link from "next/link";

import styles from "./not-found.module.css";

const NotFound = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>Page Not Found</h2>
    <p className={styles.description}>
      Sorry, the page you are looking for does not exist or has been moved.
    </p>
    <Link href="/" passHref>
      <button className={styles.backHomeButton}>Go Back Home</button>
    </Link>
  </div>
);

export default NotFound;
