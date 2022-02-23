import SubTitle from "../../../UI/SubTitle/SubTitle";
import SettingAccount from "./SettingAccount/SettingAccount";
import SettingAppearance from "./SettingAppearance/SettingAppearance";
import SettingCategory from "./SettingCategory/SettingCategory";
import HorizontalLine from "../../../UI/HorizontalLine/HorizontalLine";
import styles from "./SettingContent.module.css";

const SETTING_CONTENT = [
  <SettingAccount />,
  <SettingAppearance />,
  <SettingCategory />,
];
const SETTING_TITLE = ["account", "appearance", "category"];

function SettingContent(props) {
  return (
    <div className={styles.content}>
      <div className={`${styles.container} center`}>
        <SubTitle className={styles.subtitle}>
          {SETTING_TITLE[props.settingContent]}
        </SubTitle>
        <HorizontalLine className={styles.line} />
        {SETTING_CONTENT[props.settingContent]}
      </div>
    </div>
  );
}

export default SettingContent;
