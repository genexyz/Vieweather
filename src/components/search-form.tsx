"use client";

import {useRouter} from "next/navigation";

import {useUnit} from "@/app/providers";

import styles from "./search-form.module.css";

const SearchForm = () => {
  const router = useRouter();

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
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        type="text"
        name="city"
        required
        placeholder="Enter city or ZIP code"
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  );
};

export default SearchForm;
