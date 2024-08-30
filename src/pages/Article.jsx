import SideBar from "../components/article-page/sideBar.jsx";
import WebBrowser from "../components/article-page/webBrowser.jsx";
import Header from "../components/header.jsx";

function Article() {
  return (
    <div>
      <Header />
      <WebBrowser />
      <SideBar />
    </div>
  );
}

export default Article;
