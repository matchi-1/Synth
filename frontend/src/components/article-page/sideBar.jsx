import React, { useState, useRef, useEffect } from "react";
import { IoMdSend, IoMdClose, IoMdExpand } from "react-icons/io";
import "../css/sideBar.css";
import '../../chatgpt/ai.js';
import { chat } from "../../chatgpt/ai.js";

const SideBar = ({ isSidebarOpen, toggleSidebar, url}) => {
  const [isDropdown, setDropdown] = useState(false);
  const [text, setText] = useState("");
  const [selectedOption, setSelectedOption] = useState("Highly Relevant");
  const [noteType, setNoteType] = useState("HR");
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const textareaRef = useRef(null);

  const toggleDropdown = () => {
    setDropdown(!isDropdown);
    console.log(isDropdown);
  };

  const dropdownClick = (option) => {
    setSelectedOption(option);
    setDropdown(false);

    if (option === "Highly Relevant") {
      setNoteType("HR");
    } else if (option === "Moderately Relevant") {
      setNoteType("MR");
    } else if (option === "Tangentially Relevant") {
      setNoteType("TR");
    }
  };
  const handlePrompt = async (event) => {
    event.preventDefault();
    setNotes([]);
    setIsLoading(true);
    setNotes([...notes, ...['The Philippines, a developing country in Southeast Asia with a population of over 100 million people', 'After the Spanish-American War in 1898, the Philippines was ceded to the United States.']])
    // const res = await chat(url, textareaRef.current);
    // res.forEach((note) => {
    //   const obj = JSON.parse(note);      
    //   const arr = obj[selectedOption];
    //   setNotes([...notes, ...arr])
    // })
    setIsLoading(false);
  }

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = "1rem";

    const maxHeight = parseFloat(getComputedStyle(textarea).lineHeight) * 3; // Calculate the maximum height for 3 rows
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  }, [text]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <div className="toggle-btn-container">
        <div>
          <img
            className="header-logo"
            src="/assets/img/logo.png"
            alt="logo.png"
          />
        </div>
        <button onClick={toggleSidebar}>
          <IoMdClose />
        </button>
      </div>

      <div className="legend-container">
        <div className="legend">
          <h3>LEGEND</h3>
          <table>
            <tbody>
              <tr>
                <td className="highly-relevant">Highly Relevant Text</td>
                <td className="moderately-relevant">
                  Moderately Relevant Text
                </td>
              </tr>
              <tr>
                <td className="tangentially-relevant">
                  Tangentially Relevant Text
                </td>
                <td className="irrelevant">Irrelevant Text</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="prompt-container">
        <div className="prompt">
          <h3>WHAT DO YOU WANT TO KNOW ABOUT THIS SITE?</h3>
          <form className="prompt-box">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleChange}
              rows="1"
              placeholder="Type here..."
            />
            <div className="prompt-button-container">
              <button type="submit" disabled={!url} onClick={handlePrompt}>
                <IoMdSend />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="notes-container">
        <div className="notes-filter">
          <div className="styled-dropdown">
            <span>Include the following in your notes:</span>
            <div className="note-utility">
              <div className="dropdown">
                <button
                  className={`dropdown-toggle ${noteType}`}
                  onClick={toggleDropdown}
                >
                  {selectedOption}
                </button>
                {isDropdown && (
                  <ul className="dropdown-menu">
                    <li
                      onClick={() => dropdownClick("Highly Relevant")}
                      className="highly-relevant"
                    >
                      Highly Relevant
                    </li>
                    <li
                      onClick={() => dropdownClick("Moderately Relevant")}
                      className="moderately-relevant"
                    >
                      Moderately Relevant
                    </li>
                    <li
                      onClick={() => dropdownClick("Tangentially Relevant")}
                      className="tangentially-relevant"
                    >
                      Tangentially Relevant
                    </li>
                  </ul>
                )}
              </div>
              <button className="add-note-btn">Add</button>
            </div>
          </div>
        </div>
        <div className="notes">
          <h3>NOTES</h3>
          <div className="note-list">
            <div className="expand-notes-btn">
              <IoMdExpand />
            </div>
              { !isLoading && notes ?
                notes.map((note, i) => {
                  return (
                  <div className={`note ${noteType}`}>
                      <span>{`[${i+1}]`}</span>        
                      <p>{note}</p>
                    </div>) 
                }) :
                null // insert loading gif        
              }
              </div>
          </div>
        </div>
      </div>
  );
};

export default SideBar;
