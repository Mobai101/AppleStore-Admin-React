import React from "react";
import classes from "./Chat.module.css";

const Chat = (props) => {
  return (
    <section className={classes.chatSection}>
      <h4>Chat</h4>
      <div className={classes.chatContainer}>
        <aside className={classes.chatNav}></aside>
        <div className={classes.mainChat}></div>
      </div>
    </section>
  );
};

export default Chat;
