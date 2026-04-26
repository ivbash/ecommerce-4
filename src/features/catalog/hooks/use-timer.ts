import { useCallback, useEffect, useRef, useState } from 'react';

// Время в миллисекундах
export function useTimer(initialTime = 1000 * 60 * 60 - 1) {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const timerId = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    clearTimeout(timerId.current);
    setIsRunning(false);
  }, []);

  const start = useCallback(() => {
    timerId.current = setInterval(() => {
      setTime((t) => {
        if (t <= 1000) {
          stop();
          return 0;
        }
        return t - 1000;
      });
    }, 1000);
    setIsRunning(true);
  }, [stop]);

  const restart = useCallback(() => {
    setTime(initialTime);
    if (time === 0) start();
  }, [initialTime, start, time]);

  useEffect(() => {
    start();
    return () => stop();
  }, [start, stop]);

  return { time, isRunning, start, stop, restart };
}
