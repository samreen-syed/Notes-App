import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function MyNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/notes', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNotes(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch notes');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await axios.delete(`http://localhost:5000/api/notes/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setNotes(notes.filter(note => note._id !== id));
      } catch (error) {
        setError('Failed to delete note');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-note/${id}`);
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="my-notes-container">
      <div className="notes-header">
        <h2>My Notes</h2>
        <Link to="/create-note" className="add-note-btn">
          <i className="fas fa-plus"></i> Add New Note
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      {notes.length === 0 ? (
        <div className="empty-notes">
          <i className="fas fa-sticky-note"></i>
          <p>No notes yet. Create your first note!</p>
          <Link to="/create-note" className="create-first-note-btn">
            Create Note
          </Link>
        </div>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note._id} className="note-card">
              <div className="note-content">
                <h3>{note.title}</h3>
                <p>{note.description}</p>
              </div>
              <div className="note-footer">
                <span className="note-date">
                  {new Date(note.createdAt).toLocaleDateString()}
                </span>
                <div className="note-actions">
                  <button 
                    onClick={() => handleEdit(note._id)}
                    className="edit-btn"
                    title="Edit note"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button 
                    onClick={() => handleDelete(note._id)}
                    className="delete-btn"
                    title="Delete note"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyNotes;