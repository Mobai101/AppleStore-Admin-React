import React, { useRef, useState } from "react";
import classes from "./RegisterForm.module.css";
import { useNavigate } from "react-router-dom";

const RegisterForm = (props) => {
  const navigate = useNavigate();
  const roleInput = useRef();
  const fullnameInput = useRef();
  const emailInput = useRef();
  const phoneInput = useRef();
  const passwordInput = useRef();
  const confirmInput = useRef();
  const [errorState, setErrorState] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrorState(false);

    //#region validating user input from frontend
    if (!fullnameInput.current.value) {
      setErrorState("Please input your full name");
      return;
    }
    if (!emailInput.current.value) {
      setErrorState("Please input Email");
      return;
    }
    if (!phoneInput.current.value) {
      setErrorState("Please input phone number");
      return;
    }
    if (!passwordInput.current.value) {
      setErrorState("Please input password");
      return;
    }
    if (!confirmInput.current.value) {
      setErrorState("Please input confirmation");
      return;
    }
    if (passwordInput.current.value !== confirmInput.current.value) {
      setErrorState("Password and confirmation does not match");
      return;
    }
    //#endregion

    try {
      const response = await fetch(
        `https://tranledong-applestore-backend.onrender.com/users/admin/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: fullnameInput.current.value,
            email: emailInput.current.value,
            password: passwordInput.current.value,
            phoneNumber: phoneInput.current.value,
            role: roleInput.current.value,
          }),
        }
      );
      const result = await response.json();

      console.log(response);
      console.log(result);

      if (response.status === 201) {
        navigate("/login");
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setErrorState(error.message);
    }
  };

  return (
    <section className={classes.registerSection}>
      <h1>Register</h1>
      {errorState ? <h5 className={classes.error}>{errorState}</h5> : ""}
      <form className={classes.form} onSubmit={submitHandler}>
        <input
          type="text"
          name="fullname"
          id="fullname"
          placeholder="Please input your full name *"
          ref={fullnameInput}
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Please input Email *"
          ref={emailInput}
        />
        <input
          type="tel"
          name="phone"
          id="phone"
          placeholder="Please input phone number *"
          ref={phoneInput}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Please input Password *"
          ref={passwordInput}
        />
        <input
          type="password"
          name="confirm"
          id="confirm"
          placeholder="Please confirm Password *"
          ref={confirmInput}
        />
        <select name="role" id="role" ref={roleInput}>
          <option value="cs">Customer Support</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <button className={classes.btn}>Register</button>
      </form>
    </section>
  );
};

export default RegisterForm;
