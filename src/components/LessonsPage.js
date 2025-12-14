// src/components/LessonsPage.js
import React, { useState } from 'react';
import { Play, CheckCircle, Clock, BookOpen } from 'lucide-react';

const LessonsPage = ({ lessons }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Get unique categories
  const categories = ['All', ...new Set(lessons.map(lesson => lesson.category))];
  
  // Filter lessons based on selected category
  const filteredLessons = selectedCategory === 'All' 
    ? lessons 
    : lessons.filter(lesson => lesson.category === selectedCategory);

  const handleWatchLesson = (lesson) => {
    // In a real app, this would open a video player
    alert(`Opening lesson: ${lesson.title}\n\nIn a real app, this would start the video player.`);
  };

  return (
    <div className="content-spacing">
      <div className="card">
        <h2 className="card-header">📹 Video Lessons</h2>
        <p className="card-description">
          Interactive video lessons designed for rural students. Learn at your own pace with offline-capable content.
        </p>
        
        {/* Category Filter */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', color: '#374151' }}>
            Filter by Category:
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '2px solid #d1d5db',
              borderRadius: '8px',
              backgroundColor: 'white',
              minWidth: '200px'
            }}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        {/* Lessons Grid */}
        <div className="grid-3">
          {filteredLessons.map(lesson => (
            <div 
              key={lesson.id}
              style={{
                backgroundColor: 'white',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.borderColor = '#3b82f6'}
              onMouseLeave={(e) => e.target.style.borderColor = '#e5e7eb'}
            >
              {/* Video Thumbnail Area */}
              <div style={{
                backgroundColor: '#2563eb',
                color: 'white',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <Play size={32} />
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  backgroundColor: '#1d4ed8',
                  padding: '4px 8px',
                  borderRadius: '4px'
                }}>
                  <Clock size={16} />
                  {lesson.duration}
                </div>
              </div>
              
              {/* Lesson Content */}
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <h3 style={{ fontWeight: 'bold', color: '#1f2937', flex: 1 }}>
                    {lesson.title}
                  </h3>
                  {lesson.completed && (
                    <CheckCircle size={20} color="#22c55e" />
                  )}
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px'
                }}>
                  <BookOpen size={16} color="#6b7280" />
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>
                    {lesson.category}
                  </span>
                </div>
                
                <p style={{ color: '#4b5563', marginBottom: '16px', fontSize: '14px' }}>
                  {lesson.description}
                </p>
                
                <button 
                  onClick={() => handleWatchLesson(lesson)}
                  style={{
                    width: '100%',
                    backgroundColor: lesson.completed ? '#16a34a' : '#2563eb',
                    color: 'white',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = lesson.completed ? '#15803d' : '#1d4ed8';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = lesson.completed ? '#16a34a' : '#2563eb';
                  }}
                >
                  {lesson.completed ? '✓ Watch Again' : 'Start Lesson'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredLessons.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#6b7280'
          }}>
            <BookOpen size={48} color="#d1d5db" style={{ margin: '0 auto 16px' }} />
            <p>No lessons found for the selected category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonsPage;