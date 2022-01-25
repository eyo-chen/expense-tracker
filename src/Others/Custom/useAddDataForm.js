import { useState } from "react";
function useAddDataForm() {
  const [addDataFormModal, setAddDataFormModal] = useState(false);

  function addDataFormModalToggler() {
    setAddDataFormModal((prev) => !prev);
  }

  return [addDataFormModal, addDataFormModalToggler];
}

export default useAddDataForm;

// function useAddDataForm(props) {
//   const [addDataFromState, setAddDataFormState] = useState({
//     show: false,
//     initialObj: {},
//     date: undefined,
//   });

//   function showAddFormHandler() {
//     setAddDataFormState({
//       show: true,
//       date: props.date,
//       initialObj: props.initialObj,
//     });
//   }

//   function closeAddDataFormHandler() {
//     setAddDataFormState({
//       show: false,
//       initialObj: {},
//       date: undefined,
//     });
//   }

//   return [
//     addDataFromState,
//     setAddDataFormState,
//     showAddFormHandler,
//     closeAddDataFormHandler,
//   ];
// }

// export default useAddDataForm;
