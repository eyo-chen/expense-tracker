import AccountOverview from "./AccountOverview/AccountOverview";
import styles from "./Account.module.css";

function Account() {
  return (
    <div className={styles.account}>
      <AccountOverview />
    </div>
  );
}

export default Account;
