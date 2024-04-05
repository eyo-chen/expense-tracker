import { useReducer, useEffect } from "react";
import Title from "../../../UI/Title/Title";
import Button from "../../../UI/Button/Button";
import Card from "../../../UI/Card/Card";
import ChartOptionMainType from "./ChartOptionMainType/ChartOptionMainType";
import ChartOptionType from "./ChartOptionType/ChartOptionType";
import ChartOptionMainCategory from "./ChartOptionMainCategory/ChartOptionMainCategory";
import ChartOptionTime from "./ChartOptionTime/ChartOptionTime";
import BtnIcon from "../../../UI/BtnIcon/BtnIcon";
import { RiCloseCircleFill } from "react-icons/ri";
import styles from "./ChartOption.module.css";
import fetcher from "../../../../Others/Fetcher/fetcher";

function ChartOption(props) {
  const initialObj = {
    mainType: "time",
    startingDate: "",
    endingDate: "",
    timeDuration: "7",
    type: "",
    mainCategoryList: [],
    selectedMainCategoryIDs: [],
  };

  const [chartData, dispatchChartData] = useReducer(reducer, initialObj);

  useEffect(() => {
    if (chartData.type === "") return;

    fetchMainCategory(chartData.type).then((data) => {
      dispatchChartData({
        type: "MAIN_CATEGORY_LIST",
        value: data,
      });

      // set default selected main category
      const defaultSelectedMainCategoryIDs = data.map((category) => category.id);
      dispatchChartData({
        type: "DEFAULT_SELECTED_MAIN_CATEGORY_IDS",
        value: defaultSelectedMainCategoryIDs,
      });
    }).catch((err) => {
      console.log(err);
    });
  }, [chartData.type]);

  function submitFormHandler(e) {
    e.preventDefault();
    props.setChartData(chartData);

    // When chartOptionModal is opening, close it after submitting
    if (props.closeChartOptionModalHandler)
      props.closeChartOptionModalHandler();
  }

  let validIndex =
    chartData.mainType &&
    chartData.startingDate &&
    chartData.endingDate &&
    chartData.mainCategory &&
    chartData.mainCategory !== "net";

  if (chartData.mainType === "time") {
    validIndex =
      chartData.mainType &&
      chartData.startingDate &&
      chartData.mainCategory &&
      (chartData.mainCategory === "net" || chartData.subCategory.length > 0);
  }

  return (
    <Card className={styles.card}>
      <BtnIcon
        classText={styles["btn__text"]}
        classBtn={styles.close}
        onClick={props.closeChartOptionModalHandler}
        text="close"
      >
        <RiCloseCircleFill />
      </BtnIcon>

      <form onSubmit={submitFormHandler} className={styles.form}>
        <div>
          <Title className={styles["form__title"]}>Analyize By</Title>

          <ChartOptionMainType
            mainType={chartData.mainType}
            dispatchChartData={dispatchChartData}
          />

          <div className={styles.scroll}>
            <ChartOptionTime
              classColor={chartData.mainType}
              dispatchChartData={dispatchChartData}
              valueStarting={chartData.startingDate}
              valueEnding={chartData.endingDate}
              mainType={chartData.mainType}
              optionMainType={chartData.mainType}
            />
            <ChartOptionType
              mainType={chartData.mainType}
              type={chartData.type}
              classColor={chartData.mainType}
              dispatchChartData={dispatchChartData}
            />
            {chartData.type !== "net" &&
              <ChartOptionMainCategory
                mainCategoryList={chartData.mainCategoryList}
                dispatchChartData={dispatchChartData}
              />
            }
          </div>
        </div>

        <Button
          disabled={!validIndex}
          className={`${styles.btn} transition--25 ${
            !validIndex ? `btn--invalid` : `btn--valid`
          }`}
        >
          Show Chart
        </Button>
      </form>
    </Card>
  );
}

export default ChartOption;

async function fetchMainCategory(type) {
  try {
    const data = await fetcher(`v1/main-category?type=${type}`, "GET");
    return data.categories;
  } catch (err) {
    throw err;
  }
}

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

    case "TYPE": {
      return { ...state, type: action.value };
    }

    case "MAIN_CATEGORY_LIST": {
      return { ...state, mainCategoryList: action.value };
    }

    case "DEFAULT_SELECTED_MAIN_CATEGORY_IDS": {
      return { ...state, selectedMainCategoryIDs: action.value };
    }

    case "SELECTED_MAIN_CATEGORY_IDS": {
      let selectedMainCategoryIDs;

      if (action.checked) {
        selectedMainCategoryIDs = [...state.selectedMainCategoryIDs, action.value];
      } else {
        selectedMainCategoryIDs = state.selectedMainCategoryIDs.filter(
          (id) => id !== action.value
        );
      }

      return { ...state, selectedMainCategoryIDs: selectedMainCategoryIDs };
    }

    default:
      return state;
  }
}