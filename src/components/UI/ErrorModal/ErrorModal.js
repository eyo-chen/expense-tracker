import Modal from "../Modal/Modal";
import SubTitle from "../SubTitle/SubTitle";
import styles from "./ErrorModal.module.css";

function ErrorModal() {
  return (
    <Modal classModal={styles.modal}>
      <SubTitle className={styles.title}>unable to get content</SubTitle>
      <p className={styles.text}>
        An unknown error occurred. Try to reload the page first. Please contact
        me if this continues.
      </p>
    </Modal>
  );
}

export default ErrorModal;
