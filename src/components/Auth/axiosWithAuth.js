import axios from "axios";
import { liveURL } from "../../BaseURLs";

const instance = axios.create({
  baseURL: liveURL,
});

instance.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
