import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthProvider, Storage } from "@asgardeo/auth-react";
import { TokenExchangePlugin } from "@asgardeo/token-exchange-plugin";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import authConfig from "./config";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthProvider
    config={{
      ...authConfig,
      storage: "sessionStorage" as Storage.SessionStorage,
    }}
    plugin={TokenExchangePlugin.getInstance()}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
