import useEditModal from "../../Others/Custom/useEditModal";
import EditModalContext from "./editModal--context";

function EditModalProvider(props) {
  const [editModal, setEditModal] = useEditModal({
    show: false,
    type: "",
    value: "",
  });

  return (
    <EditModalContext.Provider value={[editModal, setEditModal]}>
      {props.children}
    </EditModalContext.Provider>
  );
}

export default EditModalProvider;
