import axios from "axios";
import { liveURL, testURL } from "../../BaseURLs";

const instance = axios.create({
  baseURL: testURL,
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
