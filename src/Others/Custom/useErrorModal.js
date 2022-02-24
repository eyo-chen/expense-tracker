import { useState } from "react";

function useErrorModal() {
  const [errorModal, setErrorModal] = useState(false);

  return [errorModal, setErrorModal];
}

export default useErrorModal;
