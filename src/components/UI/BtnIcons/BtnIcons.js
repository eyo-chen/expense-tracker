import Button from "../Button";
import style from "./BtnIcons.module.css";
import { AiOutlineBarChart } from "react-icons/ai";
import { AiFillMoneyCollect } from "react-icons/ai";

function BtnIcons(props) {
  return (
    <>
      <Button type="button" className={style["btn--icon"]}>
        <div
          onClick={props.onClick}
          data-id="chart"
          className={style["btn__inner"]}
        ></div>
        <AiOutlineBarChart
          className={`${style.icon} ${style["icon--chart"]}`}
        />
        <span className={style["btn__text"]}>chart</span>
      </Button>
      <Button type="button" className={style["btn--icon"]}>
        <div
          onClick={props.onClick}
          data-id="info"
          className={style["btn__inner"]}
        ></div>
        <AiFillMoneyCollect
          className={`${style.icon} ${style["icon--info"]}`}
        />
        <span className={style["btn__text"]}>info</span>
      </Button>
    </>
  );
}

export default BtnIcons;
