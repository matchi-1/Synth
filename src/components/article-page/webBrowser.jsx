
import React, { useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import axios from "axios";
import "../css/webBrowser.css";
import CitationForm from "./../citation";

const WebBrowser = ({ isSidebarOpen }) => {
<<<<<<< HEAD
  const textRef = useRef();
  const [list, setList] = useState([]);
  
  const handleChange = (event) => {
    event.preventDefault();
    textRef.current = event.target.value;
    console.log(textRef.current);
  }
  const handleSearch = async (event) => {
      event.preventDefault();
      const resp = await axios.get(`http://localhost:5000/?url=${textRef.current}`);
      const data = resp.data;
      setList([data]);

  return (
    <div className={`browser-container ${isSidebarOpen ? "open" : ""}`}>
      <div className="searchBar">
        <form className="prompt-box">
          <textarea
            ref={textRef}
            onChange={handleChange}/>
          <div className="prompt-button-container">
            <button type="submit" onClick={handleSearch}>
              <IoMdSearch />
            </button>
          </div>
        </form>
      </div>
  
        {
        list.map((string) => {
          return <div className="browser" dangerouslySetInnerHTML={{__html:string}}></div>
        })
      }
      <div className="citation"></div>
=======
  return (
    <div className={`browser-container ${isSidebarOpen ? "open" : ""}`}>
      <div className="searchBar"></div>
      <div className="browser"></div>
      <div className="citation-container">
        <CitationForm />
      </div>
>>>>>>> 87ab833df88a4cfa0bc2f9a5fe6fc9c2bd0a9486
    </div>
  );
    }
  }
  export default WebBrowser;
