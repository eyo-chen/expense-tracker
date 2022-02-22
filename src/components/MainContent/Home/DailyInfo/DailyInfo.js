import { useContext } from "react";
import ExpenseDataContext from "../../../../store/expenseData/expenseData--context";
import AddDataForm from "../../../UI/AddDataForm/AddDateForm";
import DataCardModal from "../../../UI/DataCardModal/DataCardModal";
import BtnIcon from "../../../UI/BtnIcon/BtnIcon";
import BtnIcons from "../../../UI/BtnIcons/BtnIcons";
import WeeklyCalendarList from "./WeeklyCalendarList";
import ExpenseList from "../../../UI/ExpenseList/ExpenseList";
import Title from "../../../UI/Title/Title";
import SmallChartModal from "../../../UI/SmallChartModal/SmallChartModal";
import DailyDataCard from "./DailyDataCard";
import timeObj from "../../../assets/timeObj/timeObj";
import createAccAmount from "../../../../Others/CreateAccountCardData/createAccAmount";
import createYearMonthDay from "../../../../Others/CreateYearMonthDay/createYearMonthDay";
import useAddDataForm from "../../../../Others/Custom/useAddDataForm";
import formatMoney from "../../../../Others/FormatMoney/formatMoney";
import mutipleArgsHelper from "../../../../Others/MultipleArgsHelper/multipleArgsHelper";
import useBundleData from "../../../../Others/Custom/useBundleData";
import { TiPlus } from "react-icons/ti";
import LoadingData from "../../../UI/LoadingData/LoadingData";
import styles from "./DailyInfo.module.css";
const { TODAY } = timeObj;

function DailyInfo(props) {
  const { dataIsLoading } = useContext(ExpenseDataContext);
  const [addDataFormModal, addDataFormModalToggler] = useAddDataForm();
  const [
    weeklyCalendar,
    expenseDataList,
    selectedDate,
    setSelectedDate,
    modalCard,
    modalCardToggler,
  ] = useBundleData("daily", props.week);

  const [income, expense, netIncome] = mutipleArgsHelper(
    formatMoney,
    ...createAccAmount(
      expenseDataList,
      ...Array(3), // skip three arguments
      true
    )
  );

  function arrowBtnClickHandler(e) {
    const newDate = new Date(props.week);
    const id = e.target.dataset.id;

    if (id === "next") newDate.setDate(newDate.getDate() + 7);
    else if (id === "last") newDate.setDate(newDate.getDate() - 7);
    else return;

    props.setWeek(newDate);
    setSelectedDate(newDate);
  }

  let active = false;
  let selected = false;
  const weeklyCalendarList = weeklyCalendar.map(
    ({ year, month, monthDay, weekDay, dateObj }) => {
      // check if it's "current" today
      const [todayYear, todayMonth, todayDate] = createYearMonthDay(TODAY);
      // check if it's selected day
      const [selectedYear, selectedMonth, selectedDateNum] = createYearMonthDay(
        new Date(selectedDate)
      );

      if (year === todayYear && month === todayMonth && monthDay === todayDate)
        active = true;
      else active = false;

      if (
        year === selectedYear &&
        month === selectedMonth &&
        monthDay === selectedDateNum &&
        !active
      )
        selected = true;
      else selected = false;

      return (
        <WeeklyCalendarList
          key={weekDay}
          weekDay={weekDay}
          monthDay={monthDay}
          dateObj={dateObj}
          active={active}
          selected={selected}
          setSelectedDate={setSelectedDate}
        />
      );
    }
  );

  const dataListContent = dataIsLoading ? (
    <LoadingData />
  ) : expenseDataList.length > 0 ? (
    <ExpenseList data={expenseDataList} classItem={styles.item} />
  ) : (
    <div className={`${styles.noData} center--flex capitalize`}>
      <p>no data</p>
      <p>click button to add data</p>
    </div>
  );

  return (
    <div className={styles.daily}>
      {addDataFormModal && (
        <AddDataForm
          addDataFormModalToggler={addDataFormModalToggler}
          date={selectedDate}
        />
      )}
      {modalCard === "chart" && (
        <SmallChartModal
          type="week"
          modalCardToggler={modalCardToggler}
          date={props.week}
        />
      )}
      {modalCard === "info" && (
        <DataCardModal
          type="week"
          modalCardToggler={modalCardToggler}
          date={props.week}
        />
      )}

      <div className={styles["title__container"]}>
        <Title>daily transection</Title>

        <div className={`${styles["btn__container"]} center--flex`}>
          <BtnIcons onClick={modalCardToggler} />
          <BtnIcon
            onClick={addDataFormModalToggler}
            text="click to add data"
            classBtn={`${styles["btn--main"]} uppercase`}
            classText={styles["btn__text--main"]}
          >
            <TiPlus aria-label="add data" className={styles["btn--icon"]} />
            <p>add data</p>
          </BtnIcon>
        </div>
      </div>

      <div className={styles["calendar__container"]}>
        <BtnIcon
          text="last week"
          dataID="last"
          onClick={arrowBtnClickHandler}
          classBtn={`${styles["btn--arow"]} center--flex`}
          classText={styles["btn__text"]}
        >
          {"<"}
        </BtnIcon>
        {weeklyCalendarList}
        <BtnIcon
          text="next week"
          dataID="next"
          onClick={arrowBtnClickHandler}
          classBtn={`${styles["btn--arow"]} center--flex`}
          classText={styles["btn__text"]}
        >
          {">"}
        </BtnIcon>
      </div>

      <div className={`${styles.card} capitalize`}>
        <DailyDataCard text="expense" value={expense} />
        <DailyDataCard text="income" value={income} />
        <DailyDataCard text="net income" value={netIncome} />
      </div>
      {dataListContent}
    </div>
  );
}

export default DailyInfo;
