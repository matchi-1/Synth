
import React, { useState, createContext, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import axios from "axios";
import {getSite, chat } from "../../chatgpt/ai";
import "../css/webBrowser.css";

function stripHtmlTags(html) {
  // Create a new div element
  const div = document.createElement('div');
  
  // Set the HTML content of the div
  div.innerHTML = html;
  
  // Extract and return the text content of the div
  return div.textContent || div.innerText || '';
}

const WebBrowser = ({ isSidebarOpen, url, setUrl }) => {
  const [html, setHtml] = useState('');
  const [relevant, setRelevant] = useState({"Highly Relevant": [], "Tangentially Relevant": [], "Moderately Relevant": []});
  const [highlight, setHighlight] = useState('')
  const handleChange = (event) => {
    event.preventDefault();
    setUrl(event.target.value);
  }
 

  function formatAndHighlightText(text, highlightArray) {
    // Escape any HTML special characters in the text to prevent XSS attacks
    text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Wrap paragraphs
    let paragraphs = text.split('\n').map(paragraph => `<p>${paragraph}</p>`).join('');

    // Highlight the specified strings
    Object.entries(highlightArray).forEach(([key, highlight]) => {
        let highlightRegex = new RegExp(`(${highlight})`, 'gi'); // case-insensitive match
        let rep;
        if(key === 'Highly Relevant'){
          rep =  '<mark style="background:#c2e3b0">$1</mark>';
        } else if (key === "Moderately Relevant"){
          rep ='<mark style="background:#dfd996">$1</mark>'
        } else{
          rep = '<mark style="background:#ecdff8">$1</mark>'
        }
        paragraphs = paragraphs.replace(highlightRegex, rep);
    });

    return paragraphs;
}
  const handleSearch = async (event) => {
      event.preventDefault();
      const resp = await axios.get(`http://localhost:5000/?url=${url}`);
      if(resp.status !== 200)
          throw Error(resp.error)
      // const data = resp.data; // html
      
      const html = await getSite(`http://localhost:5000/?url=${url}`);
      // const responses = await chat(`http://localhost:5000/?url=${url}`, '');

      // responses.forEach(response => {
      //   const obj = JSON.parse(response);
      //   console.log(obj);
      //   Object.entries(obj).forEach(([key, value]) => {
      //     console.log(key, value);
      //     //setRelevant([relevant[key.trim()].push(...obj[key])])
      //   })
      //   //setRelevant([...relevant, obj
      // });
      // console.log(relevant);
      
      const highlights = formatAndHighlightText(html, {"Highly Relevant": ["Poverty has long been a pervasive and intractable challenge in the Philippines, and education remains one of the most critical casualties of this social malady."], 
        "Tangentially Relevant": ["For instance, the GPE provided a grant of $20.9 million to the Philippines in 2019 to support the implementation of its education sector plan.", "The study found that increasing access to education can lead to better employment opportunities and higher income levels, ultimately leading to poverty reduction.", "The ALS program aims to provide marginalized communities with access to education and skills training, helping them to rebuild their lives and communities."], 
        "Moderately Relevant": ["After the Spanish-American War in 1898, the Philippines was ceded to the United States."]})
      setHtml(highlights)    
  }

  return (
    <div className={`browser-container ${isSidebarOpen ? "open" : ""}`}>
      <div className="searchBar">
        <form className="prompt-box">
          <textarea
            onChange={handleChange}/>
          <div className="prompt-button-container">
            <button type="submit" onClick={handleSearch}>
              <IoMdSearch />
            </button>
          </div>
        </form>
         <div className="scrollable" dangerouslySetInnerHTML={{__html: html}}></div> 
       {/* <div className="scrollable">
          {html}
        </div>  */}
      </div>
    </div>
  );
}
   
  export default WebBrowser;
