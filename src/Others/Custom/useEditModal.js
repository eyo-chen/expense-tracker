import { useState, useEffect } from "react";

function useEditModal(value) {
  const [editModal, setEditModal] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEditModal({
        show: false,
        type: "",
        value: "",
      });
    }, 2000);

    return function cleanUp() {
      clearTimeout(timer);
    };
  }, [editModal.show]);
  // Reference 1

  return [editModal, setEditModal];
}

export default useEditModal;

/*
editModal is an object
If put this in dependency, it will cause infinite-loop
*/
