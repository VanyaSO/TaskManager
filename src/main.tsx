import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/globals.scss";
import { Dashboard } from "./pages/Dashboard/Dashboard.tsx";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <Provider store={store}>
          <Dashboard />
      </Provider>
  </StrictMode>,
);
