import { useContext } from "react";
import UserInfoContext from "../../../store/userInfo/userInfo--context";
import signInWithGoogle from "./../../../Others/SignInWithGoogle/signInWithGoogle";
import Title from "../Title/Title";
import Modal from "../Modal/Modal";
import BtnIcon from "../BtnIcon/BtnIcon";
import { FcGoogle } from "react-icons/fc";
import styles from "./SignInModal.module.css";

function SignInModal() {
  return (
    <Modal classModal={`${styles.modal} center--flex`}>
      <Title className={styles.title}>welcome</Title>
      <p className={`${styles.description} capitalize`}>
        please use google account to sign in
      </p>
      <BtnIcon
        onClick={signInWithGoogle}
        classText={styles["btn__text"]}
        classBtn={`${styles.btn} transition--25 capitalize`}
      >
        <FcGoogle className={styles.icon} /> sign in with google
      </BtnIcon>
    </Modal>
  );
}

export default SignInModal;
