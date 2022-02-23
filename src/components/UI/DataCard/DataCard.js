import { useState } from "react";
import SubTitle from "../SubTitle/SubTitle";
import Card from "../Card/Card";
import BtnIcon from "../BtnIcon/BtnIcon";
import formatMoney from "../../../Others/FormatMoney/formatMoney";
import mutipleArgsHelper from "../../../Others/MultipleArgsHelper/multipleArgsHelper";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import styles from "./DataCard.module.css";

function DataCard(props) {
  const [visible, setVisible] = useState(true);
  function eyeBtnClickToggler() {
    setVisible((prev) => !prev);
  }

  const [income, expense, netIncome] = mutipleArgsHelper(
    formatMoney,
    props.income,
    props.expense,
    props.netIncome
  );

  return (
    <Card className={styles.card}>
      <div className={styles["title__container"]}>
        <SubTitle className={styles.title}>{props.title}</SubTitle>
        <BtnIcon
          classBtn={styles["btn__icon"]}
          classText={styles["btn__text"]}
          text={visible ? "hide" : "show"}
          onClick={eyeBtnClickToggler}
        >
          {visible ? (
            <AiFillEye aria-label="show" className={styles.btn} />
          ) : (
            <AiFillEyeInvisible aria-label="close" className={styles.btn} />
          )}
        </BtnIcon>
      </div>
      <div className={styles["data__container"]}>
        <p>Income</p>
        <p>{visible ? `$${income}` : "********"}</p>
      </div>
      <div className={styles["data__container"]}>
        <p>Expense</p>
        <p>{visible ? `$${expense}` : "********"}</p>
      </div>
      <div className={styles["data__container"]}>
        <p>Net Income</p>
        <p>{visible ? `$${netIncome}` : "********"}</p>
      </div>
    </Card>
  );
}

export default DataCard;
