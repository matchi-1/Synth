import SideBar from "../components/article-page/sideBar.jsx";
import WebBrowser from "../components/article-page/webBrowser.jsx";
import Header from "../components/header.jsx";
import { useState } from "react";

function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="article-container">
      <Header toggleSidebar={toggleSidebar} />
      {/* <SideBar /> */}
      <main className="article-main">
        <WebBrowser />
        <SideBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <WebBrowser isSidebarOpen={isSidebarOpen} />
      </main>
    </div>
  );
}

export default Page;
