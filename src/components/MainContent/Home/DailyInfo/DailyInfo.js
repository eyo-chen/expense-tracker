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
import style from "./DailyInfo.module.css";
const { TODAY } = timeObj;

function DailyInfo(props) {
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

  let listContent = (
    <div className={`${style.noData} center--flex capitalize`}>
      <p>no data</p>
      <p>click button to add data</p>
    </div>
  );

  if (expenseDataList.length > 0)
    listContent = <ExpenseList data={expenseDataList} classItem={style.item} />;

  return (
    <div className={style.daily}>
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

      <div className={style["title__container"]}>
        <Title>daily transection</Title>

        <div className={`${style["btn__container"]} center--flex`}>
          <BtnIcons onClick={modalCardToggler} />
          <BtnIcon
            onClick={addDataFormModalToggler}
            text="click to add data"
            classBtn={`${style["btn--main"]} uppercase`}
            classText={style["btn__text--main"]}
          >
            <TiPlus aria-label="add data" className={style["btn--icon"]} />
            <p>add data</p>
          </BtnIcon>
        </div>
      </div>

      <div className={style["calendar__container"]}>
        <BtnIcon
          text="last week"
          dataID="last"
          onClick={arrowBtnClickHandler}
          classBtn={`${style["btn--arow"]} center--flex`}
          classText={style["btn__text"]}
        >
          {"<"}
        </BtnIcon>
        {weeklyCalendarList}
        <BtnIcon
          text="next week"
          dataID="next"
          onClick={arrowBtnClickHandler}
          classBtn={`${style["btn--arow"]} center--flex`}
          classText={style["btn__text"]}
        >
          {">"}
        </BtnIcon>
      </div>

      <div className={`${style.card} capitalize`}>
        <DailyDataCard text="expense" value={expense} />
        <DailyDataCard text="income" value={income} />
        <DailyDataCard text="net income" value={netIncome} />
      </div>
      {listContent}
    </div>
  );
}

export default DailyInfo;
