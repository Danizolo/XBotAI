/**
 * @description      :
 * @author           : DHANUSH
 * @group            :
 * @created          : 28/10/2025 - 13:00:52
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 28/10/2025
 * - Author          : DHANUSH
 * - Modification    :
 **/
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
