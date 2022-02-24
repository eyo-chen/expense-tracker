import { useContext } from "react";
import InputRadio from "../../../../UI/InputRadio/InputRadio";
import DisplayThemeContext from "../../../../../store/displayTheme/displayTheme--context";
import createUserID from "../../../../../Others/CreateUserID/createUserID";
import useErrorModal from "../../../../../Others/Custom/useErrorModal";
import { db } from "../../../../../firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import styles from "./SettingAppearance.module.css";

function SettingAppearance() {
  const [, setErrorModal] = useErrorModal();
  const { displayTheme } = useContext(DisplayThemeContext);
  const [, userID] = createUserID();

  const userDocRef = doc(db, "users", userID);

  async function changeDisplayThemeHandler(e) {
    try {
      await updateDoc(userDocRef, {
        displayTheme: e.target.value,
      });
    } catch (err) {
      setErrorModal(true);
    }
  }

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
