import { useState } from "react";

function useAddDataForm(props) {
  const [addDataFromState, setAddDataFormState] = useState({
    show: false,
    initialObj: {},
    date: undefined,
  });

  function showAddFormHandler() {
    setAddDataFormState({
      show: true,
      date: props.date,
      initialObj: props.initialObj,
    });
  }

  function closeAddDataFormHandler() {
    setAddDataFormState({
      show: false,
      initialObj: {},
      date: undefined,
    });
  }

  console.log("from custom hook");
  console.log("aa");

  return [
    addDataFromState,
    setAddDataFormState,
    showAddFormHandler,
    closeAddDataFormHandler,
  ];
}

export default useAddDataForm;
