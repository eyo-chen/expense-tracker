import AccountOverview from "./AccountOverview/AccountOverview";
import AccountSubSection from "./AccountSubSection/AccountSubSection";
import style from "./Account.module.css";

function Account() {
  return (
    <div className={style.account}>
      <AccountOverview />
      <AccountSubSection />
    </div>
  );
}

export default Account;
