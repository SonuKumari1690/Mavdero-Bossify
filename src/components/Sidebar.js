import React from "react";
import "../styles/Sidebar.css";
import logoImage from "../images/MiraLogo.webp"; // Replace with the actual path to your logo image
import miraTutorialPDF from "../doc/MiraUserGuide.pdf"; // Replace with the actual path to your PDF file

const Sidebar = ({ chatHistory, setCurrentChat, createNewChat }) => {
  const handleChatClick = (index) => {
    setCurrentChat(chatHistory[index]);
  };

  const handleMiraTutorialClick = () => {
    const link = document.createElement("a");
    link.href = miraTutorialPDF;
    link.download = "MiraTutorial.pdf";
    link.click();
  };

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src={logoImage} alt="Logo" className="logo" />
      </div>
      {/* Create new chat icon */}
      <div onClick={createNewChat} className="create-new-icon">
        <i className="fas fa-plus-square" style={{ color: "white" }}></i>
        <span className="mira-tutorial-link">New Chat</span>
      </div>
      {/* Display chat links in the sidebar */}
      <div className="chat-links">
        {chatHistory.map((chatEntry, index) => {
          const chatText =
            Array.isArray(chatEntry) && chatEntry[0]
              ? chatEntry[0].text
              : chatEntry?.text;
          const firstThirtyChars = chatText ? chatText.slice(0, 25) : "";

          return (
            <button
              key={index}
              onClick={() => handleChatClick(index)}
              className="history_button"
            >
              {firstThirtyChars}
            </button>
          );
        })}
      </div>
      {/* Mira Tutorial icon */}
      <div onClick={handleMiraTutorialClick} className="mira-tutorial-icon">
        📖 <span className="mira-tutorial-link">User Guide</span>
      </div>

      {/* Mira Tutorial icon */}
      <p className="mira-tutorial-link">
        Customer Service: <br />
        support@bossify.ai
      </p>

      <p className="mira-tutorial-link">Log In</p>
    </div>
  );
};

export default Sidebar;
