import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import DisplayThemeProvider from "./store/displayTheme/DisplayThemeProvider";
import App from "./App";

console.log("aaa");
ReactDOM.render(
  <React.StrictMode>
    <DisplayThemeProvider>
      <App />
    </DisplayThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
