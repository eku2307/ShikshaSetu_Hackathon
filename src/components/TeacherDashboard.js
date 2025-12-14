// src/components/TeacherDashboard.js
import React, { useState } from 'react';
import { User, BarChart3, TrendingUp, Users, Clock, Award } from 'lucide-react';

const TeacherDashboard = ({ studentProgress }) => {
  const [sortBy, setSortBy] = useState('name'); // 'name', 'progress', 'percentage'
  const [filterBy, setFilterBy] = useState('all'); // 'all', 'excellent', 'good', 'needs-improvement'

  // Sort students based on selected criteria
  const sortedStudents = [...studentProgress].sort((a, b) => {
    switch(sortBy) {
      case 'progress':
        return b.completed - a.completed;
      case 'percentage':
        return b.percentage - a.percentage;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  // Filter students based on performance
  const filteredStudents = sortedStudents.filter(student => {
    switch(filterBy) {
      case 'excellent':
        return student.percentage >= 80;
      case 'good':
        return student.percentage >= 60 && student.percentage < 80;
      case 'needs-improvement':
        return student.percentage < 60;
      case 'all':
      default:
        return true;
    }
  });

  // Calculate statistics
  const totalStudents = studentProgress.length;
  const activeStudents = Math.floor(totalStudents * 0.75); // Simulate active students
  const avgCompletion = Math.round(studentProgress.reduce((sum, s) => sum + s.percentage, 0) / totalStudents);
  const avgQuizScore = Math.round(avgCompletion * 1.1); // Simulate quiz scores slightly higher

  const getPerformanceCategory = (percentage) => {
    if (percentage >= 80) return { label: 'Excellent', color: '#22c55e', bgColor: '#f0fdf4' };
    if (percentage >= 60) return { label: 'Good', color: '#f59e0b', bgColor: '#fffbeb' };
    return { label: 'Needs Improvement', color: '#ef4444', bgColor: '#fef2f2' };
  };

  const handleStudentClick = (student) => {
    alert(`Student Details:\n\nName: ${student.name}\nCompleted: ${student.completed}/${student.total} lessons\nProgress: ${student.percentage}%\nPerformance: ${getPerformanceCategory(student.percentage).label}`);
  };

  return (
    <div className="content-spacing">
      <div className="card">
        <h2 className="card-header">📊 Student Progress Dashboard</h2>
        <p className="card-description">
          Monitor student performance, track completion rates, and identify students who need additional support.
        </p>
        
        {/* Statistics Cards */}
        <div className="grid-4" style={{ marginBottom: '32px' }}>
          <div className="feature-card blue">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Users size={20} color="#1e40af" />
              <h3 className="feature-card-title">Total Students</h3>
            </div>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e40af' }}>
              {totalStudents}
            </p>
          </div>
          <div className="feature-card green">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <TrendingUp size={20} color="#166534" />
              <h3 className="feature-card-title">Active This Week</h3>
            </div>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#166534' }}>
              {activeStudents}
            </p>
          </div>
          <div className="feature-card orange">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <BarChart3 size={20} color="#c2410c" />
              <h3 className="feature-card-title">Avg. Completion</h3>
            </div>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#c2410c' }}>
              {avgCompletion}%
            </p>
          </div>
          <div style={{ 
            padding: '16px', 
            borderRadius: '8px', 
            backgroundColor: '#faf5ff', 
            borderLeft: '4px solid #9333ea' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Award size={20} color="#7c3aed" />
              <h4 style={{ fontWeight: 'bold', color: '#7c3aed', margin: 0 }}>Avg. Quiz Score</h4>
            </div>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#7c3aed', margin: 0 }}>
              {avgQuizScore}%
            </p>
          </div>
        </div>

        {/* Controls */}
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          marginBottom: '24px', 
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '2px solid #d1d5db',
                borderRadius: '6px',
                backgroundColor: 'white',
                minWidth: '120px'
              }}
            >
              <option value="name">Name</option>
              <option value="progress">Progress</option>
              <option value="percentage">Percentage</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px', color: '#374151' }}>
              Filter by Performance:
            </label>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '2px solid #d1d5db',
                borderRadius: '6px',
                backgroundColor: 'white',
                minWidth: '150px'
              }}
            >
              <option value="all">All Students ({totalStudents})</option>
              <option value="excellent">Excellent (≥80%)</option>
              <option value="good">Good (60-79%)</option>
              <option value="needs-improvement">Needs Improvement (&lt;60%)</option>
            </select>
          </div>
        </div>

        {/* Student Progress Table */}
        <div style={{
          backgroundColor: 'white',
          border: '2px solid #e5e7eb',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <div style={{
            backgroundColor: '#f9fafb',
            padding: '16px 24px',
            borderBottom: '1px solid #e5e7eb'
          }}>
            <h3 style={{ fontWeight: 'bold', color: '#1f2937', margin: 0, fontSize: '18px' }}>
              Student Progress Overview ({filteredStudents.length} students)
            </h3>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#f3f4f6' }}>
                <tr>
                  <th style={{ 
                    padding: '12px 24px', 
                    textAlign: 'left', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#6b7280',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    Student Name
                  </th>
                  <th style={{ 
                    padding: '12px 24px', 
                    textAlign: 'center', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#6b7280',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    Completed
                  </th>
                  <th style={{ 
                    padding: '12px 24px', 
                    textAlign: 'center', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#6b7280',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    Progress Bar
                  </th>
                  <th style={{ 
                    padding: '12px 24px', 
                    textAlign: 'center', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    color: '#6b7280',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    Performance
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => {
                  const performance = getPerformanceCategory(student.percentage);
                  return (
                    <tr 
                      key={index} 
                      style={{ 
                        borderBottom: '1px solid #f3f4f6',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.parentNode.style.backgroundColor = '#f9fafb'}
                      onMouseLeave={(e) => e.target.parentNode.style.backgroundColor = 'white'}
                      onClick={() => handleStudentClick(student)}
                    >
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: '#e5e7eb',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '12px'
                          }}>
                            <User size={20} color="#6b7280" />
                          </div>
                          <div>
                            <span style={{ fontWeight: '500', color: '#1f2937' }}>
                              {student.name}
                            </span>
                            <p style={{ fontSize: '12px', color: '#6b7280', margin: '2px 0 0 0' }}>
                              Student ID: {1000 + index}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                        <span style={{ color: '#4b5563', fontSize: '16px', fontWeight: '500' }}>
                          {student.completed}/{student.total}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ width: '100%', maxWidth: '200px', margin: '0 auto' }}>
                          <div style={{
                            width: '100%',
                            height: '8px',
                            backgroundColor: '#e5e7eb',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            marginBottom: '4px'
                          }}>
                            <div 
                              style={{
                                height: '100%',
                                borderRadius: '4px',
                                backgroundColor: performance.color,
                                width: `${student.percentage}%`,
                                transition: 'width 0.3s ease'
                              }}
                            ></div>
                          </div>
                          <div style={{ textAlign: 'center', fontSize: '12px', color: '#6b7280' }}>
                            {student.percentage}%
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: performance.bgColor,
                          color: performance.color
                        }}>
                          {performance.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {filteredStudents.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#6b7280'
          }}>
            <Users size={48} color="#d1d5db" style={{ margin: '0 auto 16px' }} />
            <p>No students found matching the selected criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;