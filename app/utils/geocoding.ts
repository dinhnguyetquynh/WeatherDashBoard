export const removeVietnameseTones = (str: string): string => {
  return str.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "D")
    .replace(/[^a-zA-Z0-9 ]/g, "");
};

export const getCleanCityName = async (lat: number, lng: number): Promise<string> => {
  try {
    const osmUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    const response = await fetch(osmUrl, { headers: { 'User-Agent': 'WeatherApp/1.0' } });
    const data = await response.json();
    const rawCityName = data.address.city || data.address.town || data.address.village || data.address.state || "Vietnam";
    return removeVietnameseTones(rawCityName);
  } catch (error) {
    console.error("Lỗi ngược định vị địa lý:", error);
    return "Ho Chi Minh";
  }
};