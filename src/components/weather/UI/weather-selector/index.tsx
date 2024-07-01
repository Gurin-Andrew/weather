import sunny from "../../../../assets/sunny.svg";
import cloudy from "../../../../assets/cloudy.svg";
import rainy from "../../../../assets/rainy.svg";
import snowy from "../../../../assets/snowy.svg";
import thunder from "../../../../assets/thunder.svg";
import heavyRain from "../../../../assets/rainy-high.svg";
import "./style.sass";
import { Dropdown, DropdownProps } from "primereact/dropdown";

import React from "react";
import { EWeather } from "../../lib/types/weather";

const weatherOptionTemplate = (option: WeatherWithIcon) => {
  return (
    <div className="weather-with-icon">
      <div>{option.weather}</div>
      <img alt={option.weather} src={option.imgPath} width={40} height={40} />
    </div>
  );
};
const weatherValueTemplate = (
  option: WeatherWithIcon,
  props: DropdownProps
) => {
  if (Boolean(option) && option.weather) {
    return (
      <div className="weather-with-icon">
        <div>{option.weather}</div>
        <img alt={option.weather} src={option.imgPath} width={40} height={40} />
      </div>
    );
  }

  return <span>{props.placeholder}</span>;
};

const weatherOptionswithIcons: WeatherWithIcon[] = [
  {
    weather: EWeather.THUNDER,
    imgPath: thunder,
  },
  {
    weather: EWeather.CLOUDY,
    imgPath: cloudy,
  },
  {
    weather: EWeather.GENTLE_RAIN,
    imgPath: rainy,
  },
  {
    weather: EWeather.HEAVYRAIN,
    imgPath: heavyRain,
  },
  {
    weather: EWeather.SNOWY,
    imgPath: snowy,
  },
  { weather: EWeather.SUNNY, imgPath: sunny },
];
interface WeatherWithIcon {
  weather: EWeather;
  imgPath: string;
}
interface Props {
  selectedWeather: EWeather | null;
  onSelect: (weather: EWeather) => void;
}
export const WeatherSelector: React.FC<Props> = React.memo(
  ({ selectedWeather, onSelect }) => {
    const weather =
      weatherOptionswithIcons?.find(
        (item) => item.weather === selectedWeather
      ) || null;
    return (
      <Dropdown
        required
        value={weather}
        onChange={(e) => onSelect(e.value.weather)}
        itemTemplate={weatherOptionTemplate}
        options={weatherOptionswithIcons}
        valueTemplate={weatherValueTemplate}
        optionLabel="weather"
        placeholder="select weather"
      />
    );
  }
);
