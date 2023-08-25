import React from "react";
import Chat from "../components/Chat/Chat";

const Customer = (props) => {
  return (
    <>
      <Chat />
    </>
  );
};

export default Customer;

export const customerLoader = () => {
  const appleRole = localStorage.getItem("appleRole");

  if (!appleRole) {
    window.location.href = "/login";
  }

  return null;
};
