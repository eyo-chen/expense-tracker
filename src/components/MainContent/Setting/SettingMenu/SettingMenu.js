import style from "./SettingMenu.module.css";

const SETTING_MENU_TEXT = ["account", "appearance", "category", "others"];

function SettingMenu(props) {
  function settingListClick(e) {
    props.setSettingContent(e.target.dataset.id);
  }

  const menu = SETTING_MENU_TEXT.map((element, index) => (
    <li
      key={element}
      onClick={settingListClick}
      data-id={index}
      className={`${style.list} ${
        props.settingContent === index + "" ? `${style.active}` : ""
      }`}
    >
      {element}
    </li>
  ));

  return (
    <div className={style.menu}>
      <ul className={style.unorder}>{menu}</ul>
    </div>
  );
}

export default SettingMenu;
