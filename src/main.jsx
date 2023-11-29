import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./routes";
import "bootstrap/dist/css/bootstrap.min.css"; //mengimport bootstrap

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
