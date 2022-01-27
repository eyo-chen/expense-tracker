import { useState } from "react";
import SubTitle from "../SubTitle/SubTitle";
import Card from "../Card/Card";
import BtnIcon from "../BtnIcon/BtnIcon";
import formatMoney from "../../../Others/FormatMoney/formatMoney";
import mutipleArgsHelper from "../../../Others/MultipleArgsHelper/multipleArgsHelper";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import style from "./DataCard.module.css";

function DataCard(props) {
  const [visible, setVisible] = useState(true);
  function eyeBtnClickToggler() {
    setVisible((prev) => !prev);
  }

  const [income, expense, netIncome] = mutipleArgsHelper(
    formatMoney,
    props.income,
    props.expense,
    props.income - props.expense
  );

  return (
    <Card className={style.card}>
      <div className={style["title__container"]}>
        <SubTitle className={style.title}>{props.title}</SubTitle>
        <BtnIcon
          classBtn={style["btn__icon"]}
          classText={style["btn__text"]}
          text={visible ? "hide" : "show"}
          onClick={eyeBtnClickToggler}
        >
          {visible ? (
            <AiFillEye className={style.btn} />
          ) : (
            <AiFillEyeInvisible className={style.btn} />
          )}
        </BtnIcon>
      </div>
      <div className={style["data__container"]}>
        <p>Income</p>
        <p>{visible ? `$${income}` : "********"}</p>
      </div>
      <div className={style["data__container"]}>
        <p>Expense</p>
        <p>{visible ? `$${expense}` : "********"}</p>
      </div>
      <div className={style["data__container"]}>
        <p>Net Income</p>
        <p>{visible ? `$${netIncome}` : "********"}</p>
      </div>
    </Card>
  );
}

export default DataCard;
