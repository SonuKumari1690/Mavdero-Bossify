import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Chatbox from "./Chatbox";
import "../styles/App.css";

const App = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);

  // Load chat history from MongoDB on component mount
  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/chat-history");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setChatHistory(data);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const addChatHistory = async () => {
    try {
      await fetch("http://localhost:5000/api/chat-history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentChat),
      });
      fetchChatHistory(); // Refresh chat history after adding a new chat
    } catch (error) {
      console.error("Error adding chat history:", error);
    }
  };

  const createNewChat = () => {
    if (
      currentChat &&
      (currentChat.length > 0 ||
        (currentChat.messages && currentChat.messages.length > 0))
    ) {
      addChatHistory();
      setCurrentChat([]);
    }
  };

  return (
    <div className="app-container">
      <div className="main-container">
        <Sidebar
          chatHistory={chatHistory}
          setCurrentChat={setCurrentChat}
          createNewChat={createNewChat}
        />
        <Chatbox
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}
          createNewChat={createNewChat}
        />
      </div>
    </div>
  );
};

export default App;
