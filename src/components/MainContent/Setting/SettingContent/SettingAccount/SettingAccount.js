import { useContext, useReducer } from "react";
import Button from "../../../../UI/Button/Button";
import InputText from "../../../../UI/InputText/InputText";
import AccountInfoContext from "../../../../../store/accountInfo/accountInfo--context";
import Warning from "../../../../UI/Warning/Warning";
import style from "./SettingAccount.module.css";

function reducer(state, action) {
  switch (action.type) {
    case "name": {
      let validText = true;
      if (action.value.length === 0) validText = false;

      return { ...state, name: action.value, validText };
    }

    case "background": {
      return { ...state, background: action.value };
    }

    case "email": {
      let validEmail = true;
      if (action.value.length === 0 || !action.value.includes("@"))
        validEmail = false;
      return { ...state, email: action.value, validEmail };
    }

    default:
      return state;
  }
}

function SettingAccount() {
  const { accountInfo, setAccountInfo } = useContext(AccountInfoContext);

  const [infoValidation, setInfoValidation] = useReducer(reducer, {
    name: accountInfo.name,
    background: accountInfo.background,
    email: accountInfo.email,
    validText: true,
    validEmail: true,
  });

  function nameChangeHandler(e) {
    setInfoValidation({ type: "name", value: e.target.value });
  }

  function emailChangeHandler(e) {
    setInfoValidation({ type: "email", value: e.target.value });
  }

  function backgroundChangeHandler(e) {
    setInfoValidation({ type: "background", value: e.target.value });
  }

  function submitHandler(e) {
    e.preventDefault();

    setAccountInfo({
      name: infoValidation.name,
      background: infoValidation.background,
      email: infoValidation.email,
    });
  }

  return (
    <form className={style.form} onSubmit={submitHandler}>
      <div>
        <InputText
          id="name"
          label="name"
          name="name"
          type="text"
          value={infoValidation.name}
          classInput={
            infoValidation.validText
              ? `${style.input}`
              : `${style.input} input--invalid`
          }
          classLabel={`${style.label} capitalize`}
          onChange={nameChangeHandler}
        />
        <Warning className={style.warnning} index={!infoValidation.validText}>
          the length of name has to be at least greater than 1
        </Warning>
      </div>

      <div>
        <InputText
          id="email"
          label="email"
          name="email"
          type="email"
          value={infoValidation.email}
          classInput={
            infoValidation.validEmail
              ? `${style.input}`
              : `${style.input} input--invalid`
          }
          classLabel={`${style.label} capitalize`}
          onChange={emailChangeHandler}
        />
        <Warning className={style.warnning} index={!infoValidation.validEmail}>
          invalid email format
        </Warning>
      </div>

      <div>
        <InputText
          id="background"
          label="background"
          name="background"
          type="color"
          value={infoValidation.background}
          classInput={`${style.input} ${style.color}`}
          classLabel={`${style.label} capitalize`}
          onChange={backgroundChangeHandler}
        />
      </div>

      <Button
        type="submit"
        disabled={!(infoValidation.validText && infoValidation.validEmail)}
        className={
          infoValidation.validText && infoValidation.validEmail
            ? `${style.btn} uppercase transition--25 btn--valid`
            : `${style.btn} uppercase transition--25 btn--invalid`
        }
      >
        change
      </Button>
    </form>
  );
}

export default SettingAccount;
/*
      <div>
        <InputText
          id="password"
          label="password"
          name="password"
          type="password"
          classInput={style.input}
          classLabel={`${style.label} capitalize`}
        />
      </div>
*/
