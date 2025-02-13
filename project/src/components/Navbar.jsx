import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">
          <i className="fas fa-book-open"></i>
          <span>NoteMaster</span>
        </Link>
      </div>

      <div className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </div>

      <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        {isAuthenticated ? (
          <>
            <Link 
              to="/create-note" 
              className={`nav-link ${location.pathname === '/create-note' ? 'active' : ''}`}
            >
              <i className="fas fa-plus"></i> New Note
            </Link>
            <Link 
              to="/my-notes" 
              className={`nav-link ${location.pathname === '/my-notes' ? 'active' : ''}`}
            >
              <i className="fas fa-sticky-note"></i> My Notes
            </Link>
            <button onClick={handleLogout} className="nav-link logout-btn">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link register-btn">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;