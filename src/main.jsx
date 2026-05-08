/**
 * main.jsx
 * React entry point. Mounts <App /> into the #root DOM node.
 * Configure any global providers here (e.g. StrictMode).
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");

if (!container) {
  throw new Error(
    "[CalorieQuest] Could not find #root element. Check your index.html."
  );
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);
