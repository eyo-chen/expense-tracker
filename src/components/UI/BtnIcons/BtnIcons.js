import BtnIcon from "../BtnIcon/BtnIcon";
import { AiOutlineBarChart } from "react-icons/ai";
import { AiFillMoneyCollect } from "react-icons/ai";
import { BsNewspaper } from "react-icons/bs";
import styles from "./BtnIcons.module.css";

function BtnIcons(props) {
  const classBtn = props.news
    ? `${styles["btn--icon"]} ${styles["btn--icon--news"]}`
    : `${styles["btn--icon"]}`;

  return (
    <>
      <BtnIcon
        classBtn={classBtn}
        onClick={props.onClick}
        dataID="chart"
        text="chart"
      >
        <AiOutlineBarChart aria-label="chart" className={styles.icon} />
      </BtnIcon>
      <BtnIcon
        classBtn={classBtn}
        onClick={props.onClick}
        dataID={props.news ? "news" : "info"}
        text={props.news ? "news" : "info"}
      >
        {props.news ? (
          <BsNewspaper aria-label="news" className={styles.icon} />
        ) : (
          <AiFillMoneyCollect
            aria-label="account info"
            className={styles.icon}
          />
        )}
      </BtnIcon>
    </>
  );
}

export default BtnIcons;
