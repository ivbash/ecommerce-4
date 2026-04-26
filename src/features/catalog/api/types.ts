export type GeoLocation = {
  country: string;
  name: string;
  state: string;
  local_names: Record<string, string>;
  lat: number;
  lon: number;
};

export type Weather = {
  cod: number;
  base: string;
  clouds: { all: number };
  dt: number;
  id: number;
  coord: { lat: number; lon: number };
  name: string;
  timezone: number;
  visibility: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: { speed: number; deg: number };
};
