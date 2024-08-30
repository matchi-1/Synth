import React, { useState } from "react";
import "../css/webBrowser.css";

const WebBrowser = ({ isSidebarOpen }) => {
  console.log(isSidebarOpen);
  return (
    <div className={`browser-container ${isSidebarOpen ? "open" : ""}`}>
      <div className="searchBar"></div>
      <div className="browser"></div>
      <div className="citation"></div>
    </div>
  );
};

export default WebBrowser;
