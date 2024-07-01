import { EWeather } from "../components/weather/lib/types/weather";
import { UserModel } from "./user";

export type WeatherModel = {
  id: number;
  date: string;
  tempreture: number;
  weather: EWeather;
  comment: string;
  author: UserModel;
};
