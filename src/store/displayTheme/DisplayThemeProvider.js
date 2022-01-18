import { useState } from "react";
import DisplayThemeContext from "./displayTheme--context";

function DisplayThemeProvider(props) {
  const [displayTheme, setDisplayTheme] = useState("dark");

  return (
    <DisplayThemeContext.Provider value={{ displayTheme, setDisplayTheme }}>
      {props.children}
    </DisplayThemeContext.Provider>
  );
}

export default DisplayThemeProvider;
