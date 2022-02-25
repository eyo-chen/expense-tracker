import Modal from "../Modal/Modal";
import createUserID from "../../../Others/CreateUserID/createUserID";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import SubTitle from "../SubTitle/SubTitle";
import Button from "../Button/Button";
import { auth } from "../../../firebase-config";
import { signOut } from "firebase/auth";
import styles from "./LogoutModal.module.css";

function LogoutModal(props) {
  const [user] = createUserID();
  const { photoURL, displayName, email } = user;

  function signedOut() {
    signOut(auth);
    props.logoutModalToggler();
  }

  return (
    <Modal onClick={props.logoutModalToggler} classModal={styles.modal}>
      <SubTitle className={styles.title}>do you want to log out?</SubTitle>
      <HorizontalLine />
      <SubTitle className={styles.subtitle}>current account</SubTitle>
      <div className={styles.info}>
        {photoURL ? (
          <>
            <p className={styles.name}>{displayName}</p>
            <img className={styles.img} src={photoURL} />
          </>
        ) : (
          <>
            <p className={styles.name}>sample</p>
            <div className={`${styles.sample} center--flex`}>S</div>
          </>
        )}

        <p className={styles.email}>{email}</p>
      </div>
      <div className={styles["btn__container"]}>
        <Button onClick={props.logoutModalToggler} className={styles.btn}>
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
