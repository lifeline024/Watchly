import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import './Lock.css';

const Lock = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic client-side validation
    if (!password.trim()) {
      setError('Please enter a password');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(
        '/api/admin/verify-password',
        { password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
      );

      if (response.data.success) {
        // Store authentication state
        localStorage.setItem('adminAuthenticated', 'true');
        navigate('/admin');
      } else {
        setError(response.data.error || 'Authentication failed');
      }
    } catch (err) {
      // Enhanced error handling
      if (err.response) {
        // Server responded with error status
        setError(err.response.data.error || 
               `Error: ${err.response.status} - ${err.response.statusText}`);
      } else if (err.request) {
        // Request was made but no response
        setError('Server is not responding. Please try again later.');
      } else {
        // Other errors
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Authentication error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="lock-container">
      <div className="lock-box">
        <h2>Admin Authentication</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              autoComplete="current-password"
              autoFocus
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="auth-button"
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Authenticating...
              </>
            ) : (
              'Unlock Admin Panel'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Lock;