import React from 'react';
import { useCart } from '../context/CartContext';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image-container">
        <img 
          src={item.image} 
          alt={item.name}
          className="cart-item-image"
        />
      </div>
      
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-description">{item.description}</p>
        <div className="cart-item-price">${item.price.toFixed(2)} each</div>
        
        <div className="cart-item-actions">
          <div className="quantity-controls">
            <button 
              className="quantity-btn"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              −
            </button>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 0)}
              className="quantity-input"
              min="1"
              max="99"
            />
            <button 
              className="quantity-btn"
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              +
            </button>
          </div>
          
          <button 
            className="btn btn-danger btn-sm"
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
      </div>
      
      <div className="cart-item-total">
        <div className="item-total-price">
          ${(item.price * item.quantity).toFixed(2)}
        </div>
        <div className="item-quantity">
          {item.quantity} × ${item.price.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
