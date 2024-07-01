import { useState } from "react";
import { WeatherModel } from "../../models/weather";
import { Modal } from "../modal";
import { AddWeatherForm } from "./UI/add-weather-form";
import { WeatherTable } from "./UI/weather-table";
import { useWeatherMutation } from "./lib/hooks/useWeatherMutation";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "primereact/button";

export const Weather: React.FC = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const queryClient = useQueryClient();
  const { addWeather } = useWeatherMutation(queryClient);
  return (
    <>
      <WeatherTable />
      <Button label="Add weather" onClick={() => setIsModalActive(true)} />
      <Modal
        active={isModalActive}
        setActive={() => setIsModalActive(true)}
        children={
          <AddWeatherForm
            onSubmit={(weather: Omit<WeatherModel, "id">) => {
              addWeather(weather);
              setIsModalActive(false);
            }}
            onClose={() => setIsModalActive(false)}
          />
        }
      />
    </>
  );
};
