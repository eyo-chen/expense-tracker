import { useReducer } from "react";
import Modal from "./../../UI/Modal/Modal";
import Title from "./../../UI/Title/Title";
import Button from "./../../UI/Button/Button";
import AuthInput from "./../AuthInput/AuthInput";
import HorizontalLine from "./../../UI/HorizontalLine/HorizontalLine";
import styles from "./Signup.module.css";

function Signup(props){
  const [formData, formDataDispatch] = useReducer(reducer, {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isNameInValid: true,
    isNameTouch: false,
    isEmailInValid: true,
    isEmailTouch: false,
    isPasswordInValid: true,
    isPasswordTouch: false,
    isPasswordNotMatch: true,
    isConfirmPasswordInValid: true,
    isConfirmPasswordTouch: false,
    isFormInValid: true,
  });

  const buttonClassName = formData.isFormInValid ? `btn--invalid` : `btn--valid ${styles["btn--valid"]}`

  function nameChangeHandler(e) {
    formDataDispatch({ type: "name", value: e.target.value });
  }

  function nameTouchHandler() {
    formDataDispatch({ type: "name-touch" });
  }

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

  function confirmPasswordChangeHandler(e) {
    formDataDispatch({ type: "confirmPassword", value: e.target.value });
  }

  function confirmPasswordTouchHandler() {
    formDataDispatch({ type: "confirmPassword-touch" });
  }

  function btnBackHandler() {
    props.setAuthState("welcome");
  }

  return (
    <Modal classModal={`${styles.modal} center--flex`}>
      <Title className={styles.title}>signup</Title>
      <HorizontalLine />
      <form className={styles.form}>
        <AuthInput 
          name="username" 
          id="name" 
          label="username" 
          value={formData.name}
          isInValid={formData.isNameInValid && formData.isNameTouch}
          warningText="username is required"
          onChange={nameChangeHandler}
          onBlur={nameTouchHandler}
        />

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

        <AuthInput 
          name="confirm password" 
          id="confirmPassword"
          label="confirm password"
          type="password"
          value={formData.confirmPassword}
          isInValid={formData.isConfirmPasswordInValid && formData.isConfirmPasswordTouch}
          warningText="password doesn't match"
          onChange={confirmPasswordChangeHandler}
          onBlur={confirmPasswordTouchHandler}
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
          Create
        </Button>
      </div>
    </Modal>
  );
}

export default Signup;

function reducer(state, action){
  switch (action.type) {
    case "name": {
      const isNameInValid = state.name.trim().length === 0;

      return { 
        ...state, 
        name: action.value,
        isNameInValid,
        isFormInValid: isNameInValid || state.isEmailInValid || state.isPasswordInValid || state.isConfirmPasswordInValid,
      };
    }

    case "name-touch": {
      const isNameInValid = state.name.trim().length === 0;

      return { 
        ...state, 
        isNameTouch: true,
        isNameInValid: isNameInValid,
        isFormInValid: isNameInValid || state.isEmailInValid || state.isPasswordInValid || state.isConfirmPasswordInValid,
      };
    }

    case "email": {
      const isEmailInValid = !isEmailValid(action.value);

      return { 
        ...state, 
        email: action.value,
        isEmailInValid,
        isFormInValid: state.isNameInValid || isEmailInValid || state.isPasswordInValid || state.isConfirmPasswordInValid,
      };
    }

    case "email-touch": {
      const isEmailInValid = !isEmailValid(state.email);

      return { 
        ...state, 
        isEmailTouch: true,
        isEmailInValid,
        isFormInValid: state.isNameInValid || isEmailInValid || state.isPasswordInValid || state.isConfirmPasswordInValid,
      };
    }

    case "password": {
      const isPasswordInValid = action.value.trim().length < 8;
      const isConfirmPasswordInValid = action.value !== state.confirmPassword;

      return { 
        ...state, 
        password: action.value,
        isPasswordInValid,
        isConfirmPasswordInValid,
        isFormInValid: state.isNameInValid || state.isEmailInValid || isPasswordInValid || isConfirmPasswordInValid,
      };
    }

    case "password-touch": {
      const isPasswordInValid = state.password.trim().length < 8;
      const isConfirmPasswordInValid = action.value !== state.confirmPassword;

      return { 
        ...state, 
        isPasswordTouch: true,
        isPasswordInValid,
        isConfirmPasswordInValid: isConfirmPasswordInValid,
        isFormInValid: state.isNameInValid || state.isEmailInValid || isPasswordInValid || isConfirmPasswordInValid,
      };
    }

    case "confirmPassword": {
      const isConfirmPasswordInValid = action.value !== state.password;

      return { 
        ...state, 
        confirmPassword: action.value,
        isConfirmPasswordInValid,
        isFormInValid: state.isNameInValid || state.isEmailInValid || state.isPasswordInValid || isConfirmPasswordInValid,
      };
    }

    case "confirmPassword-touch": {
      const isConfirmPasswordInValid = state.confirmPassword !== state.password;

      return { 
        ...state, 
        isConfirmPasswordTouch: true,
        isConfirmPasswordInValid,
        isFormInValid: state.isNameInValid || state.isEmailInValid || state.isPasswordInValid || isConfirmPasswordInValid,
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