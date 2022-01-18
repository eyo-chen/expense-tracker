import ModalCloseIcon from "../ModalCloseIcon/ModalCloseIcon";
import ChartOption from "../../MainContent/Chart/ChartOption/ChartOption";
import style from "./ChartOptionModal.module.css";

function ChartOptionModal(props) {
  return (
    <ModalCloseIcon
      onClick={props.chartOptionModalToggler}
      classModal={style.modal}
      classBackdrop={style.backdrop}
    >
      <ChartOption
        formData={props.formData}
        dispatchFormData={props.dispatchFormData}
        chartOptionModalToggler={props.chartOptionModalToggler}
        setChartData={props.setChartData}
      />
    </ModalCloseIcon>
  );
}

export default ChartOptionModal;
