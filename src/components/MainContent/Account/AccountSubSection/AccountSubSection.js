import AccountNews from "./AccountNews";
import AccountSmallChart from "./AccountSmallChart";
import style from "./AccountSubSection.module.css";

function AccountSubSection() {
  return (
    <div className={style.subSection}>
      {/* <AccountNews /> */}
      <AccountSmallChart />
    </div>
  );
}

export default AccountSubSection;
