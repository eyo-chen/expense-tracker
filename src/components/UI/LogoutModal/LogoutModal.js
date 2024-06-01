import { useContext } from "react";
import userInfoContext from "./../../../store/userInfo/userInfo--context";
import Modal from "../Modal/Modal";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import SubTitle from "../SubTitle/SubTitle";
import Button from "../Button/Button";
import styles from "./LogoutModal.module.css";

function LogoutModal(props) {
  const { userInfo, setUserInfo } = useContext(userInfoContext);

  function signedOut() {
    localStorage.removeItem("etoken");
    setUserInfo(null);
  }

  return (
    <Modal onClick={props.logoutModalToggler} classModal={styles.modal}>
      <SubTitle className={styles.title}>do you want to log out?</SubTitle>
      <HorizontalLine />
      <SubTitle className={styles.subtitle}>current account</SubTitle>
      <div className={styles.info}>
        <p className={styles.name}>{userInfo?.name}</p>
        <p className={styles.email}>{userInfo?.email}</p>
      </div>
      <div className={styles["btn__container"]}>
        <Button onClick={props.logoutModalToggler} className={`${styles.btn} ${styles["btn--cancel"]}`}>
          cancel
        </Button>
        <Button onClick={signedOut} className={styles.btn}>
          log out
        </Button>
      </div>
    </Modal>
  );
}

export default LogoutModal;
