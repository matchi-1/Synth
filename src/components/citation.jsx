import React, { useEffect, useState } from 'react';
import './citation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faSearch } from '@fortawesome/free-solid-svg-icons';

import  EditCitationModal from './EditCitationModal';

const CitationForm = () => {
  const [link, setLink] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [citation, setCitation] = useState(null);
  const [citationStyle, setCitationStyle] = useState('APA');

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
        setCitation(JSON.parse(data.citation));
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

  const formatCitation = (citation, style) => {
    if (!citation || !citation.authors || citation.authors.length === 0) return 'null citation';
    console.log(citation)
    const formatAuthors = (authors) => {
      if (authors.length === 1) {
        const author = authors[0];
        return `${author.lastName}${author.firstName ? ', ' + author.firstName[0] + '.' : ''}${author.middleName ? ' ' + author.middleName[0] + '.' : ''}`;
      } else if (authors.length === 2) {
        return authors.map(author => 
          `${author.lastName}${author.firstName ? ', ' + author.firstName[0] + '.' : ''}${author.middleName ? ' ' + author.middleName[0] + '.' : ''}`
        ).join(' and ');
      } else {
        return `${authors[0].lastName}${authors[0].firstName ? ', ' + authors[0].firstName[0] + '.' : ''}${authors[0].middleName ? ' ' + authors[0].middleName[0] + '.' : ''} et al.`;
      }
    };
  
    switch (style) {
      case 'APA':
        return `
          ${formatAuthors(citation.authors)} (${citation.datePublished}). ${citation.websiteTitle}. ${citation.url}
        `;
        
      case 'MLA':
        return `
          ${formatAuthors(citation.authors)}. ${citation.websiteTitle}, ${citation.datePublished}. ${citation.url}
        `;
        
      case 'Chicago':
        return `
          ${formatAuthors(citation.authors)}. ${citation.websiteTitle}. ${citation.datePublished}. ${citation.url}
        `;
        
      case 'Harvard':
        return `
          ${formatAuthors(citation.authors)}. (${citation.datePublished}). ${citation.websiteTitle}. Available at: ${citation.url} (Accessed: ${citation.dateAccessed}).
        `;
        
      case 'Vancouver':
        return `
          ${formatAuthors(citation.authors)}. ${citation.websiteTitle}; ${citation.datePublished}. Available from: ${citation.url} (Accessed: ${citation.dateAccessed}).
        `;
        
      default:
        return '';
    }
  };
  
  useEffect(() => {
    formatCitation(citation, citationStyle)
  }, [citation])

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
          value={formatCitation(citation, citationStyle)}
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


      <EditCitationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        citation={citation}
        setCitation={setCitation}
      />  

      <div className='radio-container-container'>
        <div className='radio-container'>
          <label htmlFor="APA">APA</label>
          <input
            type="radio"
            name='APA'
            value="APA"
            checked={citationStyle === 'APA'}
            onChange={() => setCitationStyle('APA')}
          />
        </div>
        <div className='radio-container'>
          <label htmlFor="MLA">MLA</label>
          <input
            type="radio"
            name='MLA'
            value="MLA"
            checked={citationStyle === 'MLA'}
            onChange={() => setCitationStyle('MLA')}
          />
        </div>
        <div className='radio-container'>
          <label htmlFor="Chicago">Chicago</label>
          <input
            type="radio"
            name='Chicago'
            value="Chicago"
            checked={citationStyle === 'Chicago'}
            onChange={() => setCitationStyle('Chicago')}
          />
        </div>
        <div className='radio-container'>
          <label htmlFor="Harvard">Harvard</label>
          <input
            type="radio"
            name='Harvard'
            value="Harvard"
            checked={citationStyle === 'Harvard'}
            onChange={() => setCitationStyle('Harvard')}
          />
        </div>
        <div className='radio-container'>
          <label htmlFor="Vancouver">Vancouver</label>
          <input
            type="radio"
            name='Vancouver'
            value="Vancouver"
            checked={citationStyle === 'Vancouver'}
            onChange={() => setCitationStyle('Vancouver')}
          />
        </div>
        

      </div>      

    </div>
  );
};

export default CitationForm;
