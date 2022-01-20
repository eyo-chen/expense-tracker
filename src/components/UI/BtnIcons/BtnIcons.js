import BtnIcon from "../BtnIcon/BtnIcon";
import style from "./BtnIcons.module.css";

import { AiOutlineBarChart } from "react-icons/ai";
import { AiFillMoneyCollect } from "react-icons/ai";
import { BsNewspaper } from "react-icons/bs";

function BtnIcons(props) {
  return (
    <>
      <BtnIcon
        classBtn={
          props.news
            ? `${style["btn--icon"]} ${style["btn--icon--news"]}`
            : `${style["btn--icon"]}`
        }
        onClick={props.onClick}
        dataID="chart"
        text="chart"
      >
        <AiOutlineBarChart className={style.icon} />
      </BtnIcon>
      <BtnIcon
        classBtn={
          props.news
            ? `${style["btn--icon"]} ${style["btn--icon--news"]}`
            : `${style["btn--icon"]}`
        }
        onClick={props.onClick}
        dataID={props.news ? "news" : "info"}
        text={props.news ? "news" : "info"}
      >
        {props.news ? (
          <BsNewspaper className={style.icon} />
        ) : (
          <AiFillMoneyCollect className={style.icon} />
        )}
      </BtnIcon>
    </>
  );
}

export default BtnIcons;
