import signInWithGoogle from "./../../../Others/SignInWithGoogle/signInWithGoogle";
import Title from "../Title/Title";
import Modal from "../Modal/Modal";
import BtnIcon from "../BtnIcon/BtnIcon";
import Button from "../Button/Button";
import { FcGoogle } from "react-icons/fc";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase-config";
import useErrorModal from "../../../Others/Custom/useErrorModal";
import { SiCashapp } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import styles from "./SignInModal.module.css";

function SignInModal() {
  const [setErrorModal] = useErrorModal();
  const navigate = useNavigate();

  async function signInWithSample() {
    try {
      await signInWithEmailAndPassword(
        auth,
        "wY08shq4ClOssWZp0dDZ@gmail.com",
        "omUO7oSFpfWN2EmyYlTU"
      );
      navigate("/");
    } catch (err) {
      setErrorModal(true);
    }
  }

  return (
    <Modal classModal={`${styles.modal} center--flex`}>
      <div>
        <Title className={styles.title}>welcome</Title>
        <Title className={styles.title}>to</Title>
        <Title className={`${styles.title} ${styles["title__last"]}`}>
          expen
          <SiCashapp className={styles["title__icon"]} />e tracker
        </Title>
      </div>

      <p className={`${styles.description} capitalize`}>
        please use google account to sign in
      </p>

      <div>
        <BtnIcon
          onClick={signInWithGoogle}
          classText={styles["btn__text"]}
          classBtn={`${styles.btn} transition--25 capitalize`}
        >
          <FcGoogle className={styles.icon} /> sign in with google
        </BtnIcon>
        <Button onClick={signInWithSample} className={styles.btn}>
          click to use the sample
        </Button>
      </div>
    </Modal>
  );
}

export default SignInModal;
