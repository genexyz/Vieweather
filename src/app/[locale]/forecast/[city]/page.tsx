import {redirect} from "@/navigation";
import {GeocodingApiResponse, WeatherApiResponse} from "@/types";
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";

import {OPENWEATHER_KEY} from "@/lib/utils";
import WeatherChart from "@/components/weather-chart";
import {Unit} from "@/app/providers";

import styles from "./page.module.css";

const fetchGeocodingData = async (city: string) => {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${OPENWEATHER_KEY}`,
    {next: {revalidate: 1800}},
  );
  const data: GeocodingApiResponse = await response.json();

  if (data.length === 0) {
    redirect("/404");
  }

  return data[0];
};

const fetchWeatherData = async (lat: number, lon: number, unit: Unit) => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_KEY}&units=${unit}`,
    {next: {revalidate: 1800}},
  );
  const data: WeatherApiResponse = await response.json();

  if (data.cod !== "200") {
    redirect("/404");
  }

  return data;
};

const Page = async ({
  params,
  searchParams,
}: {
  params: {city: string; locale: string};
  searchParams: {unit: Unit};
}) => {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations();

  const parsedCity = params.city.replace(/%20/g, " ");
  const geocodingData = await fetchGeocodingData(parsedCity);

  const weatherData = await fetchWeatherData(
    geocodingData.lat,
    geocodingData.lon,
    searchParams.unit,
  );

  return (
    <main className={styles.main}>
      <h1>{t("forecast.title")}</h1>
      <WeatherChart
        weatherData={weatherData}
        city={parsedCity}
        unit={searchParams.unit}
      />
    </main>
  );
};

export default Page;
