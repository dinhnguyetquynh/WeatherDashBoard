import dynamic from "next/dynamic";
import { Box, Typography, Stack, IconButton, Tooltip, Grid } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MyLocationIcon from '@mui/icons-material/MyLocation';

const MapDashboardWithNoSSR = dynamic<any>(
  () => import("./MapDashboard"),
  { ssr: false }
);

interface MapSectionProps {
  fetchCurrentLocation: () => void;
  clickedCoords: [number, number] | null;
  handleMapClick: (lat: number, lng: number) => void;
}

export default function MapSection({ fetchCurrentLocation, clickedCoords, handleMapClick }: MapSectionProps) {
  return (
    // Đổi thành md: 6 để chia đôi 50% màn hình bằng với thẻ Thời tiết
    <Grid size={{ xs: 12, md: 6 }}>
      
      {/* Fix cứng height: 40px để ngang hàng với thẻ bên kia */}
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2, height: '40px' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#94a3b8', display: 'flex', alignItems: 'center', textTransform: 'uppercase', letterSpacing: '1px' }}>
          <LocationOnIcon fontSize="small" sx={{ mr: 0.5, color: '#10b981' }} /> Bản đồ tương tác
        </Typography>
        <Tooltip title="Vị trí của tôi" placement="top">
          <IconButton onClick={fetchCurrentLocation} sx={{ color: '#38bdf8', bgcolor: 'rgba(56, 189, 248, 0.1)', '&:hover': { bgcolor: 'rgba(56, 189, 248, 0.2)' } }}>
            <MyLocationIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      {/* Fix cứng height: 450 để bằng chiều cao thẻ Thời tiết */}
      <Box sx={{ 
        height: 450,
        borderRadius: 3, 
        border: '1px solid #1e293b',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
      }}>
        <MapDashboardWithNoSSR 
          markerPosition={clickedCoords} 
          onMapClick={handleMapClick} 
        />
      </Box>
    </Grid>
  );
}