import { useReducer, useContext, useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import Title from "../Title/Title";
import Button from "../Button/Button";
import InputText from "../InputText/InputText";
import InputFile from "../InputFile/InputFile";
import InputRadio from "../InputRadio/InputRadio";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import EditModalContext from "../../../store/editModal/editModal--context";
import Warning from "../Warning/Warning";
import styles from "./AddMainCategoryModal.module.css";
import LoadingUI from "../Loading/Loading";
import fetcher from "../../../Others/Fetcher/fetcher";

function AddMainCategoryModal(props) {
  const [iconList, setIconList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [_, setEditModal] = useContext(EditModalContext);

  const [form, formDispatch] = useReducer(reducer, {
    name: "",
    iconIndex: "",
    iconType: "",
    iconID: 0,
    isValid: false,
    inputValid: false,
    isDuplicate: false,
    isTouch: false,
    categoryList: props.state.list,
  });

  function inputTextTouchHandler() {
    formDispatch({ type: "TOUCH" });
  }

  function inputTextChangeHandler(e) {
    formDispatch({ type: "NAME", value: e.target.value });
  }

  function radioIconChangeHandler(e) {
    const icon = iconList[e.target.value];
    const value = {
      index: e.target.value,
      type: icon.type,
      id: icon.id,
    }

    formDispatch({ type: "ICON", value });
  }

  async function uploadIconChangeHandler(file) {
    try {
      const resizedImage = await resizeImage(file, 18.4, 18.4);
      const binaryData = await readFileAsBinaryString(resizedImage);
      const presignedUrl = await getPresignedUrl(file.name);
      await uploadFile(presignedUrl, binaryData);
      await createUserIcon(file.name);

      const iconList = await fetchIconList();
      setIconList(iconList);
    } catch (error) {
      console.error("Error uploading icon:", error);
    }
  }

  async function fetchIconList() {
    try {
      setLoading(true);
      const data = await fetcher(
        `v1/user-icon`,
        "GET"
      );
      
      return data.icons;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchIconList()
    .then((data) => {
      setIconList(data)
    }).catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, [])

  async function addMainCategory(name, type, iconType, iconID) {
    try {
      await fetcher(
        `v1/main-category`,
        "POST",
        {
          name,
          type,
          icon_type: iconType,
          icon_id: iconID,
        }
      );
    } catch (err) {
      throw err;
    }
  }

  // Reference 1
  async function formSubmitHandler(e) {
    e.preventDefault();

    try {
      // add main category
      await addMainCategory(form.name, props.curType, form.iconType, form.iconID);

      // close modal
      props.dispatch({ type: "ADD_MODAL_TOGGLER" })

      // show edit success popup
      setEditModal({
        show: true,
        type: props.curType,
        value: "add",
        status: "success",
      });

      // update main category list
      const newCategoryList = await props.getMainCategory(props.curType);
      props.dispatch({ type: "ADD", value: newCategoryList });
    } catch (error) {
      console.log("Error adding main category:", error);
      setEditModal({
        show: true,
        type: props.curType,
        value: "add",
        status: "fail",
      });
    }
  }

  let iconListContent = <LoadingUI />;

  if (!loading) {
    iconListContent = iconList.map(({ id, url, type }, index) => {
      const iconImg = <img alt="icon" className={`icon`} src={url} />;
      const key = `${id}-${type}`;

      return (
        <InputRadio
          key={key}
          name="icon"
          ariaLabel="icon"
          label={iconImg}
          value={index}
          classLabel={`${styles.icon} transition--25 ${
            props.curType === "expense"
              ? `${styles["icon--expense"]}`
              : `${styles["icon--income"]}`
          }`}
          classContainer={styles["radio__container"]}
          classInput={styles["input--icon"]}
          onChange={radioIconChangeHandler}
          checked={index + "" === form.iconIndex}
        />
      );
    });
  }

  // Reference 2
  const warnningIndex = form.isDuplicate || (form.isTouch && !form.inputValid);

  // Reference 3
  const warnningText = form.isDuplicate
    ? "duplicate category name is not allowed"
    : "required";

  return (
    <Modal
      onClick={() => props.dispatch({ type: "ADD_MODAL_TOGGLER" })}
      classModal={styles.modal}
    >
      <Title className={styles.title}>add main category</Title>
      <HorizontalLine />
      <form onSubmit={formSubmitHandler} className={styles.form}>
        <div className={styles.container}>
          <div className={styles["input__container"]}>
            <InputText
              name="maincategory"
              id="name"
              label="main category name"
              value={form.name}
              classLabel={styles.label}
              classInput={
                warnningIndex
                  ? `${styles.input} input--invalid`
                  : `${styles.input}`
              }
              onChange={inputTextChangeHandler}
              onBlur={inputTextTouchHandler}
            />
          </div>
          <Warning className={styles.warning} index={warnningIndex}>
            {warnningText}
          </Warning>
        </div>
        <div className={styles["input__container"]}>
          <div className={styles["upload__container"]}>
            <p className={`${styles.label} capitalize`}>icon</p>
            <InputFile
              name="icon"
              id="icon"
              label="upload icon"
              accept=".svg,image/svg+xml"
              color={props.curType === "expense" ? "blue" : "pink"}
              onChange={uploadIconChangeHandler}
            />
          </div>
          <div className={styles["icon__container"]}>{iconListContent}</div>
        </div>
        <div className={styles["btn__container"]}>
          <Button
            onClick={() => props.dispatch({ type: "ADD_MODAL_TOGGLER" })}
            className={`${styles.btn} btn--valid transition--25`}
            type="button"
          >
            cancel
          </Button>
          <Button
            disabled={!form.isValid}
            className={`${styles.btn} transition--25 ${styles["btn--right"]} ${
              form.isValid ? `btn--valid` : "btn--invalid"
            }`}
            type="submit"
          >
            add
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default AddMainCategoryModal;

function readFileAsBinaryString(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
}

async function getPresignedUrl(fileName) {
  const data = await fetcher(`v1/user-icon/url`, "POST", {
    "file_name": fileName
  });

  return data.url;
}

async function uploadFile(presignedUrl, binaryData) {
  const response = await fetch(presignedUrl, {
    method: 'PUT',
    body: binaryData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload file');
  }
}

async function createUserIcon(fileName) {
  await fetcher(`v1/user-icon`, "POST", {
    "file_name": fileName
  });
}

function reducer(state, action) {
  switch (action.type) {
    case "NAME": {
      const isDuplicate = state.categoryList.find(
        (element) => element.name === action.value
      )
      const inputValid = action.value.trim().length > 0 && !isDuplicate;

      return {
        ...state,
        name: action.value,
        inputValid,
        isDuplicate,
        isValid: inputValid && state.iconID,
      };
    }

    case "ICON": {
      return {
        ...state,
        iconIndex: action.value.index,
        iconType: action.value.type,
        iconID: action.value.id,
        isValid: state.inputValid && action.value,
      };
    }

    case "TOUCH": {
      return { ...state, isTouch: true };
    }

    default: {
      return state;
    }
  }
}

function resizeImage(file, maxWidth, maxHeight) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          resolve(new File([blob], file.name, { type: file.type }));
        }, file.type);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
}


/*
Reference 1

Note that we need to do two things when form is submitted
1) close the adding modal and add the category to the SettingCategory
       (for the sake of immediate showing at that state)
       (this is accomplished by props.addMainCategoryModalToggler)
    
2) truly add the category inside the category provider
       (this is accomplished by addMainCategory)

Again, it seems we're doing duplicate work
But it's not
First function is to make the UI immediately adding the new adding category
Second function is truly add the category where we storing all the category
*/

/*
Reference 2
Note that have four diff indexes
1. isDuplicate
=> check if the input category name is duplicate
=> for the purpose of showing different warnning text

2. isTouch
=> check if the user ever touch the text input
=> for invalid UI

3. inputValid
=> check if input is valid
=> length > 0 && non-duplicate
=> for invalid UI

4. isValid
=> check if it's all valid
=> include valid text input and user has choose the icon

Note
const warnningIndex = form.isDuplicate || (form.isTouch && !form.inputValid);
=> warnningIndex is only for invalid UI
=> include red outline and warnning text
=> has nothing to do with validation of button
=> if form.isDuplicate is true, we certainly know one thing
   -> the user is typing, and typing duplicate category name
   -> immediately show the invalid UI
=> if it's false, continue checking....
=> if form.isTouch is false
   -> it means user never touch the text input
   -> there's no reason showing invalid UI before user touch the text input
   -> so if it's false, we immediately decide to stop the condition and not show the invalid UI
=> if form.isTouch is true
   -> user has touch the text input, now we can check if input is valid
   -> according to the condition of inputValid, we return true or false
*/

/*
Referecne 3
Here, the order DOES matter
note that there are only two reason for the input text invalid
1. duplicate
2. length === 0

And because we don't have the independent index for length = 0, but
we do have the independent index for duplicate
so if it's duplicate, we show duplicate warnning text
if it's not duplicate, and still show the invalid UI
then we know it must be the situation of length is 0

note that here cannont put inputValid
because inputValid is mixed length and duplicate
here we need the index to seperate both different factors for invalid 
*/

/* 
Reference 4
categoryNameArr is for the purpose of checking
if the new category name user is about to add is duplicate
In other words,
we not allow user to have duplicate name
BUT
it's okay to have same name in different type
For example,
we can have "others" in both "expense" and "income"
*/