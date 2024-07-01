import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { PrimeReactProvider } from "primereact/api";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "primereact/resources/themes/bootstrap4-light-purple/theme.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

async function enableMocking() {
  const { worker } = await import("./mocks/browser");
  return worker.start();
}
const queryClient = new QueryClient();
enableMocking().then(() =>
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <PrimeReactProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </PrimeReactProvider>
    </React.StrictMode>
  )
);
