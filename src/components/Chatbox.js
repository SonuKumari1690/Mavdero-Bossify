import React, { useState } from "react";
import "../styles/Chatbox.css";
import bossify from "../images/bossify.png";

const Chatbox = ({
  addChatHistory,
  currentChat,
  setCurrentChat,
  createNewChat,
}) => {
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    sendMessage();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (input.trim() !== "") {
      const userMessage = { text: input, isUser: true };
      const chatArray = Array.isArray(currentChat)
        ? currentChat
        : currentChat.messages || [];

      setCurrentChat([...chatArray, userMessage]);
      try {
        const response = await fetch("http://localhost:5000/api/bot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messages: [...chatArray, userMessage] }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const botResponse = { text: data.text.response, isUser: false };
        setCurrentChat([...chatArray, userMessage, botResponse]);
        addChatHistory([...chatArray, userMessage, botResponse]);
        setInput("");
      } catch (error) {
        console.error("Error making API call:", error);
      }
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox">
        {Array.isArray(currentChat) ? (
          currentChat.map((message, index) => (
            <div
              key={index}
              className={`message ${message.isUser ? "user" : "bot"}`}
            >
              {message.isUser ? `${message.text}` : `${message.text}`}
            </div>
          ))
        ) : (
          <div className="message">
            {currentChat.messages &&
              currentChat.messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${message.isUser ? "user" : "bot"}`}
                >
                  {message.isUser ? `${message.text}` : `${message.text}`}
                </div>
              ))}
          </div>
        )}
      </div>
      <div className="input-container">
        <div className="input-wrapper">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Mira..."
            rows="2"
          />
        </div>
        <div className="send-button" onClick={handleSendMessage}>
          ⬆
        </div>
      </div>
      <div className="bottom-logo-container">
        <span className="poweredBy">Powered by</span>
        <img src={bossify} alt="Logo" className="bottom-logo" />
      </div>
    </div>
  );
};

export default Chatbox;
