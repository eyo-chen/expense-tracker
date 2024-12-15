import { useState, useContext } from "react";
import UserInfoContext from "../../../store/userInfo/userInfo--context";
import Title from "./../../UI/Title/Title";
import Modal from "./../../UI/Modal/Modal";
import Button from "./../../UI/Button/Button";
import Loading from "./../../UI/Loading/Loading";
import fetcher from "../../../Others/Fetcher/fetcher";
import setToken from "../../../Others/SetToken/setToken";
import { SiCashapp } from "react-icons/si";
import styles from "./WelcomeModel.module.css";

function Welcome(props) {
  const [loading, setLoading] = useState(false);
  const { setUserInfo } = useContext(UserInfoContext);

  const loginHandler = () => {
    props.setAuthState("login");
  };

  const signupHandler = () => {
    props.setAuthState("signup");
  }

  async function demoHandler() {
    setLoading(true);

    try {
      const token = await login("demo@gmail.com", "testtest");
      setToken(token);

      const userInfo = await getUserInfo();
      setUserInfo(userInfo);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const buttonUI = loading ? 
    <div className={styles["loading--container"]}>
      <Loading className={styles.loading} />
    </div> :
    <div className={styles["btn--container"]}>
      <Button className={`${styles.btn} ${styles["btn--first"]}`} onClick={loginHandler}>
        Login
      </Button>
      <Button className={styles.btn} onClick={signupHandler}>
        Signup
      </Button>
      <Button className={styles.btn} onClick={demoHandler}>
        Demo
      </Button>
    </div>

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
      {buttonUI}
    </Modal>
  );
}

export default Welcome;


async function login(email, password) {
  try {
    const data = await fetcher("v1/user/login", "POST", { email, password });
    return data;
  }
  catch (error) {
    throw error;
  }
}

async function getUserInfo() {
  try {
    const res = await fetcher("v1/user", "GET", null);

    return res;
  } catch (error) {
    throw error;
  }
}