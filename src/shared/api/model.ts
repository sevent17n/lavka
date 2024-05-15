import axios from "axios";
import Cookies from "js-cookie";
import { getAuthRoute } from "../../config";

const BASE_URL = import.meta.env.VITE_API_URL + "/api";

export const $public_api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  },
});

export const $api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  },
});

export const REFRESH_TOKEN = "refreshToken";

export const ACCESS_TOKEN = "accessToken";

$api.interceptors.request.use(async (config) => {
  const accessToken = Cookies.get(ACCESS_TOKEN);

  config.headers.Authorization = `Bearer ${accessToken ?? ""}`;

  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error?.response?.status == 401 &&
      error?.config &&
      !error?.config?._isRetry
    ) {
      originalRequest._isRetry = true;
      const refreshToken = Cookies.get(REFRESH_TOKEN);
      if (refreshToken) {
        try {
          const { data } = await $public_api.post(getAuthRoute("/refresh"), {
            refreshToken: refreshToken,
          });

          Cookies.set(ACCESS_TOKEN, data.accessToken, { expires: 9999999 });
          Cookies.set(REFRESH_TOKEN, data.refreshToken, { expires: 9999999 });

          return await $api.request(originalRequest);
        } catch (e) {
          throw new Error("User is not authorized");
        }
      }
    }
    throw error;
  }
);
