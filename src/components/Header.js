// src/components/Header.js
import React from 'react';
import { Menu, User } from 'lucide-react';

const Header = ({ userType, setSidebarOpen }) => {
  return (
    <header className="header">
      <div className="header-content">
        <button
          onClick={() => setSidebarOpen(true)}
          className="menu-button"
        >
          <Menu size={24} />
        </button>
        
        <div className="header-info">
          <div className="status-indicator">
            <div className="status-dot"></div>
            <span className="status-text">Online</span>
          </div>
          <div className="user-info">
            <User size={20} color="#6b7280" />
            <span className="user-text">{userType}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;