import { useEffect, useState } from "react";

// Mumbai — Maharashtra's largest city, used as the state's reference point
const MAHARASHTRA_LAT = 19.076;
const MAHARASHTRA_LON = 72.8777;

export function useWeather() {
  const [tempC, setTempC] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${MAHARASHTRA_LAT}&longitude=${MAHARASHTRA_LON}&current_weather=true`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && typeof data?.current_weather?.temperature === "number") {
          setTempC(Math.round(data.current_weather.temperature));
        }
      })
      .catch(() => {
        // weather is decorative — fail silently, the sun still renders without it
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return tempC;
}
