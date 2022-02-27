import { useState } from "react";
import SubTitle from "../SubTitle/SubTitle";
import Card from "../Card/Card";
import BtnIcon from "../BtnIcon/BtnIcon";
import formatMoney from "../../../Others/FormatMoney/formatMoney";
import mutipleArgsHelper from "../../../Others/MultipleArgsHelper/multipleArgsHelper";
import MoneyModal from "../MoneyModal/MoneyModal";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import styles from "./DataCard.module.css";

function DataCard(props) {
  const [visible, setVisible] = useState(true);
  const [moneyModal, setMoneyModal] = useState({ show: false, value: 0 });
  function eyeBtnClickToggler() {
    setVisible((prev) => !prev);
  }

  const [income, expense, netIncome] = mutipleArgsHelper(
    formatMoney,
    props.income,
    props.expense,
    props.netIncome
  );

  function moneyModalToggler(e) {
    if (moneyModal.show || e?.target.dataset.id === "true") {
      setMoneyModal((prev) => ({
        show: !prev.show,
        value: e?.target.dataset.value,
      }));
    }
  }

  return (
    <>
      {moneyModal.show && (
        <MoneyModal value={moneyModal.value} onClick={moneyModalToggler} />
      )}
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
          <p
            data-value={props.income}
            data-id={props.income >= 1000000}
            className={props.income >= 1000000 ? `${styles.large}` : ""}
            onClick={moneyModalToggler}
          >
            {visible ? `$${income}` : "********"}
          </p>
        </div>
        <div className={styles["data__container"]}>
          <p>Expense</p>
          <p
            data-value={props.expense}
            data-id={Math.abs(props.expense) >= 1000000}
            className={
              Math.abs(props.expense) >= 1000000 ? `${styles.large}` : ""
            }
            onClick={moneyModalToggler}
          >
            {visible ? `$${expense}` : "********"}
          </p>
        </div>
        <div className={styles["data__container"]}>
          <p>Net Income</p>
          <p
            data-value={props.netIncome}
            data-id={Math.abs(props.netIncome) >= 1000000}
            className={
              Math.abs(props.netIncome) >= 1000000 ? `${styles.large}` : ""
            }
            onClick={moneyModalToggler}
          >
            {visible ? `$${netIncome}` : "********"}
          </p>
        </div>
      </Card>
    </>
  );
}

export default DataCard;
