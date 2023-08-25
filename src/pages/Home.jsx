import React from "react";

import DashBoard from "../components/homepage/DashBoard";
import TransactionTable from "../components/homepage/TransactionTable";

const Home = () => {
  return (
    <>
      <DashBoard />
      <TransactionTable title="History" />
    </>
  );
};

export default Home;

export const homeLoader = async () => {
  const token = localStorage.getItem("appleToken");

  try {
    const response = await fetch(
      `https://tranledong-applestore-backend.onrender.com/admin`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Could not fetch data");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
