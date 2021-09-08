import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "../src/styles/reset.css";
import "../src/styles/global.css";
import { Provider } from "./context/Context";
import { CookiesProvider } from "react-cookie";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
