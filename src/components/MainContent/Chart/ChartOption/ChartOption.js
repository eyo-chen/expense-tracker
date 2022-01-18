import { useState, useReducer, useContext } from "react";
import style from "./ChartOption.module.css";
import Title from "../../../UI/Title/Title";
import Button from "../../../UI/Button";
import Card from "../../../UI/Card/Card";
import OptionRadioMain from "./OptionRadioMain/OptionRadioMain";
import OptionTime from "./OptionTime/OptionTime";
import OptionRadioSub from "./OptionRadioSub/OptionRadioSub";
import OptionCheckboxExpense from "./OptionCheckbox/OptionCheckboxExpense";
import OptionCheckboxIncome from "./OptionCheckbox/OptionCheckBoxIncome";
import CategoryContext from "../../../../store/category/category--context";

function reducer(state, action) {
  switch (action.type) {
    case "MAIN_TYPE": {
      return { ...state, mainType: action.value };
    }

    case "STARTING_DATE": {
      return { ...state, startingDate: action.value };
    }

    case "ENDING_DATE": {
      return { ...state, endingDate: action.value };
    }

    case "TIME_DURATION": {
      return { ...state, timeDuration: action.value };
    }

    case "MAIN_CATEGORY": {
      let subCategoryArr = [];
      if (action.value === "income") subCategoryArr = state.categoryIncome;
      if (action.value === "expense") subCategoryArr = state.categoryExpense;

      return {
        ...state,
        mainCategory: action.value,
        subCategory: subCategoryArr,
      };
    }

    case "SUB_CATEGORY": {
      let subCategoryArr;
      // add
      if (action.check) {
        // first check if the items has been in the array(avoid duplicate)
        if (!state.subCategory.includes(action.value))
          subCategoryArr = [...state.subCategory, action.value];
      }

      // remove
      else {
        subCategoryArr = state.subCategory.filter(
          (element) => element !== action.value
        );
      }

      return {
        ...state,
        subCategory: subCategoryArr,
      };
    }

    case "ISVALID": {
      return { ...state, isValid: true };
    }

    default:
      return state;
  }
}

function ChartOption(props) {
  const { categoryExpense, categoryIncome } = useContext(CategoryContext);

  const initialObj = {
    mainType: "",
    startingDate: "",
    endingDate: "",
    timeDuration: "7",
    mainCategory: "",
    subCategory: "",
    isValid: false,
    categoryExpense: Object.keys(categoryExpense),
    categoryIncome: Object.keys(categoryIncome),
  };

  const [optionMainData, setOptionMainData] = useState();
  const [optionSubData, setOptionSubData] = useState();
  const [chartData, dispatchChartData] = useReducer(reducer, initialObj);

  // it has to be three different indexes(helps to show the warning icon in ChartTime component)
  // 1. for checking if user has chosen both starting and ending date
  const timeValidIndex = chartData.startingDate && chartData.endingDate;

  // 2. for checking if user did NOT select the wrong order
  const timeOrderValidIndex =
    Number(new Date(chartData.startingDate)) <
    Number(new Date(chartData.endingDate));

  // 3. for check all the data in the form (includes above two indexes)
  let validIndex =
    optionMainData && optionSubData && timeValidIndex && timeOrderValidIndex;

  // check box content may vary because different kind of chart
  let checkboxContent = "";
  if (optionMainData === "time") {
    if (optionSubData === "income")
      checkboxContent = (
        <OptionCheckboxIncome
          categoryIncome={chartData.categoryIncome}
          dispatchChartData={dispatchChartData}
        />
      );
    if (optionSubData === "expense")
      checkboxContent = (
        <OptionCheckboxExpense
          categoryExpense={chartData.categoryExpense}
          dispatchChartData={dispatchChartData}
        />
      );

    validIndex = optionMainData && optionSubData && chartData.startingDate;
  }

  function submitFormHandler(e) {
    e.preventDefault();
    props.setChartData(chartData);

    // When chartOptionModal is open, we wanna close it after submitting
    if (props.chartOptionModalToggler) props.chartOptionModalToggler();
  }

  return (
    <Card
      className={
        chartData.subCategory.length > 8
          ? `${style["chartOption--scroll"]}`
          : `${style.card}`
      }
    >
      <form onSubmit={submitFormHandler} className={style.chartOption}>
        <div>
          <Title className={style["chartOption__title"]}>Analyize By</Title>

          <OptionRadioMain
            dispatchChartData={dispatchChartData}
            setOptionMainData={setOptionMainData}
          />

          {optionMainData && (
            <div>
              <OptionTime
                classColor={optionMainData}
                dispatchChartData={dispatchChartData}
                valueStarting={chartData.startingDate}
                valueEnding={chartData.endingDate}
                optionMainData={optionMainData}
                timeValidIndex={timeValidIndex}
                timeOrderValidIndex={timeOrderValidIndex}
              />
              <OptionRadioSub
                classColor={optionMainData}
                setOptionSubData={setOptionSubData}
                dispatchChartData={dispatchChartData}
              />
              {checkboxContent}
            </div>
          )}
        </div>

        <Button
          disabled={!validIndex}
          className={
            !validIndex
              ? `${style.btn}`
              : `${style.btn} ${style["btn--active"]}`
          }
        >
          Show Chart
        </Button>
      </form>
    </Card>
  );
}

export default ChartOption;
