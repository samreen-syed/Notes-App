import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditNote() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchNote();
  }, [id]);

  const fetchNote = async () => {
    try {
      const response = await axios.get(`http://https://notes-app-tgww.onrender.com/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTitle(response.data.title);
      setDescription(response.data.description);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch note');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/notes/${id}`, 
        { title, description },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
      );
      navigate('/my-notes');
    } catch (error) {
      setError('Failed to update note');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="create-note-container">
      <div className="create-note-card">
        <h2>Edit Note</h2>
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
              Update Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditNote;
