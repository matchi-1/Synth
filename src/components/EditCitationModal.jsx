import React, { useState, useEffect } from 'react';
import './modal.css';

const EditCitationModal = ({ show, onClose, citation, setCitation, onSave }) => {
  const [websiteTitle, setWebsiteTitle] = useState('');
  const [datePublished, setDatePublished] = useState('');
  const [dateAccessed, setDateAccessed] = useState('');
  const [url, setUrl] = useState('');
  const [authors, setAuthors] = useState([]);

  // Basic regex for date or year validation
  const dateRegex = /^(?:\d{4}(-\d{2}(-\d{2})?)?)?$/;

  // Handle date input changes with validation
  const handleDateChange = (setter) => (e) => {
    const input = e.target.value;
    if (dateRegex.test(input)) {
      setter(input);
    } else {
      // Optional: handle invalid input case
    }
  };

  // Initialize state when citation prop changes
  useEffect(() => {
    if (citation) {
      setWebsiteTitle(citation.websiteTitle || '');
      setDatePublished(citation.datePublished || '');
      setDateAccessed(citation.dateAccessed || '');
      setAuthors(citation.authors || []);
      setUrl(citation.url || []);
    }
  }, [citation]);

  // Update authors list
  const handleAuthorChange = (index, key) => (e) => {
    const updatedAuthors = [...authors];
    updatedAuthors[index][key] = e.target.value;
    setAuthors(updatedAuthors);
  };

  // Add a new contributor
  const addContributor = () => {
    setAuthors([...authors, { firstName: '', middleName: '', lastName: '', suffix: '' }]);
  };

  // Save changes
  const handleSave = () => {
    setCitation({
      websiteTitle,
      datePublished,
      dateAccessed,
      authors,
      url
    });
    onClose();
  };

  if (!show || !citation) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <form className="edit-citation-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={websiteTitle}
              onChange={(e) => setWebsiteTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Contributors</label>
            <div className="contributors">
              {authors.map((author, index) => (
                <div key={index} className="author-inputs">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={author.firstName}
                    onChange={handleAuthorChange(index, 'firstName')}
                  />
                  <input
                    type="text"
                    placeholder="Middle Name"
                    value={author.middleName}
                    onChange={handleAuthorChange(index, 'middleName')}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={author.lastName}
                    onChange={handleAuthorChange(index, 'lastName')}
                  />
                  <input
                    type="text"
                    placeholder="Suffix"
                    value={author.suffix}
                    onChange={handleAuthorChange(index, 'suffix')}
                  />
                </div>
              ))}
            </div>
            <button type="button" className="add-contributor" onClick={addContributor}>
              + Add another contributor
            </button>
          </div>

          <div className="form-group">
            <label>Publication Info</label>
            <div className="publication-info">
              <input
                type="text"
                placeholder="Website title"
                value={websiteTitle}
                onChange={(e) => setWebsiteTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Publication Date"
                value={datePublished}
                onChange={handleDateChange(setDatePublished)}
              />
              <input
                type="text"
                placeholder="Accessed Date"
                value={dateAccessed}
                onChange={handleDateChange(setDateAccessed)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>URL</label>
            <input
              type="text"
              value={citation.url || ''}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <button type="button" onClick={handleSave}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCitationModal;
