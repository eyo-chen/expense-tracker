import { useContext } from "react";
import Card from "../../../UI/Card/Card";
import SubTitle from "../../../UI/SubTitle/SubTitle";
import ExpenseDataContext from "../../../../store/expenseData/expenseData--context";
import timeObj from "../../../assets/timeObj/timeObj";
import createAccAmount from "../../../../Others/CreateAccountCardData/createAccAmount";
import mutipleArgsHelper from "../../../../Others/MultipleArgsHelper/multipleArgsHelper";
import formatMoney from "../../../../Others/FormatMoney/formatMoney";
import styles from "./AccountCard.module.css";

const { TODAY } = timeObj;

function AccountCard() {
  const { expenseData } = useContext(ExpenseDataContext);
  const [income, expense, netIncome] = mutipleArgsHelper(
    formatMoney,
    ...createAccAmount(expenseData, false, null, TODAY)
  );

  return (
    <div className={styles["card__container"]}>
      <Card className={styles.card}>
        <SubTitle className={styles["card__text"]}>income</SubTitle>
        <SubTitle className={styles["card__number"]}>{`$${income}`}</SubTitle>
      </Card>
      <Card className={styles.card}>
        <SubTitle className={styles["card__text"]}>expense</SubTitle>
        <SubTitle className={styles["card__number"]}>{`$${expense}`}</SubTitle>
      </Card>
      <Card className={styles.card}>
        <SubTitle className={styles["card__text"]}>net income</SubTitle>
        <SubTitle
          className={styles["card__number"]}
        >{`$${netIncome}`}</SubTitle>
      </Card>
    </div>
  );
}

export default AccountCard;
