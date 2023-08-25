import React from "react";
import { Outlet } from "react-router-dom";

const Protect = (props) => {
  return <Outlet />;
};

export default Protect;

export const protectLoader = () => {
  const appleRole = localStorage.getItem("appleRole");

  if (!appleRole) {
    window.location.href = "/login";
  } else if (appleRole !== "admin") {
    window.location.href = "/customer";
  }

  return null;
};
