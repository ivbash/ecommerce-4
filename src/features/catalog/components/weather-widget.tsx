import { useCallback, useEffect, useRef, useState } from 'react';
import { CrossIcon } from '@/shared/components/icons/cross-icon';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Modal } from '@/shared/components/ui/modal';
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
          fetchData(city, handleGeoLocationError, (city) => setCity(city));
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
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleModalClose = useCallback(() => setIsOpenModal(false), []);

  if (!weather) {
    return (
      <div>
        <div className="text-2xl font-medium">-- °C</div>
      </div>
    );
  }

  const temp = kelvinToCelsius(weather.main.temp).toFixed(1);
  const feelsLike = kelvinToCelsius(weather.main.feels_like).toFixed(1);
  const description = weather.weather[0]?.description ?? '';
  const city = weather.name;
  const humidity = weather.main.humidity;
  const pressure = hectoPascalToMillimetreOfMercury(
    weather.main.pressure,
  ).toFixed(0);

  return (
    <div>
      <div className="text-2xl font-medium">{temp} °C</div>
      <div className="flex items-center gap-3">
        <span>Ощущается: {feelsLike} °C</span>
        <Button
          type="button"
          variant="secondary"
          className="px-1 py-px text-xs"
          onClick={() => setIsOpenModal(true)}
        >
          Подробно
        </Button>
        <Modal open={isOpenModal} onClose={handleModalClose}>
          <h2 className="text-2xl font-medium">Погода</h2>
          <h3 className="mb-1.5 text-lg text-muted">{city}</h3>
          <p className="text-xl font-medium">{temp} °C</p>
          <p className="mb-1 text-lg font-medium">{description}</p>
          <p>Ощущается: {feelsLike} °C</p>
          <p>Влажность: {humidity}%</p>
          <p>Давление: {pressure} мм рт.ст.</p>
        </Modal>
      </div>
    </div>
  );
}

function kelvinToCelsius(temp) {
  return temp - 273.15;
}

function hectoPascalToMillimetreOfMercury(pres) {
  return pres / 1.333;
}
