import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await orderAPI.getOrders();
        if (response.success) {
          setOrders(response.orders);
        }
      } catch (error) {
        console.error('Error loading orders:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'shipped':
        return 'info';
      case 'processing':
        return 'warning';
      case 'cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return '✅';
      case 'shipped':
        return '🚚';
      case 'processing':
        return '⏳';
      case 'cancelled':
        return '❌';
      default:
        return '📦';
    }
  };

  if (!user) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="not-logged-in">
            <h2>Please log in to view your profile</h2>
            <p>You need to be logged in to access your account information.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <h1>My Account</h1>
          <p>Manage your account settings and view order history</p>
        </div>

        <div className="profile-content">
          <div className="profile-sidebar">
            <div className="profile-card">
              <div className="profile-avatar">
                <img src={user.avatar} alt={user.name} />
              </div>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>

            <nav className="profile-nav">
              <button
                className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <span className="nav-icon">👤</span>
                Profile Info
              </button>
              <button
                className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <span className="nav-icon">📦</span>
                Order History
              </button>
              <button
                className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                <span className="nav-icon">⚙️</span>
                Settings
              </button>
            </nav>
          </div>

          <div className="profile-main">
            {activeTab === 'profile' && (
              <div className="profile-section">
                <h2>Profile Information</h2>
                <div className="profile-info">
                  <div className="info-item">
                    <label>Full Name</label>
                    <p>{user.name}</p>
                  </div>
                  <div className="info-item">
                    <label>Email Address</label>
                    <p>{user.email}</p>
                  </div>
                  <div className="info-item">
                    <label>Member Since</label>
                    <p>January 2024</p>
                  </div>
                  <div className="info-item">
                    <label>Total Orders</label>
                    <p>{orders.length}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="profile-section">
                <h2>Order History</h2>
                {loading ? (
                  <div className="loading">
                    <div className="spinner"></div>
                  </div>
                ) : orders.length > 0 ? (
                  <div className="orders-list">
                    {orders.map(order => (
                      <div key={order.id} className="order-card">
                        <div className="order-header">
                          <div className="order-info">
                            <h3>Order #{order.id}</h3>
                            <p className="order-date">{order.date}</p>
                          </div>
                          <div className="order-status">
                            <span className={`status-badge ${getStatusColor(order.status)}`}>
                              {getStatusIcon(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        <div className="order-details">
                          <div className="order-item">
                            <span>Items:</span>
                            <span>{order.items}</span>
                          </div>
                          <div className="order-item">
                            <span>Total:</span>
                            <span className="order-total">${order.total.toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="order-actions">
                          <button className="btn btn-outline btn-sm">
                            View Details
                          </button>
                          {order.status === 'delivered' && (
                            <button className="btn btn-primary btn-sm">
                              Reorder
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-orders">
                    <div className="no-orders-content">
                      <div className="no-orders-icon">📦</div>
                      <h3>No orders yet</h3>
                      <p>You haven't placed any orders yet. Start shopping to see your order history here.</p>
                      <button className="btn btn-primary">
                        Start Shopping
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="profile-section">
                <h2>Account Settings</h2>
                <div className="settings-content">
                  <div className="setting-group">
                    <h3>Account Actions</h3>
                    <div className="setting-actions">
                      <button className="btn btn-outline">
                        Edit Profile
                      </button>
                      <button className="btn btn-outline">
                        Change Password
                      </button>
                      <button className="btn btn-outline">
                        Notification Settings
                      </button>
                    </div>
                  </div>

                  <div className="setting-group">
                    <h3>Danger Zone</h3>
                    <div className="setting-actions">
                      <button 
                        className="btn btn-danger"
                        onClick={logout}
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
