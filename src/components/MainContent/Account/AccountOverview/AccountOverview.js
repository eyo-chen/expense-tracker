import { useContext } from "react";
import UserInfoContext from "./../../../../store/userInfo/userInfo--context";
import Title from "../../../UI/Title/Title";
import SubTitle from "../../../UI/SubTitle/SubTitle";
import AccountCard from "./AccountCard";
import AccountChart from "./AccountChart";
import styles from "./AccountOverview.module.css";

function AccountOverview() {
  const { userInfo } = useContext(UserInfoContext);

  return (
    <div className={styles.overview}>
      <div className={styles.title}>
        <Title>account overview</Title>
        <SubTitle className={styles.subtitle}>
          hi, {userInfo.name}
        </SubTitle>
      </div>
      <AccountCard />
      <AccountChart />
    </div>
  );
}

export default AccountOverview;
