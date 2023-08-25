import React from "react";
import classes from "./ErrorText.module.css";

import errorImg from "../../assets/error.jpg";
import Container from "../../UI/Container";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorText = () => {
  const error = useRouteError();
  return (
    <Container>
      <section className={classes.errorSection}>
        <div>
          <img src={errorImg} alt="Error" />
        </div>
        <div>
          <h1>Status: {error.status}</h1>
          <h1>
            {isRouteErrorResponse(error)
              ? error.data.message || error.statusText
              : "Something went wrong"}
          </h1>
        </div>
      </section>
    </Container>
  );
};

export default ErrorText;
