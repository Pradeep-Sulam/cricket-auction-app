import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>🏏 Cricket Auction</h1>
        </Link>
        <nav className="nav">
          <Link to="/admin" className="nav-link">Admin</Link>
          <Link to="/teams" className="nav-link">Teams</Link>
          <Link to="/auction" className="nav-link">Auction</Link>
          <Link to="/download" className="nav-link">Downloads</Link>
          <Link to="/support" className="nav-link">Support</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;

