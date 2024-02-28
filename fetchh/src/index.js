import React from "react";
import ReactDOM from "react-dom";
// import ReactDOM from "react-dom";
import { createRoot, unstable_createSyncRoot } from "react-dom/client";

import App from "./App";
import "bootstrap";
import { BrowserRouter } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
// const rootElement = document.getElementById("root");
// rootElement.render(<App />)
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    ,
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
