import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import DisplayThemeProvider from "./store/displayTheme/DisplayThemeProvider";
import UserDataProvider from "./store/userInfo/userInfoProvider";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <UserDataProvider>
      <DisplayThemeProvider>
        <App />
      </DisplayThemeProvider>
    </UserDataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
