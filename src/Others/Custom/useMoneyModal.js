import { useState } from "react";

function useMoneyModal() {
  const [moneyModal, setMoneyModal] = useState({ show: false, value: 0 });

  function moneyModalToggler(e) {
    if (moneyModal.show || e?.target.dataset.id === "true") {
      setMoneyModal((prev) => ({
        show: !prev.show,
        value: e?.target.dataset.value,
      }));
    }
  }

  return [moneyModal, moneyModalToggler];
}

export default useMoneyModal;
