import React, { useRef } from 'react';
import styles from './InputFile.module.css';

function InputFile(props) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const onChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      props.onChange(file);
    }
  };

  const buttonClass = props.color === 'blue' ? styles["button--blue"] : styles["button--pink"];
  return (
    <div className={`${styles.container} ${props.className || ''}`}>
      <input
        type="file"
        ref={fileInputRef}
        name={props.name}
        id={props.id}
        onChange={onChangeHandler}
        accept={props.accept}
        className={styles.input}
      />
      <button type="button" onClick={handleClick} className={`${styles.button} ${buttonClass}`}>
        <span className={styles.text}>{props.label || 'Upload'}</span>
      </button>
    </div>
  );
}

export default InputFile;