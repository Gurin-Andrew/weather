import axios from "axios";

export const API_URL = "http://WEATHER_HOST";

export const api = axios.create({
  baseURL: API_URL,
});
