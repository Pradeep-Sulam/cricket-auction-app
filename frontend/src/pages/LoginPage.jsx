import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // For now, skip authentication and go directly to admin
    // In production, this would connect to an auth endpoint
    navigate('/admin');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>🏏 Cricket Auction Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <input 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input 
            placeholder="Password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;