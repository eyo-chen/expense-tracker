import { useState, useReducer, useRef, useEffect } from "react";
import Modal from "./../../UI/Modal/Modal";
import Title from "./../../UI/Title/Title";
import Button from "./../../UI/Button/Button";
import AuthInput from "./../AuthInput/AuthInput";
import HorizontalLine from "./../../UI/HorizontalLine/HorizontalLine";
import Loading from "./../../UI/Loading/Loading";
import styles from "./Signup.module.css";
import isEmailValid from "../../../Others/IsEmailValid/isEmailValid";
import setToken from "../../../Others/SetToken/setToken";
import fetcher from "../../../Others/Fetcher/fetcher";

const EMAIL_EXISTS_ERROR = "email already exists";

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
    isEmailExists: false,
    existEmails: [],
    isPasswordInValid: true,
    isPasswordTouch: false,
    isPasswordNotMatch: true,
    isConfirmPasswordInValid: true,
    isConfirmPasswordTouch: false,
    isFormInValid: true,
  });
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

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

  async function submitFormHandler(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const token = await createUser(formData.name, formData.email, formData.password);
      if (isMounted.current) {
        setToken(token);
        props.setAuthState("initialData");
      }
    }
    catch (error) {
      if (error.data.error === EMAIL_EXISTS_ERROR) {
        formDataDispatch({ type: "email-exists", value: formData.email });
      }

      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }

  const emailWarningText = formData.isEmailExists ? EMAIL_EXISTS_ERROR : "email format is invalid";

  return (
    <Modal classModal={`${styles.modal} center--flex`}>
      <Title className={styles.title}>signup</Title>
      <HorizontalLine />
      <form className={styles.form} onSubmit={submitFormHandler}>
        <AuthInput 
          name="username" 
          id="name" 
          label="username" 
          value={formData.name}
          isInValid={formData.isNameInValid && formData.isNameTouch}
          warningText="username is required"
          disabled={loading}
          onChange={nameChangeHandler}
          onBlur={nameTouchHandler}
        />

        <AuthInput 
          name="email" 
          id="email" 
          label="email" 
          type="email"
          value={formData.email}
          isInValid={(formData.isEmailInValid || formData.isEmailExists) && formData.isEmailTouch}
          warningText={emailWarningText}
          disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
          onChange={confirmPasswordChangeHandler}
          onBlur={confirmPasswordTouchHandler}
        />

      </form>

      <div className={styles["btn--container"]}>
        {loading ? <Loading className={styles.loading} /> : <>
                <Button
                className={`${styles.btn} ${styles["btn--valid"]} ${styles["btn--back"]}`} 
                onClick={btnBackHandler} 
              >
                Back
              </Button>
              <Button disabled={formData.isFormInValid} className={`${buttonClassName} ${styles["btn--create"]} ${styles.btn}`} type="submit" onClick={submitFormHandler}>
                Create
              </Button>
              </>
        }
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
        isFormInValid: isNameInValid || state.isEmailInValid || state.isEmailExists || state.isPasswordInValid || state.isConfirmPasswordInValid,
      };
    }

    case "name-touch": {
      const isNameInValid = state.name.trim().length === 0;

      return { 
        ...state, 
        isNameTouch: true,
        isNameInValid: isNameInValid,
        isFormInValid: isNameInValid || state.isEmailInValid || state.isEmailExists || state.isPasswordInValid || state.isConfirmPasswordInValid,
      };
    }

    case "email": {
      const isEmailInValid = !isEmailValid(action.value);
      const isEmailExists = state.existEmails.includes(action.value);

      return { 
        ...state, 
        email: action.value,
        isEmailInValid,
        isEmailExists,
        isFormInValid: state.isNameInValid || isEmailInValid || isEmailExists || state.isPasswordInValid || state.isConfirmPasswordInValid,
      };
    }

    case "email-touch": {
      const isEmailInValid = !isEmailValid(state.email);
      const isEmailExists = state.existEmails.includes(state.email);

      return { 
        ...state, 
        isEmailTouch: true,
        isEmailInValid,
        isFormInValid: state.isNameInValid || isEmailInValid || isEmailExists || state.isPasswordInValid || state.isConfirmPasswordInValid,
      };
    }

    case "email-exists": {
      return { 
        ...state, 
        isEmailExists: true,
        existEmails: [...state.existEmails, action.value],
        isFormInValid: true,
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
        isFormInValid: state.isNameInValid || state.isEmailInValid || state.isEmailExists || isPasswordInValid || isConfirmPasswordInValid,
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
        isFormInValid: state.isNameInValid || state.isEmailInValid || state.isEmailExists || isPasswordInValid || isConfirmPasswordInValid,
      };
    }

    case "confirmPassword": {
      const isConfirmPasswordInValid = action.value !== state.password;

      return { 
        ...state, 
        confirmPassword: action.value,
        isConfirmPasswordInValid,
        isFormInValid: state.isNameInValid || state.isEmailInValid || state.isEmailExists || state.isPasswordInValid || isConfirmPasswordInValid,
      };
    }

    case "confirmPassword-touch": {
      const isConfirmPasswordInValid = state.confirmPassword !== state.password;

      return { 
        ...state, 
        isConfirmPasswordTouch: true,
        isConfirmPasswordInValid,
        isFormInValid: state.isNameInValid || state.isEmailInValid || state.isEmailExists || state.isPasswordInValid || isConfirmPasswordInValid,
      };
    }

    default:
      return state;
  }
}

async function createUser(name, email, password) {
  try {
    const body = {name, email, password};
    const res = await fetcher("v1/user/signup", "POST", body);

    return res.token;
  } catch (error) {
    throw error;
  }
}