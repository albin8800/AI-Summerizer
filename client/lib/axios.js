import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true
});


api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        
        const res = await axios.post("http://localhost:4000/api/auth/refresh-token", {}, {
          withCredentials: true
        });

        localStorage.setItem("token", res.data.token);

        
        error.config.headers.Authorization = `Bearer ${res.data.token}`;
        return api(error.config);

      } catch (refreshError) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
