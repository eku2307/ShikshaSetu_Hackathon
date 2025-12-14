// src/App.js
import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HomePage from './components/HomePage';
import LessonsPage from './components/LessonsPage';
import QuizzesPage from './components/QuizzesPage';
import TodoPage from './components/TodoPage';
import TeacherDashboard from './components/TeacherDashboard';
import TranslatorPage from './components/TranslatorPage';

// Sample data for the application
const initialLessons = [
  {
    id: 1,
    title: 'Basic Computer Skills',
    category: 'Digital Literacy',
    videoUrl: '#',
    description: 'Learn fundamental computer operations',
    duration: '15 min',
    completed: false
  },
  {
    id: 2,
    title: 'Internet Safety',
    category: 'Digital Literacy',
    videoUrl: '#',
    description: 'Stay safe while browsing online',
    duration: '12 min',
    completed: true
  },
  {
    id: 3,
    title: 'Math - Addition',
    category: 'Mathematics',
    videoUrl: '#',
    description: 'Basic addition concepts',
    duration: '20 min',
    completed: false
  },
  {
    id: 4,
    title: 'English - Grammar',
    category: 'English',
    videoUrl: '#',
    description: 'Basic grammar rules',
    duration: '18 min',
    completed: false
  },
  {
    id: 5,
    title: 'Using Email',
    category: 'Digital Literacy',
    videoUrl: '#',
    description: 'How to send and receive emails',
    duration: '25 min',
    completed: true
  }
];

const initialQuizzes = [
  {
    id: 1,
    title: 'Computer Basics Quiz',
    category: 'Digital Literacy',
    questions: 10,
    completed: false,
    score: null
  },
  {
    id: 2,
    title: 'Internet Safety Quiz',
    category: 'Digital Literacy',
    questions: 8,
    completed: true,
    score: 85
  },
  {
    id: 3,
    title: 'Math Quiz - Addition',
    category: 'Mathematics',
    questions: 15,
    completed: false,
    score: null
  },
  {
    id: 4,
    title: 'English Grammar Quiz',
    category: 'English',
    questions: 12,
    completed: true,
    score: 78
  }
];

const initialTodos = [
  { id: 1, text: 'Complete Math Quiz Chapter 1', completed: false },
  { id: 2, text: 'Watch Science Video - Plants', completed: true },
  { id: 3, text: 'Practice English Words', completed: false },
  { id: 4, text: 'Review Internet Safety Lesson', completed: false }
];

const studentProgress = [
  { name: 'Ravi Kumar', completed: 12, total: 15, percentage: 80 },
  { name: 'Priya Singh', completed: 10, total: 15, percentage: 67 },
  { name: 'Amit Sharma', completed: 14, total: 15, percentage: 93 },
  { name: 'Sunita Devi', completed: 8, total: 15, percentage: 53 },
  { name: 'Rohit Gupta', completed: 11, total: 15, percentage: 73 },
  { name: 'Kavita Sharma', completed: 13, total: 15, percentage: 87 }
];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [userType, setUserType] = useState('student');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lessons] = useState(initialLessons);
  const [quizzes] = useState(initialQuizzes);
  const [todoItems, setTodoItems] = useState(initialTodos);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    // Reset to home when switching user types
    setActiveTab('home');
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return <HomePage lessons={lessons} quizzes={quizzes} userType={userType} />;
      case 'lessons':
        return <LessonsPage lessons={lessons} />;
      case 'quizzes':
        return <QuizzesPage quizzes={quizzes} />;
      case 'todo':
        return userType === 'student' ? 
          <TodoPage 
            todoItems={todoItems} 
            setTodoItems={setTodoItems} 
          /> : <HomePage lessons={lessons} quizzes={quizzes} userType={userType} />;
      case 'dashboard':
        return userType === 'teacher' ? 
          <TeacherDashboard studentProgress={studentProgress} /> : 
          <HomePage lessons={lessons} quizzes={quizzes} userType={userType} />;
      case 'translator':
        return <TranslatorPage />;
      default:
        return <HomePage lessons={lessons} quizzes={quizzes} userType={userType} />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        activeTab={activeTab}
        userType={userType}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onTabChange={handleTabChange}
        onUserTypeChange={handleUserTypeChange}
      />
      
      <div className="main-content">
        <Header
          userType={userType}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="content-area">
          {renderContent()}
        </main>
      </div>

      {sidebarOpen && (
        <div 
          className="overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;