export const removeVietnameseTones = (str: string): string => {
  return str.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "D")
    .replace(/[^a-zA-Z0-9 ]/g, "");
};

export const getCleanCityName = async (lat: number, lng: number): Promise<{ cleanCity: string, detailedCity: string }> => {
  try {
    const osmUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    const response = await fetch(osmUrl, { headers: { 'User-Agent': 'WeatherApp/1.0' } });
    const { address: { city, town, village, state, country } } = await response.json();
    const rawCityName = city || town || village || state || country || "Unknown";
    const detailedCity = [city, town, village, state, country].filter(e => !!e).join(", ");
    return { cleanCity: removeVietnameseTones(rawCityName), detailedCity: detailedCity || "Unknown" };
  } catch (error) {
    console.error("Lỗi ngược định vị địa lý:", error);
    return { cleanCity: "Ho Chi Minh", detailedCity: "Ho Chi Minh, Vietnam" };
  }
};
