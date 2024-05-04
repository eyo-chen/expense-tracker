import Title from "../../../UI/Title/Title";
import SubTitle from "../../../UI/SubTitle/SubTitle";
import AccountCard from "./AccountCard";
import AccountChart from "./AccountChart";
import { auth } from "../../../../firebase-config";
import styles from "./AccountOverview.module.css";

function AccountOverview() {
  const { displayName } = auth.currentUser;

  return (
    <div className={styles.overview}>
      <div className={styles.title}>
        <Title>account overview</Title>
        <SubTitle className={styles.subtitle}>
          hi, {displayName ? displayName : "sample"}
        </SubTitle>
      </div>
      <AccountCard />
      <AccountChart />
    </div>
  );
}

export default AccountOverview;
