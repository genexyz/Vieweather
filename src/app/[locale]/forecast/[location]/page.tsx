import {redirect} from "@/navigation";
import {
  GeocodingCity,
  GeocodingCityApiResponse,
  GeocodingZipApiResponse,
  Unit,
  WeatherApiResponse,
} from "@/types";
import {getTranslations, unstable_setRequestLocale} from "next-intl/server";

import {isZipCode, OPENWEATHER_KEY} from "@/lib/utils";
import WeatherChart from "@/components/weather-chart";

import styles from "./page.module.css";

const fetchCityGeocodingData = async (city: string) => {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${OPENWEATHER_KEY}`,
  );
  const data: GeocodingCityApiResponse = await response.json();

  if (data.length === 0 || !data[0].lat || !data[0].lon) {
    redirect("/404");
  }

  return data[0];
};

const fetchZipGeocodingData = async (zip: string) => {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${OPENWEATHER_KEY}`,
    {next: {revalidate: 900}},
  );
  const data: GeocodingZipApiResponse = await response.json();

  if (!data.lat || !data.lon) {
    redirect("/404");
  }

  return data;
};

const fetchWeatherData = async (
  lat: number,
  lon: number,
  unit: Unit,
  locale: string,
) => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_KEY}&units=${unit}&lang=${locale}`,
    {next: {revalidate: 900}},
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
  params: {location: string; locale: string};
  searchParams: {unit: Unit};
}) => {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations();

  const parsedLocation = params.location
    .replace(/%20/g, " ")
    .replace(/%2C/g, ",");

  let geocodingData: GeocodingCity | GeocodingZipApiResponse;
  let cityName: string;

  if (isZipCode(parsedLocation)) {
    geocodingData = await fetchZipGeocodingData(parsedLocation);
    cityName = geocodingData.name;
  } else {
    geocodingData = await fetchCityGeocodingData(parsedLocation);
    cityName = parsedLocation;
  }

  const weatherData = await fetchWeatherData(
    geocodingData.lat,
    geocodingData.lon,
    searchParams.unit,
    params.locale,
  );

  return (
    <main className={styles.main}>
      <h1>{t("forecast.title")}</h1>
      <WeatherChart
        weatherData={weatherData}
        city={cityName}
        unit={searchParams.unit}
      />
    </main>
  );
};

export default Page;
