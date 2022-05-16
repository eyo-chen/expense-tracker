import Title from "../../components/UI/Title/Title";
import Button from "../../components/UI/Button/Button";
import Modal from "../../components/UI/Modal/Modal";
import { useNavigate } from "react-router-dom";
import styles from "./Fallback.module.css";

function Fallback() {
  const navigate = useNavigate();
  return (
    <Modal
      classBackdrop={styles.bg}
      classModal={`center--flex ${styles.modal}`}
    >
      <Title className={` ${styles.title}`}>page not found</Title>
      <Button onClick={() => navigate("/")} className={styles.btn}>
        back to home page
      </Button>
    </Modal>
  );
}

export default Fallback;
