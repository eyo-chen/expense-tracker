import { useState } from "react";

function useAddDataForm() {
  const [addDataFormModal, setAddDataFormModal] = useState(false);

  function addDataFormModalToggler() {
    setAddDataFormModal((prev) => !prev);
  }

  return [addDataFormModal, addDataFormModalToggler];
}

export default useAddDataForm;
