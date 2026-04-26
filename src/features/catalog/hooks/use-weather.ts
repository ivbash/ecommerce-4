import { useCallback, useEffect, useRef, useState } from 'react';
import {
  fetchGeoLocation,
  fetchReverseGeoLocation,
  fetchWeather,
} from '../api/client';
import type { GeoLocation, Weather } from '../api/types';

export type WeatherError = 'GeoLocation' | 'Weather';

export type GeoLocationParams = string | { lat: number; lon: number };

export function useWeather() {
  const [weather, setWeather] = useState<Weather>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<WeatherError>(null);
  const abortControllerRef = useRef<AbortController>(null);

  const fetchData = useCallback(
    async (
      cityOrCoords: GeoLocationParams,
      onError?: (cityOrCoords: GeoLocationParams) => void,
      onFetchedGeoLocation?: (city: string) => void,
    ) => {
      abortControllerRef.current?.abort('abort');

      setLoading(true);
      setError(null);

      const abortController = new AbortController();
      abortControllerRef.current = abortController;
      const signal = abortController.signal;

      let geoLocationSuccess = false;
      let weatherSuccess = false;

      try {
        let geoLocation: GeoLocation;

        if (typeof cityOrCoords === 'string') {
          geoLocation = await fetchGeoLocation({ signal, city: cityOrCoords });
        } else {
          geoLocation = await fetchReverseGeoLocation({
            signal,
            lat: cityOrCoords.lat,
            lon: cityOrCoords.lon,
          });
        }

        if (!geoLocation) throw new Error();
        geoLocationSuccess = true;

        const weather = await fetchWeather({
          signal,
          lat: geoLocation.lat,
          lon: geoLocation.lon,
        });
        weatherSuccess = true;

        onFetchedGeoLocation?.(weather.name);
        setWeather(weather);
      } catch (error) {
        if (error === 'abort') return;

        if (!geoLocationSuccess) {
          setError('GeoLocation');
          onError?.(cityOrCoords);
        } else if (!weatherSuccess) {
          onFetchedGeoLocation?.(
            typeof cityOrCoords === 'string' ? cityOrCoords : '',
          );
          setWeather(null);
          setError('Weather');
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    },
    [],
  );

  useEffect(() => {
    return () => abortControllerRef.current?.abort('abort');
  }, [fetchData]);

  return { weather, loading, error, fetchData };
}
