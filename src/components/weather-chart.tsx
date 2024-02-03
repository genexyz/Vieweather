import React from "react";
import Image from "next/image";
import {WeatherApiResponse, WeatherForecast} from "@/types";

import styles from "./weather-chart.module.css";

const getDailyForecasts = (
  forecasts: WeatherForecast[],
  currentDate: string,
) => {
  const days: {[key: string]: WeatherForecast[]} = {};
  forecasts.forEach((forecast) => {
    const day = forecast.dt_txt.split(" ")[0]; // Get date as 'YYYY-MM-DD'
    if (!days[day]) days[day] = [];
    days[day].push(forecast);
  });

  const dailyForecasts = Object.values(days)
    .map((forecastsForDay) => {
      const middayForecast =
        forecastsForDay.find((forecast) =>
          forecast.dt_txt.includes("12:00:00"),
        ) || forecastsForDay[0];

      const minTemp = Math.min(
        ...forecastsForDay.map((forecast) => forecast.main.temp_min),
      );
      const maxTemp = Math.max(
        ...forecastsForDay.map((forecast) => forecast.main.temp_max),
      );

      return {
        ...middayForecast,
        main: {
          ...middayForecast.main,
          temp_min: minTemp,
          temp_max: maxTemp,
        },
      };
    })
    .filter((forecast) => forecast.dt_txt.split(" ")[0] !== currentDate);

  return dailyForecasts.slice(0, 5);
};

const WeatherChart = ({weatherData}: {weatherData: WeatherApiResponse}) => {
  const currentWeather = weatherData.list[0];
  const currentDate = currentWeather.dt_txt.split(" ")[0]; // Get current date as 'YYYY-MM-DD'
  const dailyForecasts = getDailyForecasts(
    weatherData.list.slice(1),
    currentDate,
  );

  return (
    <div className={styles.weatherChart}>
      <div className={styles.currentWeather}>
        <h2>Today</h2>
        <Image
          src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`}
          width={50}
          height={50}
          alt="Weather Icon"
        />
        <h3>{currentWeather.weather[0].main}</h3>
        <p>{currentWeather.weather[0].description}</p>
        <p>Temperature: {currentWeather.main.temp.toFixed()}°</p>
        <p>Min Temperature: {currentWeather.main.temp_min.toFixed()}°</p>
        <p>Max Temperature: {currentWeather.main.temp_max.toFixed()}°</p>
        <p>Humidity: {currentWeather.main.humidity}%</p>
        <p>Wind: {currentWeather.wind.speed} m/s</p>
      </div>
      <div className={styles.forecast}>
        {dailyForecasts.map((forecast, index) => (
          <div key={index} className={styles.forecastDay}>
            <p>
              {new Date(forecast.dt * 1000).toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
              })}
            </p>
            <Image
              src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
              width={50}
              height={50}
              alt="Weather Icon"
            />
            <p>{forecast.weather[0].main}</p>
            <p>
              {Math.round(forecast.main.temp_min)}° /{" "}
              {Math.round(forecast.main.temp_max)}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherChart;
