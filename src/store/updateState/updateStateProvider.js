import { useState } from "react";
import UpdateStateContext from "./updateState--context";


function UpdateStateProvider(props) {
  const [updateState, setUpdateState] = useState(false);

  function updateStateHandler() {
    setUpdateState((prev) => !prev);
  }

  return (
    <UpdateStateContext.Provider value={{updateState, updateStateHandler}}>
      {props.children}
    </UpdateStateContext.Provider>
  );
}

export default UpdateStateProvider;