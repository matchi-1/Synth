import React, { useState, useRef, useEffect } from "react";
import { IoIosCloseCircle, IoMdSend } from "react-icons/io";
import "../css/sideBar.css";

const SideBar = ({ isSidebarOpen, toggleSidebar }) => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";

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
            <tr>
              <td class="highly-relevant">Highly Relevant Text</td>
              <td class="moderately-relevant">Moderately Relevant Text</td>
            </tr>
            <tr>
              <td class="tangentially-relevant">Tangentially Relevant Text</td>
              <td class="irrelevant">Irrelevant Text</td>
            </tr>
          </table>
        </div>
      </div>

      <div className="prompt-container">
        <div className="prompt">
          <h3>What do you want to know about this site?</h3>
          <form className="prompt-box">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleChange}
              rows="1"
              placeholder="Type here..."
            />
            <button type="submit">
              <IoMdSend />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
