import useAddDataForm from "../../../../Others/Custom/useAddDataForm";
import Title from "../../../UI/Title/Title";
import BtnIcon from "../../../UI/BtnIcon/BtnIcon";
import AddStockForm from "../../../UI/AddStockForm/AddStockForm";
import { TiPlus } from "react-icons/ti";
import styles from "./StockTitle.module.css";

function StockTitle() {
  const [addDataFormModal, addStockFormModalToggler] = useAddDataForm();

  return (
    <div className={styles["title__container"]}>
      {addDataFormModal && (
        <AddStockForm
          addStockFormModalToggler={addStockFormModalToggler}
          date={null}
        />
      )}
      <Title>Stock Portfolio</Title>
      <div className={`${styles["btn__container"]} center--flex`}>
          <BtnIcon
            onClick={addStockFormModalToggler}
            text="click to add data"
            classBtn={`${styles["btn--main"]} uppercase`}
            classText={styles["btn__text--main"]}
          >
            <TiPlus aria-label="add data" className={styles["btn--icon"]} />
            <p>add data</p>
          </BtnIcon>
        </div>
    </div>
  );
}

export default StockTitle;