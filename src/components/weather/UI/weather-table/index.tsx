import { DataTable } from "primereact/datatable";
import { useWeather } from "../../lib/hooks/useWeather";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useWeatherMutation } from "../../lib/hooks/useWeatherMutation";
import { useQueryClient } from "@tanstack/react-query";

export const WeatherTable: React.FC = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useWeather();
  const { deleteWeather } = useWeatherMutation(queryClient);
  if (!isLoading && !data) return <>Ошибка загрузки</>;

  return (
    <div className="table">
      <DataTable value={data} loading={isLoading} showGridlines>
        <Column
          align="center"
          field="date"
          header="Date"
          sortable
          body={(rowData) => {
            const time = new Date(rowData.date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            const date = new Date(rowData.date).toLocaleDateString();
            return (
              <>
                <div>{date}</div>
                <div>{time}</div>
              </>
            );
          }}
        />
        <Column field="tempreture" header="Temperature" align="center" />
        <Column field="weather" header="Weather" />
        <Column field="comment" header="Comment" />
        <Column field="author.name" header="Author" />
        <Column
          header="Options"
          body={(rowData) => (
            <Button onClick={() => deleteWeather(rowData.id)} label="Delete" />
          )}
        />
      </DataTable>
    </div>
  );
};
