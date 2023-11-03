import { useRef } from "react";
import styles from "./AddImg.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeMainImg } from "../../reducers/constructorReducer";
import camera from "@/assets/icons/camera.svg"

const AddImg = () => {
  const file = useSelector((state) => state.recipeConstructor.image);
  const dispatch = useDispatch();
  const fileInput = useRef(null);
  const wrapper = useRef(null);

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files && event.target.files[0];
    console.log(file);
    if (file) {
      dispatch(changeMainImg(file));
    }
  };

  const handleDrag = (event, isDragging) => {
    if (wrapper.current) {
      wrapper.current.style.backgroundColor = isDragging ? "#383838" : "";
    }
    event.preventDefault();
  };

  const handleDragOver = (event) => {
    handleDrag(event, true);
  };

  const handleDragLeave = (event) => {
    handleDrag(event, false);
  };

  const handleDrop = (event) => {
    handleFileChange(event);
    handleDrag(event, false);
    event.preventDefault();
  };

  const clearImg = () => {
    if (fileInput.current) {
      fileInput.current.value = "";
    }
    dispatch(changeMainImg(null));
    return null;
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={styles.imgWrapper}
      ref={wrapper}
    >
      <input
        ref={fileInput}
        className={styles.fileInput}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {!file ? (
        <>
          <img
            className={styles.dragImage}
            src={camera}
            alt="addImg"
          />
          <p className={styles.dragText}>Drag photo here</p>
        </>
      ) : (
        <>
          {file.type.startsWith("image/") ? (
            <a target="_blank" href={URL.createObjectURL(file)}>
              <img
                className={styles.mainImg}
                src={URL.createObjectURL(file)}
                alt="Image"
              />
            </a>
          ) : (
            clearImg()
          )}
        </>
      )}
      <button
        type="button"
        className={styles.addImageButton}
        onClick={() => fileInput.current?.click()}
      >
        {!file ? "Add Image" : "Change Image"}
      </button>
    </div>
  );
};

export default AddImg;
