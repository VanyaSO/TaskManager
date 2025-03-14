import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/globals.scss";
import { Dashboard } from "./pages/Dashboard/Dashboard.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Dashboard />
  </StrictMode>,
);
