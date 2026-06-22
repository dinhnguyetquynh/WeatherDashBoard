"use client";
import { Box, Card, CardContent, Typography, Divider, Stack, Skeleton } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useWeatherPolling } from "../hooks/useWeatherStream";

// --- 1. SKELETON ---
export const WeatherCardSkeleton = ({ showForecast = false }: { showForecast?: boolean }) => (
  <Card elevation={0} sx={{ height: '100%', borderRadius: 3, border: '1px solid #334155', bgcolor: '#1e293b' }}>
    <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 2 }}>
        <Skeleton variant="circular" width={20} height={20} sx={{ bgcolor: '#334155' }} />
        <Skeleton variant="text" sx={{ fontSize: '1.2rem', bgcolor: '#334155', flexGrow: 1, maxWidth: '60%' }} />
      </Stack>
      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Skeleton variant="circular" width={36} height={36} sx={{ bgcolor: '#334155' }} />
          <Skeleton variant="text" width={100} height={60} sx={{ bgcolor: '#334155' }} />
        </Box>
        <Skeleton variant="rectangular" width={48} height={48} sx={{ bgcolor: '#334155', borderRadius: 2 }} />
      </Stack>
      <Divider sx={{ borderColor: '#334155', my: 1.5 }} />
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Skeleton variant="text" width={80} sx={{ bgcolor: '#334155' }} />
        <Skeleton variant="text" width={80} sx={{ bgcolor: '#334155' }} />
      </Stack>
      {showForecast && (
        <>
          <Divider sx={{ borderColor: '#334155', my: 2 }} />
          <Skeleton variant="text" width={120} sx={{ bgcolor: '#334155', mb: 1 }} />
          <Stack direction="row" spacing={1.5}>
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} variant="rectangular" height={105} sx={{ flex: 1, bgcolor: '#334155', borderRadius: 2 }} />
            ))}
          </Stack>
        </>
      )}
    </CardContent>
  </Card>
);

export const MiniStatusCard = ({ message }: { message: string }) => (
  <Card sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: 200, borderRadius: 3, bgcolor: '#1e293b', border: '1px dashed #475569', boxShadow: 'none' }}>
    <Typography variant="body2" sx={{ fontWeight: 600, color: '#94a3b8', textAlign: 'center' }}>{message}</Typography>
  </Card>
);

// --- 2. FORECAST WIDGET ---
export const ForecastWidget = ({ forecastDays }: { forecastDays: any[] }) => {
  if (!forecastDays || forecastDays.length === 0) return null;
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="caption" sx={{ fontWeight: 700, color: '#94a3b8', display: 'flex', alignItems: 'center', mb: 1 }}>
        <CalendarMonthIcon fontSize="small" sx={{ mr: 0.5 }} /> DỰ BÁO 3 NGÀY TỚI
      </Typography>
      <Stack direction="row" spacing={1.5} sx={{ overflowX: 'auto', pb: 1 }}>
        {forecastDays.map((day: any, index: number) => (
          <Box key={index} sx={{ flex: 1, minWidth: '80px', p: 1.5, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid #334155', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ color: '#cbd5e1', mb: 0.5 }}>
              {new Date(day.date).toLocaleDateString('vi-VN', { weekday: 'short' })}
            </Typography>
            <img src={day.day.condition.icon} alt="icon" style={{ width: 32, height: 32, marginBottom: 4 }} />
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#f8fafc' }}>{day.day.maxtemp_c}°</Typography>
            <Typography variant="caption" sx={{ color: '#64748b' }}>{day.day.mintemp_c}°</Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

// --- 3. MAIN WEATHER CARD ---
export const WeatherCard = ({ weather, city, type, showForecast = false, customLabel }: { weather: any, city: string | null, type: "current" | "map" | "city", showForecast?: boolean, customLabel?: string }) => {
  const cardStyles = {
    current: { border: '1px solid', borderColor: '#38bdf8', bg: 'rgba(56, 189, 248, 0.05)', iconColor: '#38bdf8' }, 
    map: { border: '1px solid', borderColor: '#fbbf24', bg: 'rgba(251, 191, 36, 0.05)', iconColor: '#fbbf24' },    
    city: { border: '1px solid', borderColor: '#334155', bg: '#1e293b', iconColor: '#94a3b8' }                        
  }[type];

  return (
    <Card elevation={0} sx={{ height: '100%', borderRadius: 3, border: cardStyles.border, borderColor: cardStyles.borderColor, bgcolor: cardStyles.bg, transition: 'all 0.2s ease-in-out', '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' } }}>
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        <Stack direction="row" spacing={1} sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <LocationOnIcon sx={{ color: cardStyles.iconColor, fontSize: 20 }} />
          <Box sx={{ flexGrow: 1 }}>
            {customLabel && <Typography variant="caption" sx={{ color: cardStyles.iconColor, fontWeight: 700, display: 'block', mb: -0.5 }}>{customLabel}</Typography>}
            <Typography variant="subtitle1" noWrap sx={{ fontWeight: 700, color: '#f8fafc' }}>{city}</Typography>
          </Box>
          <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>{weather.location.country}</Typography>
        </Stack>

        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ThermostatIcon sx={{ fontSize: 36, color: type === 'city' ? '#f59e0b' : cardStyles.iconColor, ml: -0.5 }} />
            <Typography variant="h3" sx={{ fontWeight: 800, color: '#f8fafc' }}>{weather.current.temp_c}°C</Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <img src={weather.current.condition.icon} alt="weather icon" style={{ width: 48, height: 48 }} />
            <Typography variant="caption" sx={{ display: 'block', fontWeight: 600, color: '#e2e8f0' }}>{weather.current.condition.text}</Typography>
          </Box>
        </Stack>

        <Divider sx={{ borderColor: '#334155', my: 1.5 }} />

        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <OpacityIcon sx={{ color: '#7dd3fc', fontSize: 16 }} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#94a3b8' }}>Ẩm: {weather.current.humidity}%</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <AirIcon sx={{ color: '#fcd34d', fontSize: 16 }} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#94a3b8' }}>Gió: {weather.current.wind_kph} km/h</Typography>
          </Box>
        </Stack>

        {showForecast && weather.forecast?.forecastday && (
          <>
            <Divider sx={{ borderColor: '#334155', my: 2 }} />
            <ForecastWidget forecastDays={weather.forecast.forecastday} />
          </>
        )}
      </CardContent>
    </Card>
  );
};

// --- 4. WRAPPER CHO 6 THÀNH PHỐ SỬ DỤNG POLLING ---
export const CityWeatherCardWrapper = ({ cityName }: { cityName: string }) => {
  const { weather, loading } = useWeatherPolling(cityName);

  if (loading) return <WeatherCardSkeleton />;
  if (!weather) return <MiniStatusCard message={`Đang tải dữ liệu ${cityName}...`} />;
  
  return <WeatherCard weather={weather} city={cityName} type="city" />;
};