"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { Box, CssBaseline, ThemeProvider, createTheme, Container, Grid } from "@mui/material";

// Hooks & Utils
import { useWeatherStream } from "./hooks/useWeatherStream";
import { getCleanCityName } from "./utils/geocoding";

// Import 4 Child Components
import DashboardHeader from "./components/DashboardHeader";
import MainWeatherSection from "./components/MainWeatherSection";
import MapSection from "./components/MapSection";
import CityWeatherSection from "./components/CityWeatherSection";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#020617', paper: '#0f172a' },
    text: { primary: '#f8fafc', secondary: '#94a3b8' }
  },
  typography: { fontFamily: 'inherit' }
});

export default function Dashboard() {
  const [clickedCoords, setClickedCoords] = useState<[number, number] | null>(null);
  const [locationType, setLocationType] = useState<"current" | "map">("current"); 
  
  const { weather, loading, setLoading, connectStream } = useWeatherStream(true);
  const isInitialized = useRef(false);
  const [city,setCity] = useState<string | null>(null);

  const fetchCurrentLocation = useCallback(() => {                     
    if (navigator.geolocation) {
      setLoading(true);
      setLocationType("current");
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            setClickedCoords([latitude, longitude]);
            const cleanCityName = await getCleanCityName(latitude, longitude);
            setCity(cleanCityName);
            connectStream(cleanCityName);
          } catch (err) {
            console.error("Lỗi lấy định vị:", err);
            setLoading(false);
          }
        },
        () => setLoading(false),
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
  }, [setLoading, connectStream]);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      fetchCurrentLocation();
    }
  }, [fetchCurrentLocation]);

  const handleMapClick = async (lat: number, lng: number) => {
    setClickedCoords([lat, lng]);
    setLoading(true);
    setLocationType("map");
    try {
      const cleanCityName = await getCleanCityName(lat, lng);
      connectStream(cleanCityName);
    } catch (err) {
      console.error("Lỗi Click bản đồ:", err);
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: '#020617', py: 4 }}>
        <Container maxWidth="xl">
          
          <DashboardHeader />

          <Grid container spacing={4}>
            <MainWeatherSection 
              locationType={locationType} 
              loading={loading} 
              weather={weather} 
              city={city}
            />

            <MapSection 
              fetchCurrentLocation={fetchCurrentLocation} 
              clickedCoords={clickedCoords} 
              handleMapClick={handleMapClick} 
            />
            
            <CityWeatherSection />
          </Grid>
          
        </Container>
      </Box>
    </ThemeProvider>
  );
}