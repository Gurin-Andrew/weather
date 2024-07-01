import { useQuery } from "@tanstack/react-query";
import { WeatherService } from "../../../../server/WeatherService";
import { useEffect } from "react";

export const useWeather = () => {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["weather"],
    queryFn: WeatherService.getWeather,
    select: (data) => data,
  });
  useEffect(() => {
    if (isError) console.log("Error");
  }, [isError]);

  return { data, isError, isLoading, refetch };
};
