  import React, { useRef, useState } from "react";
  import { IoMdSearch } from "react-icons/io";
  import axios from "axios";
  import "../css/webBrowser.css";

  const WebBrowser = () => {
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
    }
    return (
      <div>
        <div className="frame">
          <div className="url-container">
            <div className="prompt">
              <form className="prompt-box">
              <textarea
                ref={textRef}
                onChange={handleChange}
              />
              <div className="prompt-button-container">
                <button type="submit" onClick={handleSearch}>
                  <IoMdSearch />
                </button>
              </div>
              </form>
            </div>
          </div>
        {
          list.map((string) => {
            return <div className="scrollable" dangerouslySetInnerHTML={{__html:string}}></div>
          })
        }
        </div> 
      </div>
    );
  };

  export default WebBrowser;
