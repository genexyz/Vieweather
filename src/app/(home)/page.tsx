import SearchForm from "@/components/search-form";

import styles from "./page.module.css";

const Home = () => (
  <main className={styles.main}>
    <h1 className={styles.title}>Weather Forecast</h1>
    <p className={styles.description}>
      Get the latest 5-day weather forecast for your city.
    </p>
    <SearchForm />
  </main>
);

export default Home;
