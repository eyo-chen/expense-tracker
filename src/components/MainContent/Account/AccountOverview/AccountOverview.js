import { useState } from "react";
import Title from "../../../UI/Title/Title";
import SubTitle from "../../../UI/SubTitle/SubTitle";
import AccountCard from "./AccountCard";
import AccountChart from "./AccountChart";
import BtnIcons from "../../../UI/BtnIcons/BtnIcons";
import AccountSmallChartModal from "../../../UI/AccountSmallChartModal/AccountSmallChartModal";
import style from "./AccountOverview.module.css";

function AccountOverview() {
  const [modalCard, setModalCard] = useState(false);

  function modalCardToggler(e) {
    if (!modalCard) {
      const id = e.target.dataset.id;
      if (id) {
        setModalCard(id);
      }
    } else setModalCard(false);
  }

  function closeModalCard() {
    setModalCard(false);
  }

  return (
    <>
      {modalCard && (
        <AccountSmallChartModal
          modalCard={modalCard}
          closeModalCard={modalCardToggler}
        />
      )}
      <div className={style.overview}>
        <div className={style.title}>
          <Title>account overview</Title>
          <SubTitle className={style.subtitle}>hi, username</SubTitle>
          <div className={style["btn__container"]}>
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
