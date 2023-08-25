import React from "react";
import classes from "./TransactionTable.module.css";
import { Link, useLoaderData } from "react-router-dom";

const TransactionTable = (props) => {
  const allOrders = useLoaderData().allOrders;

  return (
    <div className={classes.transactionSection}>
      <h4>{props.title}</h4>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Total</th>
            <th>Delivery</th>
            <th>Status</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {allOrders.map((order) => {
            return (
              <tr key={order._id}>
                <td>{order.user}</td>
                <td>{order.fullName}</td>
                <td>{order.phoneNumber}</td>
                <td>{order.address}</td>
                <td>{order.total.toLocaleString()} VND</td>
                <td>{order.delivery}</td>
                <td>{order.status}</td>
                <td>
                  <Link to={`history/detail/${order._id}`}>View</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
