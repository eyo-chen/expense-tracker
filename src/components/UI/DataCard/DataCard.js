import { useState } from "react";
import SubTitle from "../SubTitle/SubTitle";
import Card from "../Card/Card";
import BtnIcon from "../BtnIcon/BtnIcon";
import formatMoney from "../../../Others/FormatMoney/formatMoney";
import mutipleArgsHelper from "../../../Others/MultipleArgsHelper/multipleArgsHelper";
import MoneyModal from "../MoneyModal/MoneyModal";
import useMoneyModal from "../../../Others/Custom/useMoneyModal";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import styles from "./DataCard.module.css";

const priceText = ["income", "expense", "net income"];

function DataCard(props) {
  const [visible, setVisible] = useState(true);
  const [moneyModal, moneyModalToggler] = useMoneyModal();
  function eyeBtnClickToggler() {
    setVisible((prev) => !prev);
  }

  const allCardContent = mutipleArgsHelper(
    formatMoney,
    props.income,
    props.expense,
    props.netIncome
  ).map((price, index) => {
    const priceTextStr = priceText[index];
    const prePrice =
      priceTextStr === "expense"
        ? props.expense
        : priceTextStr === "expense"
        ? props.income
        : props.netIncome;

    return (
      <div key={priceTextStr} className={styles["data__container"]}>
        <p className="capitalize">{priceTextStr}</p>
        <p
          data-value={prePrice}
          data-id={Math.abs(prePrice) >= 1000000}
          className={Math.abs(prePrice) >= 1000000 ? `${styles.large}` : ""}
          onClick={moneyModalToggler}
        >
          {visible ? `$${price}` : "********"}
        </p>
      </div>
    );
  });

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
        {allCardContent}
      </Card>
    </>
  );
}

export default DataCard;
