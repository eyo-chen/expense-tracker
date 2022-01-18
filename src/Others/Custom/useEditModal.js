import { useState, useEffect } from "react";

function useEditModal(value) {
  const [editModal, setEditModal] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEditModal(false);
    }, 3000);

    return function cleanUp() {
      clearTimeout(timer);
    };
  }, [editModal]);

  return [editModal, setEditModal];
}

export default useEditModal;
