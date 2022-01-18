import Title from "../../../UI/Title/Title";
import SubTitle from "../../../UI/SubTitle/SubTitle";
import AccountCard from "./AccountCard";
import AccountChart from "./AccountChart";
import style from "./AccountOverview.module.css";

function AccountOverview() {
  return (
    <div className={style.overview}>
      <div className={style.title}>
        <Title>account overview</Title>
        <SubTitle className={style.subtitle}>hi, username</SubTitle>
      </div>
      <AccountCard />
      <AccountChart />
    </div>
  );
}

export default AccountOverview;
