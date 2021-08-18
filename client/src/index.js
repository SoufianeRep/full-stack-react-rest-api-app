import React from "react";
import ReactDOM from "react-dom";
import "../src/styles/reset.css";
import "../src/styles/global.css";
import { Provider } from "./context/Context";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
