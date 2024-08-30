import React, { useState, useRef, useEffect } from "react";
import { IoMdSend, IoMdClose, IoMdExpand } from "react-icons/io";
import "../css/sideBar.css";

const SideBar = ({ isSidebarOpen, toggleSidebar }) => {
  const [isDropdown, setDropdown] = useState(false);
  const [isExpanded, setExpand] = useState(false);
  const [text, setText] = useState("");
  const [selectedOption, setSelectedOption] = useState("Highly Relevant");
  const [noteType, setNoteType] = useState("HR");
  const textareaRef = useRef(null);

  const toggleDropdown = () => {
    setDropdown(!isDropdown);
  };

  const toggleExpand = () => {
    setExpand(!isExpanded);
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
              <button type="submit">
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
        <div
          className={`notes ${
            isExpanded && isSidebarOpen ? "notes-expanded" : "notes-collapsed"
          }`}
        >
          <h3>NOTES</h3>
          <div className="note-list">
            <button className="expand-notes-btn" onClick={toggleExpand}>
              <IoMdExpand />
            </button>
            <div className={`note ${noteType}`}>
              <span>{/** Insert [number] */}[2]</span>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Consequatur, ipsam voluptatum. Commodi sequi fuga maxime at
                quasi. Nihil neque sequi odit. Excepturi libero praesentium
                rerum laborum odio ex magni totam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
