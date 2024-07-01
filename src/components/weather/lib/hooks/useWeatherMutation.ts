import { QueryClient, useMutation } from "@tanstack/react-query";
import { WeatherModel } from "../../../../models/weather";
import { WeatherService } from "../../../../server/WeatherService";

export const useWeatherMutation = (queryClient: QueryClient) => {
  const { mutate: addWeather, isError: addWeatherError } = useMutation({
    mutationFn: WeatherService.addWeather,
    onSuccess: (responce) => {
      queryClient.setQueryData<WeatherModel[]>(["weather"], (oldWeather) => {
        // по идее бек должен отдавать новый id, но у нас мок поэтому здесь костыль
        const lastid = oldWeather?.length
          ? oldWeather[oldWeather.length - 1]?.id + 1
          : 0;
        return [...(oldWeather || []), { ...responce, id: lastid }];
      }),
        queryClient.invalidateQueries({
          queryKey: ["weather"],
          refetchType: "none",
        });
    },
  });

  const { mutate: deleteWeather, isError: deleteWeatherError } = useMutation({
    mutationFn: WeatherService.deleteWeather,
    onSuccess: (responce) => {
      queryClient.setQueryData<WeatherModel[]>(["weather"], (oldWeather) => {
        const filtred = [...(oldWeather || [])].filter(
          ({ id }) => Number(id) !== Number(responce.id)
        );

        return filtred;
      });
      queryClient.invalidateQueries({
        queryKey: ["weather"],
        refetchType: "none",
      });
    },
  });
  return {
    addWeather,
    deleteWeather,
    deleteWeatherError,
    addWeatherError,
  };
};
