import { useContext } from "react";
import UserInfoContext from "./../../../../../store/userInfo/userInfo--context";
import styles from "./SettingAccount.module.css";

function SettingAccount() {
  const { userInfo } = useContext(UserInfoContext);

  return (
    <div>
      <div className={styles.container}>
        <p className={`${styles.label} capitalize`}>name</p>
        <p className={styles.info}>{userInfo.name}</p>
      </div>
      <div>
        <p className={`${styles.label} capitalize`}>email</p>
        <p className={styles.info}>{userInfo.email}</p>
      </div>
    </div>
  );
}

export default SettingAccount;