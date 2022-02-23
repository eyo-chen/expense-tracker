import styles from "./SettingMenu.module.css";

const SETTING_MENU = ["account", "appearance", "category"];

function SettingMenu(props) {
  function settingMenuClickHandler(e) {
    props.setSettingContent(e.target.dataset.id);
  }

  const menu = SETTING_MENU.map((element, index) => (
    <li
      tabIndex="0"
      key={element}
      onClick={settingMenuClickHandler}
      data-id={index}
      className={` ${
        props.settingContent === String(index)
          ? `${styles.list} uppercase transition--25 ${styles.active}`
          : `${styles.list} uppercase transition--25 `
      }`}
    >
      {element}
    </li>
  ));

  return (
    <div className={styles.menu}>
      <ul className={styles.ul}>{menu}</ul>
    </div>
  );
}

export default SettingMenu;
