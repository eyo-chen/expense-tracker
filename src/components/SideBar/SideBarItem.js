import { NavLink } from "react-router-dom";
import styles from "./SideBarItem.module.css";

function SideBarItem(props) {
  let toStr = "";
  if (props.title !== "Home") {
    toStr = props.title.toLowerCase();
  }

  return (
    <NavLink
      title={props.title}
      to={`/${toStr}`}
      className={(data) =>
        data.isActive
          ? `${styles["sidebar__item"]} ${styles["sidebar__item--active"]}`
          : `${styles["sidebar__item"]}`
      }
    >
      <div aria-label={props.title} tabIndex="0" className={styles.cover}></div>
      {props.children}
    </NavLink>
  );
}

export default SideBarItem;
/*
Why use <div className={styles.cover}></div>?
It seems useless at first
But we use it here for the sake of better user experience

Note that we have onClick={pageIconHandler}
the purpose of this is for changing the main content when user clicks the different icon of sidebar

If we put onClick={pageIconHandler} on the <li></li>
When user click the area of sidebar item
They may click
1) <li></li> which is what we want
2) {props.children} which is SVG icon
For the second situation, there's no onClick on SVG icon, so it maybe has no reaction even after user clicking the area of sidebar item
So user may try to click a couple times to change the main content, which is not a good user experience

In order to avoid that situation, we
1) create <div></div>
2) put onClick and data-id
3) set the parent element of <div></div>, which is sidebar__item to position: relative;
4) set <div></div> to position: absolute; width: 100%; height: 100%;z-index: 100;, so that this <div></div> will completely occupy this area
*/
