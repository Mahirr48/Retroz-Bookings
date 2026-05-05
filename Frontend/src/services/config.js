export const BACKEND_URL =
  import.meta.env.VITE_API_URL || "https://retroz-bookings-backend.onrender.com";

export const API_BASE_URL = `${BACKEND_URL}/api`;

export const getAssetUrl = (path) => {
  if (!path) return "/fallback.jpg";
  if (path.startsWith("http")) return path;
  return `${BACKEND_URL}${path}`;
};
