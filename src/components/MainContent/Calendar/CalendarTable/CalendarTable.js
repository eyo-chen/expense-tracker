import { useState } from "react";
import Title from "../../../UI/Title/Title";
import ExpenseListModal from "../../../UI/ExpenseListModal/ExpenseListModal";
import AddDataForm from "../../../UI/AddDataForm/AddDateForm";
import BtnIcons from "../../../UI/BtnIcons/BtnIcons";
import SmallChartModal from "../../../UI/SmallChartModal/SmallChartModal";
import DataCardModal from "../../../UI/DataCardModal/DataCardModal";
import BtnIcon from "../../../UI/BtnIcon/BtnIcon";
import useAddDataForm from "../../../../Others/Custom/useAddDataForm";
import useModalCard from "../../../../Others/Custom/useModalCard";
import CreateCalendarTable from "./CreateCalendarTable";
import styles from "./CalendarTable.module.css";

const dateOptObj = { month: "long" };

function CalendarTable(props) {
  const [selectedDate, setSelectedDate] = useState(props.month);
  const [modalCard, modalCardToggler] = useModalCard();
  const [expenseListModal, setExpenseListModal] = useState(false);
  const [addDataFormModal, addDataFormModalToggler] = useAddDataForm();
  const calendarTable = CreateCalendarTable(props.month, expenseListModalToggler);

  function arrowBtnClickHandler(e) {
    // Reference 1
    const newDate = new Date(props.month.getFullYear(), props.month.getMonth(), 1);

    if (e.target.dataset.id === "increase") {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }

    props.setMonth(newDate);
  }

  function expenseListModalToggler(e) {
    if (expenseListModal) {
      setExpenseListModal(false);
    } else {
      const date = e.target.dataset.id;

      if (!date) return;
      setSelectedDate(date);
      setExpenseListModal(true);
    }
  }

  return (
    <>
      {expenseListModal && (
        <ExpenseListModal
          selectedDate={selectedDate}
          expenseListModalToggler={expenseListModalToggler}
          addDataFormModalToggler={addDataFormModalToggler}
        />
      )}
      {addDataFormModal && (
        <AddDataForm
          date={selectedDate}
          addDataFormModalToggler={addDataFormModalToggler}
        />
      )}
      {modalCard === "chart" && (
        <SmallChartModal
          type="month"
          modalCardToggler={modalCardToggler}
          date={props.month}
        />
      )}
      {modalCard === "info" && (
        <DataCardModal
          type="month"
          modalCardToggler={modalCardToggler}
          date={props.month}
        />
      )}

      <div className={styles["icon__container"]}>
        <BtnIcons onClick={modalCardToggler} />
      </div>

      <div className={styles["monthly__container"]}>
        <div className={styles["monthly__month"]}>
          <BtnIcon
            text="last month"
            onClick={arrowBtnClickHandler}
            classBtn={styles.btn}
            classText={styles["btn__text"]}
            dataID="decrease"
          >
            {"<"}
          </BtnIcon>

          <div className={`${styles["monthly__title"]} center--flex`}>
            <Title className={styles.title}>
              {new Intl.DateTimeFormat("en-US", dateOptObj).format(props.month)}
            </Title>
            <Title className={styles.title}>{props.month.getFullYear()}</Title>
          </div>
          <BtnIcon
            text="next month"
            onClick={arrowBtnClickHandler}
            classBtn={styles.btn}
            classText={styles["btn__text"]}
            dataID="increase"
          >
            {">"}
          </BtnIcon>
        </div>
        <div className={styles["monthly__week"]}>
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className={styles["monthly__days"]}>{calendarTable}</div>
      </div>
    </>
  );
}
export default CalendarTable;

/*
  Reference 1

  Copying the new date object is vary important
  Imagine without this
  We set a variable called date outside the component function
  And user modify the value whenever click the arrow btn

  The weird thing's gonna happen after user exit the calendar page and come back again
  the value of variable won't change back to initial value because it's outside the componentfunction
  For example, initial value is February, and user keep click next month arrow btn
  So now the value is June
  Once user click next month arrow btn again, 
  User expect it should be March since that's the next month of initial value
  But not the value is July (old mutated value + one month)

  Now, whenever user come back this page, our initial value is always current month
  because that's how we set in here const [date, setDate] = useState(new Date());
  Then user click the arrow btn, we 
  1. copy the value
  2. mutate tha value
  3. set this new mutated value to the new state value

  So next time user clcik the btn again
  the date in const newDate = new Date(date); is the value we mutated in the last state
*/
