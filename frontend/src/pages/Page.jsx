import SideBar from "../components/article-page/sideBar.jsx";
import WebBrowser from "../components/article-page/webBrowser.jsx";
import Header from "../components/header.jsx";
import { useState } from "react";


function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [url, setUrl] = useState('');
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="article-container">
      <Header toggleSidebar={toggleSidebar} />
      {/* <SideBar /> */}
      <main className="article-main">
        <SideBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} url={url}/>
        <WebBrowser isSidebarOpen={isSidebarOpen} url={url} setUrl={setUrl}/>
      </main>
    </div>
  );
}

export default Page;
