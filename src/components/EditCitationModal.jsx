import React from 'react';
import './modal.css';

const EditCitationModal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <form className="edit-citation-form">
          <div className="form-group">
            <label>Title</label>
            <input type="text" />
          </div>
          
          <div className="form-group">
            <label>Contributors</label>
            <div className="contributors">
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Middle Name" />
              <input type="text" placeholder="Last Name" />
              <input type="text" placeholder="Suffix" />
            </div>
            <button type="button" className="add-contributor">
              + Add another contributor
            </button>
          </div>
          
          <div className="form-group">
            <label>Publication Info</label>
            <div className="publication-info">
              <input type="text" placeholder="Website title" />
              <input type="date" />
              <input type="date" />
            </div>
          </div>

          <div className="form-group">
            <label>URL</label>
            <input type="text" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCitationModal;