import { useContext } from "react";
import Card from "../../../UI/Card/Card";
import SubTitle from "../../../UI/SubTitle/SubTitle";
import ExpenseDataContext from "../../../../store/expenseData/expenseData--context";
import timeObj from "../../../assets/timeObj/timeObj";
import createAccAmount from "../../../../Others/CreateAccountCardData/createAccAmount";
import mutipleArgsHelper from "../../../../Others/MultipleArgsHelper/multipleArgsHelper";
import formatMoney from "../../../../Others/FormatMoney/formatMoney";
import style from "./AccountCard.module.css";

const { TODAY } = timeObj;

function AccountCard() {
  const { expenseData } = useContext(ExpenseDataContext);
  const [income, expense, netIncome] = mutipleArgsHelper(
    formatMoney,
    ...createAccAmount(expenseData, false, null, TODAY)
  );

  return (
    <div className={style["card__container"]}>
      <Card className={style.card}>
        <SubTitle className={style["card__text"]}>income</SubTitle>
        <SubTitle className={style["card__number"]}>{`$${income}`}</SubTitle>
      </Card>
      <Card className={style.card}>
        <SubTitle className={style["card__text"]}>expense</SubTitle>
        <SubTitle className={style["card__number"]}>{`$${expense}`}</SubTitle>
      </Card>
      <Card className={style.card}>
        <SubTitle className={style["card__text"]}>net income</SubTitle>
        <SubTitle className={style["card__number"]}>{`$${netIncome}`}</SubTitle>
      </Card>
    </div>
  );
}

export default AccountCard;
