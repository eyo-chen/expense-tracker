import { auth } from "../../../../../firebase-config";
import styles from "./SettingAccount.module.css";

function SettingAccount() {
  const { displayName, email } = auth.currentUser;

  return (
    <div>
      <div className={styles.container}>
        <p className={`${styles.label} capitalize`}>name</p>
        <p className={styles.info}>{displayName}</p>
      </div>
      <div>
        <p className={`${styles.label} capitalize`}>email</p>
        <p className={styles.info}>{email}</p>
      </div>
    </div>
  );
}

export default SettingAccount;

/*
function reducer(state, action) {
  switch (action.type) {
    case "name": {
      let validText = true;
      if (action.value.length === 0) validText = false;

      return { ...state, name: action.value, validText };
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
  const { displayName, email } = auth.currentUser;

  const [infoValidation, setInfoValidation] = useReducer(reducer, {
    name: accountInfo.name,
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

  function submitHandler(e) {
    e.preventDefault();

    setAccountInfo({
      name: infoValidation.name,
      email: infoValidation.email,
    });
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div>
        <InputText
          id="name"
          label="name"
          name="name"
          type="text"
          value={infoValidation.name}
          classInput={
            infoValidation.validText
              ? `${styles.input}`
              : `${styles.input} input--invalid`
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

      <Button
        type="submit"
        disabled={!(infoValidation.validText && infoValidation.validEmail)}
        className={`${style.btn} uppercase transition--25 ${
          infoValidation.validText && infoValidation.validEmail
            ? `btn--valid`
            : `btn--invalid`
        }`}
      >
        change
      </Button>
    </form>
  );
}

*/
