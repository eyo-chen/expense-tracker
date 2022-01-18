import { useContext } from "react";
import InputRadio from "../../../../UI/InputRadio/InputRadio";
import DisplayThemeContext from "../../../../../store/displayTheme/displayTheme--context";
import { FaRegSun } from "react-icons/fa";
import { BsMoon } from "react-icons/bs";
import style from "./SettingAppearance.module.css";

function SettingAppearance(props) {
  const { displayTheme, setDisplayTheme } = useContext(DisplayThemeContext);

  function displayThemeRadioChangeHandler(e) {
    setDisplayTheme(e.target.value);
  }

  return (
    <form className={style.form}>
      <p className={style.subtitle}>display theme</p>
      <div className={style["radio__container"]}>
        <InputRadio
          classInput={style.input}
          classLabel={`${style.label} ${style.light}`}
          id="light"
          label="light"
          name="theme"
          value="light"
          onChange={displayThemeRadioChangeHandler}
          checked={displayTheme === "light"}
        />
        <InputRadio
          classInput={style.input}
          classLabel={`${style.label} ${style.dark}`}
          id="dark"
          label="dark"
          name="theme"
          value="dark"
          onChange={displayThemeRadioChangeHandler}
          checked={displayTheme === "dark"}
        />
      </div>
    </form>
  );
}

export default SettingAppearance;
