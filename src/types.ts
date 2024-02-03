// Weather API
type Coord = {
  lat: number;
  lon: number;
};

type City = {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

type WeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type MainWeatherInfo = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
};

type Clouds = {
  all: number;
};

type Wind = {
  speed: number;
  deg: number;
  gust: number;
};

type Precipitation = {
  "3h": number;
};

type Sys = {
  pod: string;
};

export type WeatherForecast = {
  dt: number;
  main: MainWeatherInfo;
  weather: WeatherCondition[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Precipitation;
  snow?: Precipitation;
  sys: Sys;
  dt_txt: string;
};

export type WeatherApiResponse = {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherForecast[];
  city: City;
};

// Geocoding API
type LocalNames = {
  [key: string]: string;
};

export type GeocodingApiResponse = Array<{
  name: string;
  local_names: LocalNames;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}>;
