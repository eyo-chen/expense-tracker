import SubTitle from "../../../UI/SubTitle/SubTitle";
import SettingAccount from "./SettingAccount/SettingAccount";
import SettingAppearance from "./SettingAppearance/SettingAppearance";
import SettingCategory from "./SettingCategory/SettingCategory";
import HorizontalLine from "../../../UI/HorizontalLine/HorizontalLine";
import style from "./SettingContent.module.css";

const SETTING_CONTENT = [
  <SettingAccount />,
  <SettingAppearance />,
  <SettingCategory />,
];
const SETTING_TITLE = ["account", "appearance", "category"];

function SettingContent(props) {
  return (
    <div className={style.list}>
      <div className={`${style.container} center`}>
        <SubTitle className={style.subtitle}>
          {SETTING_TITLE[props.settingContent]}
        </SubTitle>
        <HorizontalLine className={style.line} />
        {SETTING_CONTENT[props.settingContent]}
      </div>
    </div>
  );
}

export default SettingContent;
