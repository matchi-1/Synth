import React, { useState } from "react";
import "../css/webBrowser.css";
import CitationForm from "./../citation";

const WebBrowser = ({ isSidebarOpen }) => {
  return (
    <div className={`browser-container ${isSidebarOpen ? "open" : ""}`}>
      <div className="searchBar"></div>
      <div className="browser"></div>
      <div className="citation-container">
        <CitationForm />
      </div>
    </div>
  );
};

export default WebBrowser;
