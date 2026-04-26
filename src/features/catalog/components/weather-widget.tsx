import { useEffect, useRef, useState } from 'react';
import { CrossIcon } from '@/shared/components/icons/cross-icon';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import type { Weather } from '../api/types';
import { useWeather, type GeoLocationParams } from '../hooks/use-weather';

const defaultCity = 'Тюмень';

export function WeatherWidget({ onClose }: { onClose?: () => void }) {
  const [city, setCity] = useState('');
  const [fetchedCity, setFetchedCity] = useState('');
  const wrongCitiesRef = useRef<string[]>([]);

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(value);

    if (wrongCitiesRef.current.includes(value)) {
      setFetchedCity(value);
    } else {
      setFetchedCity('');
    }
  };

  const { weather, error, loading, fetchData } = useWeather();

  const handleGeoLocationError = (city: GeoLocationParams) => {
    setCity('');

    if (typeof city !== 'string') return;
    setFetchedCity(city);

    if (!wrongCitiesRef.current.includes(city)) {
      wrongCitiesRef.current.push(city);
    }
  };

  useEffect(() => {
    const geolocation = navigator.geolocation;
    geolocation.getCurrentPosition(
      ({ coords }) => {
        fetchData(
          { lat: coords.latitude, lon: coords.longitude },
          handleGeoLocationError,
          (city) => setCity(city),
        );
      },
      () => {
        setCity(defaultCity);
        fetchData(defaultCity, handleGeoLocationError);
      },
    );
  }, [fetchData]);

  return (
    <div className="relative rounded-lg border border-border bg-background p-4 text-sm font-normal text-foreground">
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        className="absolute top-2 right-2 z-10"
        onClick={onClose}
      >
        <CrossIcon />
      </Button>
      {loading ? (
        <WeatherSkeleton />
      ) : (
        <>
          <WeatherBlock weather={weather} />
          {error === 'Weather' && (
            <p className="text-xs text-red-500">Не удалось получить данные</p>
          )}
        </>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchData(city, handleGeoLocationError);
        }}
      >
        <Input
          type="text"
          className="mt-2 px-2 py-1.5 text-sm"
          value={city}
          onChange={handleCityChange}
          disabled={loading}
        />
        {fetchedCity && (
          <p className="text-xs text-red-500">
            Не удалось получить данные для города {fetchedCity}
          </p>
        )}
        <Button
          type="submit"
          className="mt-2 px-2 py-1 text-sm"
          disabled={loading}
        >
          Получить погоду
        </Button>
      </form>
    </div>
  );
}

function WeatherSkeleton() {
  return (
    <div className="animate-pulse space-y-1.5 py-1">
      <div className="h-6 w-16 rounded-lg bg-secondary" />
      <div className="h-3.5 w-32 rounded-lg bg-secondary" />
    </div>
  );
}

function WeatherBlock({ weather }: { weather: Weather | null }) {
  if (!weather) {
    return (
      <div>
        <div className="text-2xl font-medium">-- °C</div>
      </div>
    );
  }

  const temp = kelvinToCelsius(weather.main.temp).toFixed(1);
  const feelsLike = kelvinToCelsius(weather.main.feels_like).toFixed(1);

  return (
    <div>
      <div className="text-2xl font-medium">{temp} °C</div>
      <div>Ощущается: {feelsLike} °C</div>
    </div>
  );
}

function kelvinToCelsius(temp) {
  return temp - 273.15;
}
