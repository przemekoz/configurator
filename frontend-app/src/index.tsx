import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/js/dist/alert.js";
import "bootstrap/js/dist/base-component.js";
import "bootstrap/js/dist/button.js";
import "bootstrap/js/dist/collapse.js";
import "bootstrap/js/dist/dropdown.js";
import "bootstrap/js/dist/modal.js";
import "bootstrap/js/dist/offcanvas.js";
import "bootstrap/js/dist/popover.js";
import "bootstrap/js/dist/tab.js";
import "bootstrap/js/dist/toast.js";
import "bootstrap/js/dist/tooltip.js";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
