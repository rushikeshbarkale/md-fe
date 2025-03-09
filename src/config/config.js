// Set API base URL dynamically
const BASE_API_URL =
  import.meta.env.VITE_API_URL_PROD && window.location.hostname !== "localhost"
    ? import.meta.env.VITE_API_URL_PROD
    : import.meta.env.VITE_API_URL_LOCAL;

// Append `/api` dynamically
export const API_URL = `${BASE_API_URL}api/`;
