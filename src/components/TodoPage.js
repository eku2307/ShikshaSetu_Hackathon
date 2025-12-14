// src/components/TodoPage.js
import React, { useState } from 'react';
import { Plus, CheckCircle, Trash2, List, Target } from 'lucide-react';

const TodoPage = ({ todoItems, setTodoItems }) => {
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed'

  const addTodo = () => {
    if (newTodo.trim()) {
      const newItem = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date().toLocaleDateString()
      };
      setTodoItems([...todoItems, newItem]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodoItems(todoItems.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteTodo = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      setTodoItems(todoItems.filter(item => item.id !== id));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  // Filter todos based on selected filter
  const filteredTodos = todoItems.filter(item => {
    if (filter === 'pending') return !item.completed;
    if (filter === 'completed') return item.completed;
    return true; // 'all'
  });

  const completedCount = todoItems.filter(item => item.completed).length;
  const totalCount = todoItems.length;
  const pendingCount = totalCount - completedCount;

  return (
    <div className="content-spacing">
      <div className="card">
        <h2 className="card-header">📝 My To-Do List</h2>
        <p className="card-description">
          Organize your learning tasks and track your progress. Stay motivated and never miss an assignment!
        </p>

        {/* Statistics */}
        <div className="grid-3" style={{ marginBottom: '24px' }}>
          <div className="feature-card blue">
            <h3 className="feature-card-title">Total Tasks</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e40af' }}>
              {totalCount}
            </p>
          </div>
          <div className="feature-card orange">
            <h3 className="feature-card-title">Pending</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#c2410c' }}>
              {pendingCount}
            </p>
          </div>
          <div className="feature-card green">
            <h3 className="feature-card-title">Completed</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#166534' }}>
              {completedCount}
            </p>
          </div>
        </div>

        {/* Add New Todo */}
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          marginBottom: '24px',
          flexWrap: 'wrap'
        }}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task (e.g., Complete Math Quiz Chapter 2)..."
            style={{
              flex: 1,
              minWidth: '250px',
              padding: '12px 16px',
              border: '2px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#9333ea'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          />
          <button
            onClick={addTodo}
            disabled={!newTodo.trim()}
            style={{
              backgroundColor: newTodo.trim() ? '#9333ea' : '#d1d5db',
              color: 'white',
              border: 'none',
              padding: '12px 16px',
              borderRadius: '8px',
              cursor: newTodo.trim() ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              if (newTodo.trim()) e.target.style.backgroundColor = '#7c3aed';
            }}
            onMouseLeave={(e) => {
              if (newTodo.trim()) e.target.style.backgroundColor = '#9333ea';
            }}
          >
            <Plus size={20} />
            Add Task
          </button>
        </div>

        {/* Filter Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          marginBottom: '24px',
          flexWrap: 'wrap'
        }}>
          {[
            { key: 'all', label: 'All Tasks', count: totalCount },
            { key: 'pending', label: 'Pending', count: pendingCount },
            { key: 'completed', label: 'Completed', count: completedCount }
          ].map(filterOption => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              style={{
                padding: '8px 16px',
                border: '2px solid',
                borderColor: filter === filterOption.key ? '#9333ea' : '#e5e7eb',
                backgroundColor: filter === filterOption.key ? '#f3e8ff' : 'white',
                color: filter === filterOption.key ? '#9333ea' : '#6b7280',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: filter === filterOption.key ? '600' : '400',
                fontSize: '14px',
                transition: 'all 0.2s'
              }}
            >
              {filterOption.label} ({filterOption.count})
            </button>
          ))}
        </div>

        {/* Todo List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredTodos.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#6b7280'
            }}>
              {filter === 'all' && <List size={48} color="#d1d5db" style={{ margin: '0 auto 16px' }} />}
              {filter === 'pending' && <Target size={48} color="#d1d5db" style={{ margin: '0 auto 16px' }} />}
              {filter === 'completed' && <CheckCircle size={48} color="#d1d5db" style={{ margin: '0 auto 16px' }} />}
              <p>
                {filter === 'all' && 'No tasks yet. Add your first task above!'}
                {filter === 'pending' && 'No pending tasks. Great job!'}
                {filter === 'completed' && 'No completed tasks yet. Start checking off your tasks!'}
              </p>
            </div>
          ) : (
            filteredTodos.map(item => (
              <div 
                key={item.id} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '16px',
                  border: '2px solid',
                  borderColor: item.completed ? '#d1fae5' : '#e5e7eb',
                  backgroundColor: item.completed ? '#f0fdf4' : 'white',
                  borderRadius: '12px',
                  transition: 'all 0.2s'
                }}
              >
                <button
                  onClick={() => toggleTodo(item.id)}
                  style={{
                    marginRight: '16px',
                    padding: '4px',
                    background: 'none',
                    border: 'none',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  <CheckCircle 
                    size={24} 
                    color={item.completed ? '#22c55e' : '#d1d5db'}
                    fill={item.completed ? '#22c55e' : 'none'}
                  />
                </button>
                
                <div style={{ flex: 1 }}>
                  <span style={{
                    color: item.completed ? '#16a34a' : '#1f2937',
                    textDecoration: item.completed ? 'line-through' : 'none',
                    fontSize: '16px',
                    fontWeight: item.completed ? '400' : '500'
                  }}>
                    {item.text}
                  </span>
                  {item.createdAt && (
                    <p style={{
                      fontSize: '12px',
                      color: '#9ca3af',
                      marginTop: '4px'
                    }}>
                      Added on {item.createdAt}
                    </p>
                  )}
                </div>
                
                <button
                  onClick={() => deleteTodo(item.id)}
                  style={{
                    padding: '8px',
                    background: 'none',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#fee2e2';
                    e.target.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  <Trash2 size={18} color="#ef4444" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoPage;