import { useState } from "react";
import SettingMenu from "./SettingMenu/SettingMenu";
import SettingContent from "./SettingContent/SettingContent";
import styles from "./Setting.module.css";

function Setting() {
  const [settingContent, setSettingContent] = useState("0");

  return (
    <div className={styles.setting}>
      <div className={`${styles.container} center`}>
        <SettingMenu
          settingContent={settingContent}
          setSettingContent={setSettingContent}
        />
        <SettingContent settingContent={settingContent} />
      </div>
    </div>
  );
}

export default Setting;
