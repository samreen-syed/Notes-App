import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateNote() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://https://notes-app-tgww.onrender.com/api/notes', 
        { title, description },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
      );
      navigate('/my-notes');
    } catch (error) {
      setError('Failed to create note');
    }
  };

  return (
    <div className="create-note-container">
      <div className="create-note-card">
        <h2>Create New Note</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title"
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter note description"
              required
              rows="6"
            />
          </div>
          <div className="form-buttons">
            <button type="button" onClick={() => navigate('/my-notes')} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Create Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNote;
