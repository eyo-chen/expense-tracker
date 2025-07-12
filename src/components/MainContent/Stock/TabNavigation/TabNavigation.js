import styles from "./TabNavigation.module.css";

const STOCK_TABS = ["Stock Overview", "Charts", "List"];

function TabNavigation(props) {
  function tabClickHandler(e) {
    props.setActiveTab(e.target.dataset.id);
  }

  const tabs = STOCK_TABS.map((element, index) => (
    <li
      tabIndex="0"
      key={element}
      onClick={tabClickHandler}
      data-id={index}
      className={` ${
        props.activeTab === String(index)
          ? `${styles.tab} transition--25 ${styles.active}`
          : `${styles.tab} transition--25 `
      }`}
    >
      {element}
    </li>
  ));

  return (
    <div className={styles.tabNavigation}>
      <ul className={styles.ul}>{tabs}</ul>
    </div>
  );
}

export default TabNavigation;