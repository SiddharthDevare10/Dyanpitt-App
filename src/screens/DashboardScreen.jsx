import React, { useEffect, useState } from 'react';
import apiService from '../services/api';

export default function DashboardScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Try to get user data from localStorage first (for demo)
        const userData = localStorage.getItem('userData');
        if (userData) {
          setUser(JSON.parse(userData));
        } else {
          // In production, fetch from API
          const response = await apiService.getCurrentUser();
          setUser(response.user);
        }
      } catch {
        // If there's an error, redirect to login
        window.location.href = '/';
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await apiService.logout();
      localStorage.removeItem('userData');
      window.location.href = '/';
    } catch {
      // Force logout even if API call fails
      localStorage.removeItem('userData');
      localStorage.removeItem('authToken');
      window.location.href = '/';
    }
  };

  if (loading) {
    return (
      <div className="main-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dyanpitt</h1>
        <div className="dashboard-user-section">
          <span className="dashboard-welcome">Welcome, {user?.fullName || 'User'}!</span>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-welcome-section">
          <h2 className="dashboard-subtitle">Welcome to your Dashboard!</h2>
          <p className="dashboard-description">
            You have successfully logged in to your Dyanpitt account.
          </p>

          {user && (
            <div className="dashboard-user-card">
              <h3 className="user-card-title">Your Account Details</h3>
              <div className="user-details">
                <div className="user-detail-item">
                  <span className="detail-label">Full Name:</span>
                  <span className="detail-value">{user.fullName}</span>
                </div>
                <div className="user-detail-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{user.email}</span>
                </div>
                {user.dyanpittId && (
                  <div className="user-detail-item">
                    <span className="detail-label">Dyanpitt ID:</span>
                    <span className="detail-value dyanpitt-id">{user.dyanpittId}</span>
                  </div>
                )}
                {user.phoneNumber && (
                  <div className="user-detail-item">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{user.phoneNumber}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="dashboard-placeholder">
            <p>This is a placeholder dashboard page.</p>
            <p>More features will be added here in the future.</p>
          </div>
        </div>
      </div>
    </div>
  );
}