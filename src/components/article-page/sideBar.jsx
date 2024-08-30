import React, { useState, useRef, useEffect } from "react";
import { IoIosCloseCircle, IoMdSend, IoIosArrowDown } from "react-icons/io";
import "../css/sideBar.css";

const SideBar = ({ isSidebarOpen, toggleSidebar }) => {
  const [isDropdown, setDropdown] = useState(false);
  const [text, setText] = useState("");
  const [selectedOption, setSelectedOption] = useState("Highly Relevant");
  const textareaRef = useRef(null);

  const toggleDropdown = () => {
    setDropdown(!isDropdown);
    console.log(isDropdown);
  };

  const dropdownClick = (option) => {
    setSelectedOption(option);
    setDropdown(false);
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
      <button onClick={toggleSidebar}>
        <IoIosCloseCircle />
      </button>

      <div className="legend-container">
        <div className="legend">
          <h3>LEGEND</h3>
          <table>
            <tbody>
              <tr>
                <td className="moderately-relevant">
                  Moderately Relevant Text
                </td>
                <td className="highly-relevant">Highly Relevant Text</td>
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
            <div className="dropdown">
              <button className="dropdown-toggle" onClick={toggleDropdown}>
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
          </div>
        </div>
        <div className="notes"></div>
      </div>
    </div>
  );
};

export default SideBar;
