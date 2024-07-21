import { useState } from "react";

function useModalCard() {
  const [modalCard, setModalCard] = useState(false);

  function modalCardToggler(e) {
    if (modalCard) return setModalCard(false);

    const id = e.target.dataset.id;
    if (!id) return;

    setModalCard(id);
  }

  return [modalCard, modalCardToggler];
}

export default useModalCard;