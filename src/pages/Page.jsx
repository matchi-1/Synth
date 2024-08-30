import SideBar from "../components/article-page/sideBar.jsx";
import WebBrowser from "../components/article-page/webBrowser.jsx";
import Header from "../components/header.jsx";
import "./css/article.css";
import { useState } from "react";

function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    console.log("REEEEE");
  };

  return (
    <div className="article-container">
      <Header toggleSidebar={toggleSidebar} />
      {/* <SideBar /> */}
      <main className="article-main">
        <WebBrowser />
        <SideBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className={`article ${isSidebarOpen ? "open" : ""}`}></div>
      </main>
    </div>
  );
}

export default Page;
