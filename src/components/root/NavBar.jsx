import React from "react";
import classes from "./NavBar.module.css";
import { Link, useLoaderData } from "react-router-dom";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { RiCustomerService2Fill } from "react-icons/ri";
import { AiFillFileAdd, AiFillApple } from "react-icons/ai";

import { MdBedroomParent } from "react-icons/md";

const NavBar = (props) => {
  const loaderData = useLoaderData();

  const AdminNavs = () => {
    return (
      <>
        <h5>MAIN</h5>
        <Link to="/">
          <BsFillGrid1X2Fill className={classes.icon} /> Dashboard
        </Link>
        <h5>CUSTOMER SUPPORT</h5>
        <Link to="/customer">
          <RiCustomerService2Fill className={classes.icon} /> Customer Support
        </Link>
        <h5>LISTS</h5>
        <Link to="/products">
          <AiFillApple className={classes.icon} /> Products
        </Link>
        <h5>CREATE NEW</h5>
        <Link to="/products/new">
          <AiFillFileAdd className={classes.icon} /> New Product
        </Link>
        <h5>ADMIN ({loaderData.adminEmail})</h5>
        <Link to="/logout">
          <MdBedroomParent className={classes.icon} />
          Log Out
        </Link>
      </>
    );
  };

  const CsNavs = () => {
    return (
      <>
        <h5>SUPPORT</h5>
        <Link to="/customer">
          <RiCustomerService2Fill className={classes.icon} /> Customer Support
        </Link>
        <h5>CUSTOMER SUPPORT ({loaderData.adminEmail})</h5>
        <Link to="/logout">
          <MdBedroomParent className={classes.icon} />
          Log Out
        </Link>
      </>
    );
  };

  const NotLoggedInNavs = () => {
    return (
      <>
        <h5>USER</h5>
        <Link to="/login">
          <MdBedroomParent className={classes.icon} />
          Log In
        </Link>
        <br />
        <Link to="/register">
          <MdBedroomParent className={classes.icon} />
          Register
        </Link>
      </>
    );
  };

  return (
    <div className={classes.navbar}>
      {loaderData.role === "admin" ? (
        <AdminNavs />
      ) : loaderData.role === "cs" ? (
        <CsNavs />
      ) : (
        <NotLoggedInNavs />
      )}
    </div>
  );
};

export default NavBar;
