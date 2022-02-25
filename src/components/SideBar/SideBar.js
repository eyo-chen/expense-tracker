import { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { FaRegCalendarAlt } from "react-icons/fa";
import { AiOutlineBarChart } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { SiCashapp } from "react-icons/si";
import SideBarItem from "./SideBarItem";
import createUserID from "../../Others/CreateUserID/createUserID";
import LogoutModal from "../UI/LogoutModal/LogoutModal";
import styles from "./SideBar.module.css";

const SIDEBAR__ICON = [
  [
    "Home",
    <AiFillHome
      aria-label="home"
      className={`${styles["sidebar__icon"]} transition--25`}
    />,
  ],
  [
    "Calendar",
    <FaRegCalendarAlt
      aria-label="calendar"
      className={`${styles["sidebar__icon"]} transition--25`}
    />,
  ],
  [
    "Chart",
    <AiOutlineBarChart
      aria-label="chart"
      className={`${styles["sidebar__icon"]} transition--25`}
    />,
  ],
  [
    "Search",
    <FaSearch
      aria-label="search"
      className={`${styles["sidebar__icon"]} transition--25`}
    />,
  ],
  [
    "Account",
    <MdAccountCircle
      aria-label="account"
      className={`${styles["sidebar__icon"]} transition--25`}
    />,
  ],
  [
    "Setting",
    <AiFillSetting
      aria-label="setting"
      className={`${styles["sidebar__icon"]} transition--25`}
    />,
  ],
];

const dateOptObj = { month: "short" };
const dateOptObj1 = { year: "numeric" };

function SideBar(props) {
  const [logoutModal, setLogoutModal] = useState(false);
  const [user] = createUserID();
  const { photoURL } = user;

  // SIDEBAR__ICON is 2D array
  const sidebarItem = SIDEBAR__ICON.map(([title, icon], index) => {
    let activePage = false;
    if (props.page - 0 === index) activePage = true;

    return (
      <SideBarItem
        title={title}
        key={title}
        pageIndex={index}
        activePage={activePage}
        menuClickHandler={props.menuClickHandler}
        setPage={props.setPage}
        setLogoutModal={setLogoutModal}
      >
        {icon}
      </SideBarItem>
    );
  });

  function logoutModalToggler() {
    setLogoutModal((prev) => !prev);
  }

  return (
    <>
      {logoutModal && <LogoutModal logoutModalToggler={logoutModalToggler} />}
      <aside
        className={`${styles.sidebar} ${
          props.showSidebar ? `${styles["sidebar--show"]}` : ""
        }`}
      >
        <div>
          <a href="." aria-label="reload the page">
            <SiCashapp aria-label="reload the page" className={styles.logo} />
          </a>

          <nav>
            <ul className={styles["sidebar__item"]}>{sidebarItem}</ul>
          </nav>
        </div>

        <div className={styles["sidebar__info"]}>
          <p>{`${props.today.getDate()} th`}</p>
          <p>
            {new Intl.DateTimeFormat("en-US", dateOptObj).format(props.today)}
          </p>
          <p>
            {new Intl.DateTimeFormat("en-US", dateOptObj1).format(props.today)}
          </p>

          <span className={styles["user__container"]}>
            {photoURL ? (
              <img
                onClick={logoutModalToggler}
                className={styles.user}
                src={photoURL}
                alt="user account"
              />
            ) : (
              <div
                className={`${styles.user} ${styles.sample} center--flex`}
                onClick={logoutModalToggler}
              >
                S
              </div>
            )}
          </span>
        </div>
      </aside>
    </>
  );
}

export default SideBar;
