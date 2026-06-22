import { Typography } from "@mui/material";
import CloudQueueIcon from '@mui/icons-material/CloudQueue';

export default function DashboardHeader() {
  return (
    <Typography variant="h4" sx={{ fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', mb: 4 }}>
      <CloudQueueIcon sx={{ fontSize: 40, mr: 1.5, color: '#38bdf8' }} />
      Thời Tiết Trực Tuyến
    </Typography>
  );
}