import { useState, useRef, useCallback, useEffect } from "react";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
// Hook 1: Dùng cho Thẻ chính (SSE)
export function useWeatherStream(initialLoading: boolean = false) {
  const [weather, setWeather] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(initialLoading);
  const eventSourceRef = useRef<EventSource | null>(null);


  const connectStream = useCallback((query: string) => {
    if (!query) return;
    setLoading(true);

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }
    
    const streamUrl = `${baseUrl}/api/weather-stream?q=${encodeURIComponent(query.trim())}`;
    const source = new EventSource(streamUrl);
    eventSourceRef.current = source;
    
    source.addEventListener("weather-update", (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        setWeather(parsedData);
      } catch (err) {
        console.error("Lỗi parse JSON:", err);
      } finally {
        setLoading(false);
      }
    });

    source.onerror = (err) => { 
      console.error("Lỗi SSE kết nối kết thúc hoặc thất bại:", err); 
    };
  }, []);

  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  return { weather, loading, setLoading, connectStream };
}

// Hook 2: Dùng cho 6 thành phố tĩnh (REST API + Polling 5 phút)
export function useWeatherPolling(cityName: string) {
  const [weather, setWeather] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchWeather = useCallback(async () => {
    try {
      const res = await fetch(`${baseUrl}/api/weather?q=${encodeURIComponent(cityName)}`);
      if (res.ok) {
        const data = await res.json();
        setWeather(data);
      }
    } catch (error) {
      console.error("Lỗi fetch REST:", error);
    } finally {
      setLoading(false);
    }
  }, [cityName]);

  useEffect(() => {
    fetchWeather(); 
    const interval = setInterval(fetchWeather, 300000); 
    return () => clearInterval(interval);
  }, [fetchWeather]);

  return { weather, loading };
}