export const BACKEND_URL =
  import.meta.env.VITE_API_URL || "https://hotel-booking-backend-ztne.onrender.com";

export const API_BASE_URL = `${BACKEND_URL}/api`;

export const getAssetUrl = (path) => {
  if (!path) return "/fallback.jpg";
  if (path.startsWith("http")) return path;
  return `${BACKEND_URL}${path}`;
};
