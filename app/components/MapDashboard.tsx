
"use client";
import { useEffect } from "react";
// Thêm hook useMap từ thư viện react-leaflet
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapDashboardProps {
  markerPosition: [number, number] | null;
  onMapClick: (lat: number, lng: number) => void;
}

// 🔥 COMPONENT MỚI: Tự động điều khiển camera và zoom của bản đồ
function MapRecenter({ position }: { position: [number, number] | null }) {
  const map = useMap(); // Lấy đối tượng map thực tế của Leaflet
  
  useEffect(() => {
    if (position) {
      // Sử dụng flyTo để tạo hiệu ứng di chuyển mượt mà đến tọa độ mới kèm mức zoom 13
      map.flyTo(position, 16, {
        animate: true,
        duration: 1.2, // Thời gian hiệu ứng chuyển động (giây)
      });
    }
  }, [position, map]);

  return null; // Component này không cần hiển thị giao diện giao diện
}

export default function MapDashboard({ markerPosition, onMapClick }: MapDashboardProps) {
  
  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        onMapClick(lat, lng);
      },
    });
    return null;
  };

  return (
    <MapContainer 
      center={[10.8231, 106.6297]} // Vị trí mặc định ban đầu khi chưa chọn (Ví dụ: khu vực TP.HCM)
      zoom={16}                    // Khi chưa có địa điểm được chọn, mặc định hiển thị ở mức zoom 13 như bạn muốn
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler />
      
      {/* Kích hoạt tính năng tự động zoom và dịch tâm */}
      <MapRecenter position={markerPosition} />
      
      {markerPosition && <Marker position={markerPosition} icon={defaultIcon} />}
    </MapContainer>
  );
}