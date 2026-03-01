import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// ✅ Attach Clerk JWT automatically
axiosInstance.interceptors.request.use(async (config) => {
  const clerk = (window as any).Clerk;

  if (clerk?.session) {
    const token = await clerk.session.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});