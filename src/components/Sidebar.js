// src/components/Sidebar.js
import React from 'react';
import { 
  Home, 
  Video, 
  FileText, 
  List, 
  BarChart3, 
  Languages, 
  X
} from 'lucide-react';

const Sidebar = ({ 
  activeTab, 
  userType, 
  sidebarOpen, 
  setSidebarOpen, 
  onTabChange, 
  onUserTypeChange 
}) => {
  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home, color: 'home' },
    { id: 'lessons', label: 'Video Lessons', icon: Video, color: 'lessons' },
    { id: 'quizzes', label: 'Quizzes', icon: FileText, color: 'quizzes' },
  ];

  // Add conditional items based on user type
  if (userType === 'student') {
    navigationItems.push({ id: 'todo', label: 'My To-Do List', icon: List, color: 'todo' });
  }

  if (userType === 'teacher') {
    navigationItems.push({ id: 'dashboard', label: 'Student Progress', icon: BarChart3, color: 'dashboard' });
  }

  navigationItems.push({ id: 'translator', label: 'Translator', icon: Languages, color: 'translator' });

  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h1 className="sidebar-title">Nabha Learning</h1>
        <button 
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden"
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
        >
          <X size={24} />
        </button>
      </div>
      
      <div className="sidebar-content">
        <div className="user-type-selector">
          <label>User Type:</label>
          <select 
            value={userType} 
            onChange={(e) => onUserTypeChange(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>

        <nav className="nav-menu">
          {navigationItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`nav-button ${activeTab === item.id ? `active ${item.color}` : ''}`}
              >
                <Icon className="nav-icon" size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;