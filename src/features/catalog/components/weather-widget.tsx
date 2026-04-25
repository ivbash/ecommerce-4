import { useEffect, useRef, useState } from 'react';
import { CrossIcon } from '@/shared/components/icons/cross-icon';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { useWeather } from '../hooks/use-weather';

export function WeatherWidget({ onClose }: { onClose?: () => void }) {
  const [city, setCity] = useState('Тюмень');
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

  const handleGeoLocationError = (city) => {
    setCity('');
    setFetchedCity(city);

    if (!wrongCitiesRef.current.includes(city)) {
      wrongCitiesRef.current.push(city);
    }
  };

  useEffect(() => {
    fetchData('Тюмень', handleGeoLocationError);
  }, [fetchData]);

  return (
    <div className="relative rounded-lg border border-border bg-background p-4 text-sm font-normal text-foreground">
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        className="absolute top-2 right-2"
        onClick={onClose}
      >
        <CrossIcon />
      </Button>
      {loading ? (
        'Loading...'
      ) : (
        <>
          {weather && <div>{weather.main.temp}</div>}
          {error === 'Weather' && <p>Не удалось получить данные</p>}
          <Input type="text" value={city} onChange={handleCityChange} />
          {fetchedCity && (
            <p>Не удалось получить данные для города {fetchedCity}</p>
          )}
        </>
      )}
      <Button
        type="button"
        onClick={() => fetchData(city, handleGeoLocationError)}
      >
        Получить погоду
      </Button>
    </div>
  );
}
