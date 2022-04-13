import AccountNews from "./AccountNews";
import AccountSmallChart from "./AccountSmallChart";
import styles from "./AccountSubSection.module.css";

function AccountSubSection() {
  return (
    <div className={styles.subSection}>
      <AccountNews />
      <AccountSmallChart />
    </div>
  );
}

export default AccountSubSection;
