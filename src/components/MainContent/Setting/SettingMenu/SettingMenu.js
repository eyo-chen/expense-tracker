import style from "./SettingMenu.module.css";

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
          ? `${style.list} uppercase transition--25 ${style.active}`
          : `${style.list} uppercase transition--25 `
      }`}
    >
      {element}
    </li>
  ));

  return (
    <div className={style.menu}>
      <ul className={style.ul}>{menu}</ul>
    </div>
  );
}

export default SettingMenu;
