import Title from "./../../UI/Title/Title";
import Modal from "./../../UI/Modal/Modal";
import Button from "./../../UI/Button/Button";
import { SiCashapp } from "react-icons/si";
import styles from "./WelcomeModel.module.css";

function Welcome() {
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

      <div className={styles["btn--container"]}>
        <Button className={styles.btn}>
          Login
        </Button>
        <Button className={styles.btn}>
          Signup
        </Button>
      </div>
    </Modal>
  );
}

export default Welcome;
