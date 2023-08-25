import React from "react";
import classes from "./Modal.module.css";
import { useDispatch } from "react-redux";
import { popupActions } from "../store/store";

const Modal = (props) => {
  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(popupActions.hidePopup());
  };

  return (
    <div className={classes.modal}>
      <div className={classes.overlay} onClick={closeHandler}></div>
      <div className={classes.modalContent}>{props.children}</div>
    </div>
  );
};

export default Modal;
