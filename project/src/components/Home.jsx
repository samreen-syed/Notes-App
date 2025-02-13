import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to NoteMaster</h1>
        <p>Your personal space for organizing thoughts and tasks</p>
        <div className="hero-buttons">
          <Link to="/login" className="btn btn-primary">Get Started</Link>
          <Link to="/register" className="btn btn-secondary">Sign Up</Link>
        </div>
      </div>
      <div className="features-section">
        <h2>Why Choose NoteMaster?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-lock"></i>
            <h3>Secure</h3>
            <p>Your notes are protected with secure authentication</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-mobile-alt"></i>
            <h3>Responsive</h3>
            <p>Access your notes from any device</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-tasks"></i>
            <h3>Organized</h3>
            <p>Keep your tasks and notes well-organized</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;