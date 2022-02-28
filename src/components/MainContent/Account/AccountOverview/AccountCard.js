import { useContext, useState } from "react";
import Card from "../../../UI/Card/Card";
import SubTitle from "../../../UI/SubTitle/SubTitle";
import ExpenseDataContext from "../../../../store/expenseData/expenseData--context";
import timeObj from "../../../../Others/TimeObj/timeObj";
import createAccAmount from "../../../../Others/CreateAccountCardData/createAccAmount";
import mutipleArgsHelper from "../../../../Others/MultipleArgsHelper/multipleArgsHelper";
import formatMoney from "../../../../Others/FormatMoney/formatMoney";
import MoneyModal from "../../../UI/MoneyModal/MoneyModal";
import useMoneyModal from "../../../../Others/Custom/useMoneyModal";
import styles from "./AccountCard.module.css";

const { TODAY } = timeObj;

const priceText = ["income", "expense", "net income"];

function AccountCard() {
  const [moneyModal, moneyModalToggler] = useMoneyModal();
  const { expenseData } = useContext(ExpenseDataContext);
  const prePriceAmountArr = createAccAmount(expenseData, false, null, TODAY);
  const priceAmountArr = mutipleArgsHelper(formatMoney, ...prePriceAmountArr);

  const allCardContent = priceAmountArr.map((price, index) => {
    const prePrice = prePriceAmountArr[index];

    return (
      <Card key={price + index} className={styles.card}>
        <SubTitle className={styles["card__text"]}>{priceText[index]}</SubTitle>
        <p
          data-value={prePrice}
          data-id={Math.abs(prePrice) >= 1000000}
          className={` ${styles["card__number"]} ${
            Math.abs(prePrice) >= 1000000
              ? `${styles["card__number--large"]}`
              : ""
          }`}
          onClick={moneyModalToggler}
        >{`$${price}`}</p>
      </Card>
    );
  });

  return (
    <>
      {moneyModal.show && (
        <MoneyModal value={moneyModal.value} onClick={moneyModalToggler} />
      )}
      <div className={styles["card__container"]}>{allCardContent}</div>
    </>
  );
}

export default AccountCard;
