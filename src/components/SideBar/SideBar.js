import { useState, useContext } from "react";
import { AiFillHome } from "react-icons/ai";
import { FaRegCalendarAlt } from "react-icons/fa";
import { AiOutlineBarChart, AiOutlineStock } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { SiCashapp } from "react-icons/si";
import UserInfoContext from "./../../store/userInfo/userInfo--context"
import SideBarItem from "./SideBarItem";
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
    "Stock",
    <AiOutlineStock
      aria-label="stock"
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
  const { userInfo } = useContext(UserInfoContext);
  const userName = userInfo?.name[0].toUpperCase();

  // SIDEBAR__ICON is 2D array
  const sidebarItem = SIDEBAR__ICON.map(([title, icon]) => {
    return (
      <SideBarItem title={title} key={title} setLogoutModal={setLogoutModal}>
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
          <a
            className={styles["logo__link"]}
            href="."
            aria-label="reload the page"
          >
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
          <div className={styles["user__container"]} onClick={logoutModalToggler}>
            {userName}
          </div>
        </div>
      </aside>
    </>
  );
}

export default SideBar;
