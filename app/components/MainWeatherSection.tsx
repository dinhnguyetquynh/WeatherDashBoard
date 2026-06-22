import { Box, Typography, Stack, Grid } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { WeatherCard, WeatherCardSkeleton, MiniStatusCard } from "./WeatherUI";

interface MainWeatherSectionProps {
  locationType: "current" | "map";
  loading: boolean;
  weather: any;
}

export default function MainWeatherSection({ locationType, loading, weather }: MainWeatherSectionProps) {
  return (
    // Đổi thành md: 6 để chia đôi 50% màn hình
    <Grid size={{ xs: 12, md: 6 }}>
      
      {/* Thêm Stack và fix cứng height: 40px để ngang hàng với thẻ bên kia */}
      <Stack direction="row" sx={{ alignItems: 'center', mb: 2, height: '40px' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#94a3b8', display: 'flex', alignItems: 'center', textTransform: 'uppercase', letterSpacing: '1px' }}>
          <LocationOnIcon fontSize="small" sx={{ mr: 0.5, color: locationType === "current" ? '#38bdf8' : '#fbbf24' }} /> 
          {locationType === "current" ? "Vị trí của bạn" : "Điểm trên bản đồ"}
        </Typography>
      </Stack>
      
      {/* Fix cứng height: 450 để bằng với chiều cao bản đồ */}
      <Box sx={{ height: 450 }}>
        {loading ? (
          <WeatherCardSkeleton showForecast={true} />
        ) : weather ? (
          <WeatherCard 
            weather={weather} 
            type={locationType} 
            showForecast={true} 
            customLabel={locationType === "current" ? "VỊ TRÍ CỦA TÔI" : "ĐIỂM ĐÃ CHỌN"} 
          />
        ) : (
          <MiniStatusCard message="Đang chờ dữ liệu vị trí..." />
        )}
      </Box>
    </Grid>
  );
}