import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchGeoLocation, fetchWeather } from '../api/client';
import type { Weather } from '../api/types';

export type WeatherError = 'GeoLocation' | 'Weather';

export function useWeather() {
  const [weather, setWeather] = useState<Weather>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<WeatherError>(null);
  const abortControllerRef = useRef<AbortController>(null);

  const fetchData = useCallback(
    async (city: string, onError?: (city: string) => void) => {
      abortControllerRef.current?.abort('abort');

      setLoading(true);
      setError(null);

      const abortController = new AbortController();
      abortControllerRef.current = abortController;
      const signal = abortController.signal;

      let geoLocationSuccess = false;
      let weatherSuccess = false;

      try {
        const geoLocation = await fetchGeoLocation({ signal, city });
        if (!geoLocation) throw new Error();
        geoLocationSuccess = true;

        const weather = await fetchWeather({
          signal,
          lat: geoLocation.lat,
          lon: geoLocation.lon,
        });
        weatherSuccess = true;

        setWeather(weather);
      } catch (error) {
        if (error === 'abort') return;

        if (!geoLocationSuccess) {
          setError('GeoLocation');
          onError?.(city);
        } else if (!weatherSuccess) {
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
