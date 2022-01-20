import Button from "../../../../UI/Button/Button";
import InputText from "../../../../UI/InputText/InputText";
import style from "./SettingAccount.module.css";

function SettingAccount(props) {
  return (
    <form className={style.form}>
      <InputText id="name" label="name" type="text" classInput={style.input} />
      <InputText
        id="email"
        label="email"
        type="email"
        classInput={style.input}
      />
      <InputText
        id="password"
        label="password"
        type="password"
        classInput={style.input}
      />
      <InputText
        id="background"
        label="background"
        type="color"
        classInput={`${style.input} ${style.color}`}
        classInputContainer={style["form__list"]}
      />
      <Button type="submit" className={style.btn}>
        change
      </Button>
    </form>
  );
}

export default SettingAccount;
