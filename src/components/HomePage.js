// src/components/HomePage.js
import React from 'react';

const HomePage = ({ lessons, quizzes, userType }) => {
  // Calculate progress statistics
  const completedLessons = lessons.filter(lesson => lesson.completed).length;
  const totalLessons = lessons.length;
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

  const completedQuizzes = quizzes.filter(quiz => quiz.completed);
  const averageScore = completedQuizzes.length > 0 
    ? Math.round(completedQuizzes.reduce((sum, quiz) => sum + quiz.score, 0) / completedQuizzes.length)
    : 0;

  return (
    <div className="content-spacing">
      {/* Welcome Section */}
      <div className="card">
        <h2 className="card-header">
          Welcome to Nabha Digital Learning Platform! 🎓
        </h2>
        <p className="card-description">
          Empowering rural students with digital literacy and modern education tools.
        </p>
        
        <div className="grid-3">
          <div className="feature-card blue">
            <h3 className="feature-card-title">Digital Literacy</h3>
            <p className="feature-card-description">Learn essential computer skills</p>
          </div>
          <div className="feature-card green">
            <h3 className="feature-card-title">Interactive Videos</h3>
            <p className="feature-card-description">Engaging visual learning</p>
          </div>
          <div className="feature-card orange">
            <h3 className="feature-card-title">Practice Quizzes</h3>
            <p className="feature-card-description">Test your knowledge</p>
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Recent Lessons */}
        <div className="card">
          <h3 className="text-xl font-bold mb-4" style={{ color: '#1f2937' }}>📚 Recent Lessons</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {lessons.slice(0, 3).map(lesson => (
              <div 
                key={lesson.id} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}
              >
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>
                    {lesson.title}
                  </h4>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>
                    {lesson.category}
                  </p>
                </div>
                <span 
                  style={{
                    fontSize: '12px',
                    backgroundColor: '#dbeafe',
                    color: '#1d4ed8',
                    padding: '4px 8px',
                    borderRadius: '4px'
                  }}
                >
                  {lesson.duration}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Section */}
        <div className="card">
          <h3 className="text-xl font-bold mb-4" style={{ color: '#1f2937' }}>
            🏆 {userType === 'student' ? 'Your Progress' : 'Class Overview'}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6b7280' }}>Completed Lessons</span>
              <span style={{ fontWeight: 'bold', color: '#16a34a' }}>
                {completedLessons}/{totalLessons}
              </span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6b7280' }}>Quiz Average</span>
              <span style={{ fontWeight: 'bold', color: '#3b82f6' }}>
                {averageScore}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats for Teachers */}
      {userType === 'teacher' && (
        <div className="card">
          <h3 className="text-xl font-bold mb-4" style={{ color: '#1f2937' }}>📊 Quick Stats</h3>
          <div className="grid-4">
            <div className="feature-card blue">
              <h4 className="feature-card-title">Total Students</h4>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e40af' }}>24</p>
            </div>
            <div className="feature-card green">
              <h4 className="feature-card-title">Active This Week</h4>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#166534' }}>18</p>
            </div>
            <div className="feature-card orange">
              <h4 className="feature-card-title">Avg. Completion</h4>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#c2410c' }}>73%</p>
            </div>
            <div style={{ 
              padding: '16px', 
              borderRadius: '8px', 
              backgroundColor: '#faf5ff', 
              borderLeft: '4px solid #9333ea' 
            }}>
              <h4 style={{ fontWeight: 'bold', color: '#7c3aed', marginBottom: '4px' }}>Avg. Quiz Score</h4>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#7c3aed' }}>81%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;