import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import CreateNote from './components/CreateNote';
import MyNotes from './components/MyNotes';
import './App.css';

// ... existing imports ...
import EditNote from './components/EditNote';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/my-notes" />} />
            <Route path="/register" element={!isAuthenticated ? <Register setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/my-notes" />} />
            <Route path="/create-note" element={isAuthenticated ? <CreateNote /> : <Navigate to="/login" />} />
            <Route path="/edit-note/:id" element={isAuthenticated ? <EditNote /> : <Navigate to="/login" />} />
            <Route path="/my-notes" element={isAuthenticated ? <MyNotes /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;