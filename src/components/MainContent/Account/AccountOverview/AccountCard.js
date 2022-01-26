import { useContext } from "react";
import Card from "../../../UI/Card/Card";
import SubTitle from "../../../UI/SubTitle/SubTitle";
import style from "./AccountCard.module.css";
import ExpenseDataContext from "../../../../store/expenseData/expenseData--context";
import timeObj from "../../../assets/timeObj/timeObj";
import compareTime from "../../../../Others/compareTime";
import createAccAmount from "../../../../Others/CreateAccountCardData/createAccAmount";

const { YEAR, MONTH, DAY, TODAY } = timeObj;

function AccountCard() {
  const { expenseData } = useContext(ExpenseDataContext);

  const accIncome = expenseData
    .filter(
      (expenseData) =>
        expenseData.category === "income" &&
        compareTime(expenseData, null, YEAR, MONTH, DAY)
    )
    .reduce((acc, cur) => acc + Number(cur.price), 0);

  const accExpense = expenseData
    .filter(
      (expenseData) =>
        expenseData.category === "expense" &&
        compareTime(expenseData, null, YEAR, MONTH, DAY)
    )
    .reduce((acc, cur) => acc + Number(cur.price), 0);

  // const [test1, test2] = createAccAmount(expenseData, false, null, TODAY);
  // console.log(test1 === accIncome);
  // console.log(test2 === accExpense);

  return (
    <div className={style["card__container"]}>
      <Card className={style.card}>
        <SubTitle className={style["card__text"]}>income</SubTitle>
        <SubTitle className={style["card__number"]}>{`$${accIncome}`}</SubTitle>
      </Card>
      <Card className={style.card}>
        <SubTitle className={style["card__text"]}>expense</SubTitle>
        <SubTitle
          className={style["card__number"]}
        >{`$${accExpense}`}</SubTitle>
      </Card>
      <Card className={style.card}>
        <SubTitle className={style["card__text"]}>net</SubTitle>
        <SubTitle className={style["card__number"]}>{`$${
          accIncome - accExpense
        }`}</SubTitle>
      </Card>
    </div>
  );
}

export default AccountCard;
