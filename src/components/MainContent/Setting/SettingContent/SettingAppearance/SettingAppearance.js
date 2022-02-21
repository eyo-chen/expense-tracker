import { useContext } from "react";
import InputRadio from "../../../../UI/InputRadio/InputRadio";
import DisplayThemeContext from "../../../../../store/displayTheme/displayTheme--context";
import createUserID from "../../../../../Others/CreateUserID/createUserID";
import { db } from "../../../../../firebase-config";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import style from "./SettingAppearance.module.css";

function SettingAppearance() {
  const { displayTheme } = useContext(DisplayThemeContext);
  const [user, userID] = createUserID();
  const userDocRef = doc(db, "users", userID);

  async function changeDisplayThemeHandler(e) {
    await updateDoc(userDocRef, {
      displayTheme: e.target.value,
    });
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
          onChange={changeDisplayThemeHandler}
          checked={displayTheme === "light"}
        />
        <InputRadio
          classInput={style.input}
          classLabel={`${style.label} ${style.dark} uppercase`}
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
