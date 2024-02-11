import React from "react";
import "../styles/Message.css";

const Message = ({ text, isUser }) => {
  return (
    <div className={`message ${isUser ? "user" : "bot"}`}>
      <p>{text}</p>
    </div>
  );
};

export default Message;
