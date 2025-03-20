import { createRoot } from "react-dom/client";
import { DashboardView } from "./views/DashboardView/DashboardView.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "antd/dist/reset.css";
import "./shared/assets/styles/globals.scss";
import { Provider } from "react-redux";
import { store } from "./shared/store/store.ts";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <DashboardView />
    </QueryClientProvider>
  </Provider>,
);
