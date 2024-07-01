import { UserModel } from "../../../../models/user";
import { WeatherModel } from "../../../../models/weather";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { EWeather } from "../../lib/types/weather";

import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { useUsers } from "../../../../hooks/useUsers";
import { InputText } from "primereact/inputtext";

import "./style.sass";
import { Button } from "primereact/button";
import { WeatherSelector } from "../weather-selector";
interface Weather extends Omit<WeatherModel, "id"> {}
interface Props {
  onSubmit: (weather: Weather) => void;
  onClose: () => void;
}

export const AddWeatherForm: React.FC<Props> = ({ onSubmit, onClose }) => {
  const [weather, setWether] = useState<EWeather | null>(null);
  const [user, setUser] = useState<UserModel | null>(null);
  const { data: users, isLoading: isUsersLoading } = useUsers();
  const [tempreture, setTempreture] = useState<number | null>(null);

  return (
    <>
      {
        <form
          className="add-weather-form"
          onSubmit={(e) => {
            e.preventDefault();
            const weatherObj = {
              date: new Date().toUTCString(),
              weather: weather,
              author: user,
              tempreture: tempreture,
              comment: e.currentTarget.comment.value,
            };
            onSubmit(weatherObj as Weather);
          }}
        >
          <div className="form-group">
            <div className="form-group-item">
              <FloatLabel>
                <InputNumber
                  value={tempreture}
                  onChange={(e) => setTempreture(e.value || null)}
                  required
                  id="tempreture"
                  min={-50}
                  max={60}
                  maxFractionDigits={2}
                />
                <label htmlFor="tempreture">Tempreture, °C </label>
              </FloatLabel>
            </div>
            <div className="form-group-item">
              <WeatherSelector selectedWeather={weather} onSelect={setWether} />
            </div>
            <div className="form-group-item">
              <Dropdown
                required
                className="user-dropdown"
                loading={isUsersLoading}
                value={user}
                onChange={(e) => setUser(e.value)}
                options={users}
                optionLabel="name"
                placeholder="Select a User"
              />
              <></>
            </div>

            <div className="form-group-item">
              <FloatLabel>
                <InputText id="comment" />
                <label htmlFor="commment">Comment</label>
              </FloatLabel>
            </div>
          </div>

          <div>
            <Button type="submit" label="Submit" />
            <Button label="Cancel" onClick={onClose} />
          </div>
        </form>
      }
    </>
  );
};
