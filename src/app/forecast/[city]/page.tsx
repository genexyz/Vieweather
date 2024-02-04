import {GeocodingApiResponse, WeatherApiResponse} from "@/types";

import {OPENWEATHER_KEY} from "@/lib/utils";
import WeatherChart from "@/components/weather-chart";

import styles from "./page.module.css";

const fetchGeocodingData = async (city: string) => {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${OPENWEATHER_KEY}`,
  );
  const data: GeocodingApiResponse = await response.json();

  if (data.length === 0) {
    throw new Error("No results found");
  }

  return data[0];
};

const fetchWeatherData = async (lat: number, lon: number) => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_KEY}&units=metric`,
  );
  const data: WeatherApiResponse = await response.json();

  if (data.cod !== "200") {
    throw new Error(data.message.toString());
  }

  return data;
};

const Page = async ({params}: {params: {city: string}}) => {
  const parsedCity = params.city.replace(/%20/g, " ");
  const geocodingData = await fetchGeocodingData(parsedCity);

  const weatherData = await fetchWeatherData(
    geocodingData.lat,
    geocodingData.lon,
  );

  return (
    <main className={styles.main}>
      <h1>5 day forecast</h1>
      <WeatherChart weatherData={weatherData} city={parsedCity} />
    </main>
  );
};

export default Page;
