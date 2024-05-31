import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import DisplayThemeProvider from "./store/displayTheme/DisplayThemeProvider";
import UserInfoProvider from "./store/userInfo/UserInfoProvider"
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <DisplayThemeProvider>
      <UserInfoProvider>
        <App />
      </UserInfoProvider>
    </DisplayThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
