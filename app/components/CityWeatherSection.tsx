import { Box, Typography, Grid } from "@mui/material";
import BusinessIcon from '@mui/icons-material/Business';
import { CityWeatherCardWrapper } from "./WeatherUI";

const CITIES = ["Ho Chi Minh", "Hanoi", "Da Nang", "Hai Phong", "Can Tho", "Hue"];
export default function CityWeatherSection() {
  return (
    <Grid size={{ xs: 12 }}>
      <Box sx={{ mt: 4 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#94a3b8', display: 'flex', alignItems: 'center', mb: 3, textTransform: 'uppercase', letterSpacing: '1px' }}>
          <BusinessIcon fontSize="small" sx={{ mr: 0.5, color: '#f43f5e' }} /> Đô thị trọng điểm
        </Typography>

        <Grid container spacing={3}>
          {CITIES.map(city => (
            <Grid key={city} size={{ xs: 12, sm: 6, md: 4 }}>
              <CityWeatherCardWrapper cityName={city} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
}