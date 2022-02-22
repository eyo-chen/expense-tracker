import AccountOverview from "./AccountOverview/AccountOverview";
import AccountSubSection from "./AccountSubSection/AccountSubSection";
import styles from "./Account.module.css";

function Account() {
  return (
    <div className={styles.account}>
      <AccountOverview />
      <AccountSubSection />
    </div>
  );
}

export default Account;
