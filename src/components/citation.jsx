import React, { useState } from 'react';
import './citation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faSearch, faEdit } from '@fortawesome/free-solid-svg-icons';

import  EditCitationModal from './EditCitationModal';

const CitationForm = () => {
  const [link, setLink] = useState('');
  const [citation, setCitation] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [style, setStyle] = useState('apa');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/synth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ link })
      });

      if (response.ok) {
        const data = await response.json();
        setCitation(data.citation);
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'An error occurred while generating the citation.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while generating the citation.');
    }
  };

  return (
    <div className="citation-container">
      <form onSubmit={handleSubmit} className="citation-form">
        <div className="input-container">
          <FontAwesomeIcon icon={faLink} className="input-icon" />
          <input
            type="text"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
            placeholder="Enter link here"
          />
        </div>
        <button type="submit" className="submit-btn">
          <FontAwesomeIcon icon={faSearch} className="btn-icon" />
          
        </button>
      </form>
      <div className="citation-result">
        <textarea
          rows="4"
          cols="50"
          readOnly
          value={citation}
          placeholder="Generated citation will appear here..."
        />
        {citation && (
          <button className="edit-btn" onClick={() => setShowModal(true)}>
           update citation
          </button>
        )}
      </div>
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}



    <EditCitationModal show={showModal} onClose={() => setShowModal(false)} />  


    </div>
  );
};

export default CitationForm;
