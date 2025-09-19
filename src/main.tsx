import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./app";
import Preloader from "./components/Preloader"; // ✅ import preloader
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Preloader>
      <App />
    </Preloader>
  </StrictMode>
);
