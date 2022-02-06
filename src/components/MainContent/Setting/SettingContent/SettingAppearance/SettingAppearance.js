import { useContext } from "react";
import InputRadio from "../../../../UI/InputRadio/InputRadio";
import DisplayThemeContext from "../../../../../store/displayTheme/displayTheme--context";
import style from "./SettingAppearance.module.css";

function SettingAppearance() {
  const { displayTheme, setDisplayTheme } = useContext(DisplayThemeContext);

  function displayThemeRadioChangeHandler(e) {
    setDisplayTheme(e.target.value);
  }

  return (
    <div className={style.container}>
      <p className={`${style.subtitle} capitalize`}>display theme</p>

      <div className={style["radio__container"]}>
        <InputRadio
          classInput={style.input}
          classLabel={`${style.label} ${style.light} uppercase`}
          id="light"
          label="light"
          name="theme"
          value="light"
          onChange={displayThemeRadioChangeHandler}
          checked={displayTheme === "light"}
        />
        <InputRadio
          classInput={style.input}
          classLabel={`${style.label} ${style.dark} uppercase`}
          id="dark"
          label="dark"
          name="theme"
          value="dark"
          onChange={displayThemeRadioChangeHandler}
          checked={displayTheme === "dark"}
        />
      </div>
    </div>
  );
}

export default SettingAppearance;
