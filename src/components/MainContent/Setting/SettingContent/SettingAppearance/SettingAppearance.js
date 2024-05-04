import { useState, useContext, useEffect } from "react";
import InputRadio from "../../../../UI/InputRadio/InputRadio";
import DisplayThemeContext from "../../../../../store/displayTheme/displayTheme--context";
import styles from "./SettingAppearance.module.css";

function SettingAppearance() {
  const [displayThemeState, setDisplayThemeState] = useState("light");
  const { displayTheme, setDisplayTheme } = useContext(DisplayThemeContext);

  async function changeDisplayThemeHandler(e) {
    const newDisplayTheme = e.target.value;
    setDisplayThemeState(newDisplayTheme);
  }

  useEffect(() => {
    localStorage.setItem("displayTheme", displayThemeState);
    setDisplayTheme(displayThemeState);
  }, [displayThemeState]);

  return (
    <div className={styles.container}>
      <p className={`${styles.subtitle} capitalize`}>display theme</p>

      <div className={styles["radio__container"]}>
        <InputRadio
          classInput={styles.input}
          classLabel={`${styles.label} ${styles.light} uppercase`}
          id="light"
          label="light"
          name="theme"
          value="light"
          onChange={changeDisplayThemeHandler}
          checked={displayTheme === "light"}
        />
        <InputRadio
          classInput={styles.input}
          classLabel={`${styles.label} ${styles.dark} uppercase`}
          id="dark"
          label="dark"
          name="theme"
          value="dark"
          onChange={changeDisplayThemeHandler}
          checked={displayTheme === "dark"}
        />
      </div>
    </div>
  );
}

export default SettingAppearance;
