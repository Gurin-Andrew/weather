import { api } from "../http";
import { WeatherModel } from "../models/weather";

export class WeatherService {
  static async getWeather() {
    const responce = await api.get<WeatherModel[]>("/weather");
    return responce.data;
  }
  static async addWeather(weather: Omit<WeatherModel, "id">) {
    const responce = await api.post<WeatherModel>("/weather", { ...weather });
    return responce.data;
  }

  static async deleteWeather(id: number) {
    const responce = await api.delete<{ id: number }>(`/weather/${id}`);
    return responce.data;
  }
}
