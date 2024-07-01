import { http, HttpResponse } from "msw";
import { API_URL } from "../http";
import usersMock from "./responces/users.json";
import weatherMock from "./responces/weather.json";
export const handlers = [
  http.get(`${API_URL}/users`, () => {
    return HttpResponse.json(usersMock);
  }),

  http.get(`${API_URL}/weather`, () => {
    return HttpResponse.json(weatherMock);
  }),

  http.post(`${API_URL}/weather`, async ({ request }) => {
    const data = await request.json();

    return HttpResponse.json(data);
  }),
  http.delete(`${API_URL}/weather/:id`, (resolver) => {
    const data = resolver.params;

    console.log("delete weather request intercepted");
    return HttpResponse.json(data);
  }),
];
