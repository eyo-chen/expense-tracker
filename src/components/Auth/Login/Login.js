import { useReducer } from "react";
import Modal from "./../../UI/Modal/Modal";
import Title from "./../../UI/Title/Title";
import Button from "./../../UI/Button/Button";
import AuthInput from "./../AuthInput/AuthInput";
import HorizontalLine from "./../../UI/HorizontalLine/HorizontalLine";
import styles from "./Login.module.css";

function Login(props){
  const [formData, formDataDispatch] = useReducer(reducer, {
    email: "",
    password: "",
    isEmailInValid: true,
    isEmailTouch: false,
    isPasswordInValid: true,
    isFormInValid: true,
  });

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

  return (
    <Modal classModal={`${styles.modal} center--flex`}>
      <Title className={styles.title}>login</Title>
      <HorizontalLine />
      <form className={styles.form}>
        <AuthInput 
          name="email" 
          id="email" 
          label="email" 
          type="email"
          value={formData.email}
          isInValid={formData.isEmailInValid && formData.isEmailTouch}
          warningText="email format is invalid"
          onChange={emailChangeHandler}
          onBlur={emailTouchHandler}
        />

        <AuthInput 
          name="password" 
          id="password" 
          label="password" 
          type="password"
          isInValid={formData.isPasswordInValid && formData.isPasswordTouch}
          warningText="password must be at least 8 characters"
          value={formData.password}
          onChange={passwordChangeHandler}
          onBlur={passwordTouchHandler}
        />

      </form>

      <div className={styles["btn--container"]}>
        <Button
          className={`${styles.btn} ${styles["btn--valid"]} ${styles["btn--back"]}`} 
          onClick={btnBackHandler} 
        >
          Back
        </Button>
        <Button disabled={formData.isFormInValid} className={`${buttonClassName} ${styles["btn--create"]} ${styles.btn}`}>
          Login
        </Button>
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

    default:
      return state;
  }
}

const isEmailValid = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
