import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>FreshCart</h3>
            <p>Your trusted online grocery store for fresh fruits, vegetables, and daily essentials. We deliver quality products right to your doorstep.</p>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Categories</h3>
            <ul>
              <li><Link to="/products?category=fruits">Fruits</Link></li>
              <li><Link to="/products?category=vegetables">Vegetables</Link></li>
              <li><Link to="/products?category=dairy">Dairy</Link></li>
              <li><Link to="/products?category=bakery">Bakery</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact Info</h3>
            <ul>
              <li>📧 support@freshcart.com</li>
              <li>📞 +1 (555) 123-4567</li>
              <li>📍 123 Grocery Street, Food City, FC 12345</li>
              <li>🕒 Mon-Sun: 8AM - 10PM</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 FreshCart. All rights reserved. Made with ❤️ for fresh groceries.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
