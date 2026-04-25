import type { GeoLocation, Weather } from './types';

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

export async function fetchGeoLocation({
  signal,
  city,
}: {
  signal: AbortSignal;
  city: string;
}) {
  const geoLocations = await get<GeoLocation[]>(
    `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${encodeURIComponent(apiKey)}`,
    signal,
  );

  return geoLocations[0];
}

export async function fetchReverseGeoLocation({
  signal,
  lat,
  lon,
}: {
  signal: AbortSignal;
  lat: number;
  lon: number;
}) {
  const geoLocations = await get<GeoLocation[]>(
    `http://api.openweathermap.org/geo/1.0/reverse?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&limit=1&appid=${encodeURIComponent(apiKey)}`,
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
    `https://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&appid=${encodeURIComponent(apiKey)}`,
    signal,
  );

  return weather;
}

async function get<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal });
  const json = await res.json();
  return json;
}
