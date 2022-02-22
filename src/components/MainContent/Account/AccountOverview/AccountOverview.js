import { useState } from "react";
import Title from "../../../UI/Title/Title";
import SubTitle from "../../../UI/SubTitle/SubTitle";
import AccountCard from "./AccountCard";
import AccountChart from "./AccountChart";
import BtnIcons from "../../../UI/BtnIcons/BtnIcons";
import AccountModal from "../../../UI/AccountModal/AccountModal";
import { auth } from "../../../../firebase-config";
import styles from "./AccountOverview.module.css";

function AccountOverview() {
  const [modalCard, setModalCard] = useState(false);
  const { displayName } = auth.currentUser;

  function modalCardToggler(e) {
    if (!modalCard) {
      const id = e.target.dataset.id;
      if (id) {
        setModalCard(id);
      }
    } else setModalCard(false);
  }

  return (
    <>
      {modalCard && (
        <AccountModal modalCard={modalCard} closeModalCard={modalCardToggler} />
      )}
      <div className={styles.overview}>
        <div className={styles.title}>
          <Title>account overview</Title>
          <SubTitle className={styles.subtitle}>hi, {displayName}</SubTitle>
          <div className={styles["btn__container"]}>
            <BtnIcons onClick={modalCardToggler} news={true} />
          </div>
        </div>
        <AccountCard />
        <AccountChart />
      </div>
    </>
  );
}

export default AccountOverview;
