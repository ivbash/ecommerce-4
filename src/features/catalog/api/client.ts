import type { GeoLocation, Weather } from './types';

export async function fetchGeoLocation({
  signal,
  city,
}: {
  signal: AbortSignal;
  city: string;
}) {
  const geoLocations = await get<GeoLocation[]>(
    `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=d2b13ccd7a446c2b7246b3d029f12ab9`,
    signal,
  );

  return geoLocations[0];
}

export async function fetchWeather({
  signal,
  lat,
  lon,
}: {
  signal: AbortSignal;
  lat: number;
  lon: number;
}) {
  const weather = await get<Weather>(
    `https://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&appid=d2b13ccd7a446c2b7246b3d029f12ab9`,
    signal,
  );

  return weather;
}

async function get<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal });
  const json = await res.json();
  return json;
}
