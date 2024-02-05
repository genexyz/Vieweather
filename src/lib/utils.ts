import AtmosphereIcon from "@/components/icons/atmosphere";
import ClearIcon from "@/components/icons/clear";
import CloudsIcon from "@/components/icons/clouds";
import DrizzleIcon from "@/components/icons/drizzle";
import RainIcon from "@/components/icons/rain";
import SnowIcon from "@/components/icons/snow";
import ThunderstormIcon from "@/components/icons/thunderstorm";

export const OPENWEATHER_KEY = process.env.OPENWEATHER_KEY;

export const weatherIconMap: {[key: number]: React.ElementType} = {
  // Thunderstorm
  200: ThunderstormIcon, // thunderstorm with light rain
  201: ThunderstormIcon, // thunderstorm with rain
  202: ThunderstormIcon, // thunderstorm with heavy rain
  210: ThunderstormIcon, // light thunderstorm
  211: ThunderstormIcon, // thunderstorm
  212: ThunderstormIcon, // heavy thunderstorm
  221: ThunderstormIcon, // ragged thunderstorm
  230: ThunderstormIcon, // thunderstorm with light drizzle
  231: ThunderstormIcon, // thunderstorm with drizzle
  232: ThunderstormIcon, // thunderstorm with heavy drizzle

  // Drizzle
  300: DrizzleIcon, // light intensity drizzle
  301: DrizzleIcon, // drizzle
  302: DrizzleIcon, // heavy intensity drizzle
  310: DrizzleIcon, // light intensity drizzle rain
  311: DrizzleIcon, // drizzle rain
  312: DrizzleIcon, // heavy intensity drizzle rain
  313: DrizzleIcon, // shower rain and drizzle
  314: DrizzleIcon, // heavy shower rain and drizzle
  321: DrizzleIcon, // shower drizzle

  // Rain
  500: RainIcon, // light rain
  501: RainIcon, // moderate rain
  502: RainIcon, // heavy intensity rain
  503: RainIcon, // very heavy rain
  504: RainIcon, // extreme rain
  511: RainIcon, // freezing rain
  520: RainIcon, // light intensity shower rain
  521: RainIcon, // shower rain
  522: RainIcon, // heavy intensity shower rain
  531: RainIcon, // ragged shower rain

  // Snow
  600: SnowIcon, // light snow
  601: SnowIcon, // Snow
  602: SnowIcon, // Heavy snow
  611: SnowIcon, // Sleet
  612: SnowIcon, // Light shower sleet
  613: SnowIcon, // Shower sleet
  615: SnowIcon, // Light rain and snow
  616: SnowIcon, // Rain and snow
  620: SnowIcon, // Light shower snow
  621: SnowIcon, // Shower snow
  622: SnowIcon, // Heavy shower snow

  // Atmosphere
  701: AtmosphereIcon, // mist
  711: AtmosphereIcon, // Smoke
  721: AtmosphereIcon, // Haze
  731: AtmosphereIcon, // sand/ dust whirls
  741: AtmosphereIcon, // fog
  751: AtmosphereIcon, // sand
  761: AtmosphereIcon, // dust
  762: AtmosphereIcon, // volcanic ash
  771: AtmosphereIcon, // squalls
  781: AtmosphereIcon, // tornado

  // Clear
  800: ClearIcon, // clear sky

  // Clouds
  801: CloudsIcon, // few clouds: 11-25%
  802: CloudsIcon, // scattered clouds: 25-50%
  803: CloudsIcon, // broken clouds: 51-84%
  804: CloudsIcon, // overcast clouds: 85-100%
};

export const capitalizeFirstLetterPerWord = (string: string) =>
  string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const getTemperatureRangeClass = (
  temp: number,
  unit: "imperial" | "metric" | "standard",
) => {
  let tempInCelsius = temp;

  if (unit === "imperial") {
    tempInCelsius = ((temp - 32) * 5) / 9;
  } else if (unit === "standard") {
    tempInCelsius = temp - 273.15;
  }

  if (tempInCelsius <= 11) {
    return "temperatureCold";
  } else if (tempInCelsius > 11 && tempInCelsius <= 25) {
    return "temperatureNormal";
  } else {
    return "temperatureHot";
  }
};

// Validating all kind of zip codes is a whole different task, will limit to checking if it has digits for this usecase
export const isZipCode = (input: string) => {
  const hasDigits = /\d/.test(input);

  return hasDigits;
};

export const formatCityName = (cityName: string) =>
  cityName
    .split(",")
    .map(
      (part, index) =>
        index === 0
          ? capitalizeFirstLetterPerWord(part.trim()) // City name
          : part.trim().toUpperCase(), // State/Country code
    )
    .join(", ");
