import { useState } from "react";
import SettingMenu from "./SettingMenu/SettingMenu";
import SettingContent from "./SettingContent/SettingContent";
import style from "./Setting.module.css";

function Setting() {
  const [settingContent, setSettingContent] = useState("0");

  return (
    <div className={style.setting}>
      <div className={style.container}>
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
