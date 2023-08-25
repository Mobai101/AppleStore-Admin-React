import React from "react";
import classes from "./DashBoard.module.css";
import { AiOutlineUser, AiOutlineFileAdd } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";
import { useLoaderData } from "react-router-dom";

const DashBoard = (props) => {
  const loaderData = useLoaderData();

  return (
    <section className={classes.dashboardSection}>
      <h4>Dashboard</h4>
      <div className={classes.dashboard}>
        <div className={classes.dashboard_card}>
          <h2>{loaderData.countUser}</h2>
          <h5>Clients</h5>
          <div className={`${classes.icon} ${classes.icon_user}`}>
            <AiOutlineUser />
          </div>
        </div>
        <div className={classes.dashboard_card}>
          <h2>
            {loaderData.earningOfMonth.toLocaleString()}
            <span className={classes.VND}> VND</span>
          </h2>
          <h5>Earnings of month</h5>
          <div className={`${classes.icon} ${classes.icon_cart}`}>
            <BsCurrencyDollar />
          </div>
        </div>
        <div className={classes.dashboard_card}>
          <h2>{loaderData.newOrdersOfMonth}</h2>
          <h5>New Orders of month</h5>
          <div className={`${classes.icon} ${classes.icon_dollar}`}>
            <AiOutlineFileAdd />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashBoard;
