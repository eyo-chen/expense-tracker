import { useState, useEffect } from "react";
import AccountSmallCard from "./AccountSmallCard";
import timeObj from "../../../../Others/TimeObj/timeObj";
import formatMoney from "../../../../Others/FormatMoney/formatMoney";
import MoneyModal from "../../../UI/MoneyModal/MoneyModal";
import useMoneyModal from "../../../../Others/Custom/useMoneyModal";
import styles from "./AccountCard.module.css";
import formateDate from "../../../../Others/FormatDate/formatDate";
import fetcher from "../../../../Others/Fetcher/fetcher";

const { TODAY } = timeObj;

function AccountCard() {
  const [accInfo, setAccInfo] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });
  const [loading, setLoading] = useState(false);
  const [moneyModal, moneyModalToggler] = useMoneyModal();

  useEffect(() => {
    setLoading(true);

    fetchTransactionInfo(formateDate(TODAY))
    .then((data) => {
      setAccInfo({
        income: data.total_income,
        expense: data.total_expense,
        balance: data.total_balance
      });
    }).catch((error) => {
      console.error("Error fetching data:", error);
    }).finally(() => setLoading(false));
  }
  , []);

  return (
    <>
      {moneyModal.show && (
        <MoneyModal value={moneyModal.value} onClick={moneyModalToggler} />
      )}
      <div className={styles["card__container"]}>
        <AccountSmallCard title="income" price={formatMoney(accInfo.income)} loading={loading}/>
        <AccountSmallCard title="expense" price={formatMoney(accInfo.expense)} loading={loading}/>
        <AccountSmallCard title="balance" price={formatMoney(accInfo.balance)} loading={loading}/>  
      </div>
    </>
  );
}

export default AccountCard;

async function fetchTransactionInfo(endDate){
  try {
    const resp = await fetcher(`v1/transaction/info?end_date=${endDate}`, "GET");
    return resp
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}