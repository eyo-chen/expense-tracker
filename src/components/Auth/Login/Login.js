import { useReducer, useState, useContext } from "react";
import UserInfoContext from "../../../store/userInfo/userInfo--context";
import Modal from "./../../UI/Modal/Modal";
import Title from "./../../UI/Title/Title";
import Button from "./../../UI/Button/Button";
import AuthInput from "./../AuthInput/AuthInput";
import HorizontalLine from "./../../UI/HorizontalLine/HorizontalLine";
import Loading from "./../../UI/Loading/Loading";
import styles from "./Login.module.css";
import isEmailValid from "../../../Others/IsEmailValid/isEmailValid";
import setToken from "../../../Others/SetToken/setToken";
import fetcher from "../../../Others/Fetcher/fetcher";

function Login(props){
  const [formData, formDataDispatch] = useReducer(reducer, {
    email: "",
    password: "",
    isEmailInValid: true,
    isEmailTouch: false,
    isPasswordInValid: true,
    isFormInValid: true,
    isInfoCorrect: true,
  });
  const [loading, setLoading] = useState(false);
  const { setUserInfo } = useContext(UserInfoContext);

  const buttonClassName = formData.isFormInValid ? `btn--invalid` : `btn--valid ${styles["btn--valid"]}`

  function emailChangeHandler(e) {
    formDataDispatch({ type: "email", value: e.target.value });
  }

  function emailTouchHandler() {
    formDataDispatch({ type: "email-touch" });
  }

  function passwordChangeHandler(e) {
    formDataDispatch({ type: "password", value: e.target.value });
  }

  function passwordTouchHandler() {
    formDataDispatch({ type: "password-touch" });
  }

  function btnBackHandler() {
    props.setAuthState("welcome");
  }

  async function submitFormHandler(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const token = await login(formData.email, formData.password);
      setToken(token);

      const userInfo = await getUserInfo();
      setUserInfo(userInfo);
    } catch (error) {
      formDataDispatch({ type: "info-correct", value: false });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal classModal={`${styles.modal} center--flex`}>
      <Title className={styles.title}>login</Title>
      <HorizontalLine />
      <form className={styles.form} onSubmit={submitFormHandler}>
        <AuthInput 
          name="email" 
          id="email" 
          label="email" 
          type="email"
          value={formData.email}
          isInValid={(formData.isEmailInValid || !formData.isInfoCorrect) && formData.isEmailTouch}
          warningText={formData.isInfoCorrect ? "email format is invalid" : "email or password is incorrect"}
          disabled={loading}
          onChange={emailChangeHandler}
          onBlur={emailTouchHandler}
        />

        <AuthInput 
          name="password" 
          id="password" 
          label="password" 
          type="password"
          isInValid={(formData.isPasswordInValid || !formData.isInfoCorrect) && formData.isPasswordTouch}
          warningText={formData.isInfoCorrect ? "password is required" : "email or password is incorrect"}
          value={formData.password}
          disabled={loading}
          onChange={passwordChangeHandler}
          onBlur={passwordTouchHandler}
        />
      </form>

      <div className={styles["btn--container"]}>
        {loading ? <Loading className={styles.loading} /> :
          <>
            <Button
              className={`${styles.btn} ${styles["btn--valid"]} ${styles["btn--back"]}`} 
              onClick={btnBackHandler} 
            > Back 
            </Button>
            <Button 
              disabled={formData.isFormInValid} 
              className={`${buttonClassName} ${styles["btn--create"]} ${styles.btn}`}
              type="submit" 
              onClick={submitFormHandler}
            > Login
            </Button>
          </>
        }
      </div>
    </Modal>
  );
}

export default Login;

function reducer(state, action){
  switch (action.type) {
    case "email": {
      const isEmailInValid = !isEmailValid(action.value);

      return { 
        ...state, 
        email: action.value,
        isEmailInValid,
        isFormInValid: isEmailInValid || state.isPasswordInValid,
        isInfoCorrect: true,
      };
    }

    case "email-touch": {
      const isEmailInValid = !isEmailValid(state.email);

      return { 
        ...state, 
        isEmailTouch: true,
        isEmailInValid,
        isFormInValid: isEmailInValid || state.isPasswordInValid,
      };
    }

    case "password": {
      const isPasswordInValid = action.value.trim().length < 8;

      return { 
        ...state, 
        password: action.value,
        isPasswordInValid,
        isFormInValid: state.isEmailInValid || isPasswordInValid,
        isInfoCorrect: true,
      };
    }

    case "password-touch": {
      const isPasswordInValid = state.password.trim().length < 8;

      return { 
        ...state, 
        isPasswordTouch: true,
        isPasswordInValid,
        isFormInValid: state.isEmailInValid || isPasswordInValid,
      };
    }

    case "info-correct": {
      return { 
        ...state, 
        isInfoCorrect: action.value,
      };
    }

    default:
      return state;
  }
}

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