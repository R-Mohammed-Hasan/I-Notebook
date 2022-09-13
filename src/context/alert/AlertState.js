import React from "react";
import AlertContext from "./AlertContext";

export default function AlertState(props) {

  const {setAlert} = props;

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <AlertContext.Provider
    value={showAlert}>
      {props.children}
  </AlertContext.Provider>
  )
}
