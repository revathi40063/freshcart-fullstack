import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { paymentAPI } from '../services/api';
import PaymentForm from '../components/PaymentForm';
import './Payment.css';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [orderData, setOrderData] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  useEffect(() => {
    if (location.state?.orderData) {
      setOrderData(location.state.orderData);
    } else {
      // Redirect to checkout if no order data
      navigate('/checkout');
    }
  }, [location.state, navigate]);

  const handlePaymentSubmit = async (paymentData) => {
    setPaymentLoading(true);
    setPaymentError(null);

    try {
      const paymentPayload = {
        ...paymentData,
        orderData: orderData,
        amount: orderData.total
      };

      const response = await paymentAPI.processPayment(paymentPayload);
      
      if (response.success) {
        setPaymentSuccess(true);
        // Clear cart after successful payment
        clearCart();
        
        // Redirect to success page after 3 seconds
        setTimeout(() => {
          navigate('/profile', { 
            state: { 
              orderId: response.transactionId,
              success: true 
            }
          });
        }, 3000);
      } else {
        setPaymentError('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError('Payment processing failed. Please try again.');
    } finally {
      setPaymentLoading(false);
    }
  };

  if (!orderData) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="payment-success">
        <div className="container">
          <div className="success-content">
            <div className="success-icon">✅</div>
            <h1>Payment Successful!</h1>
            <p>Your order has been processed and will be delivered soon.</p>
            <div className="success-details">
              <p><strong>Order Total:</strong> ${orderData.total.toFixed(2)}</p>
              <p><strong>Payment Method:</strong> Credit Card</p>
              <p>You will receive a confirmation email shortly.</p>
            </div>
            <div className="success-actions">
              <button 
                onClick={() => navigate('/profile')}
                className="btn btn-primary"
              >
                View Order History
              </button>
              <button 
                onClick={() => navigate('/products')}
                className="btn btn-outline"
              >
                Continue Shopping
              </button>
            </div>
            <p className="redirect-notice">
              Redirecting to your profile in 3 seconds...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="container">
        <div className="payment-header">
          <h1>Payment</h1>
          <p>Complete your order with secure payment</p>
        </div>

        <div className="payment-content">
          <div className="payment-form-section">
            <div className="payment-info">
              <h3>Payment Information</h3>
              <p>Your payment information is secure and encrypted.</p>
            </div>

            {paymentError && (
              <div className="alert alert-error">
                {paymentError}
              </div>
            )}

            <PaymentForm 
              onPaymentSubmit={handlePaymentSubmit}
              loading={paymentLoading}
            />
          </div>

          <div className="order-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>
              
              <div className="order-items">
                {orderData.items.map(item => (
                  <div key={item.id} className="order-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Qty: {item.quantity}</p>
                    </div>
                    <div className="item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>${orderData.subtotal.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Shipping:</span>
                  <span>{orderData.shipping === 0 ? 'FREE' : `$${orderData.shipping.toFixed(2)}`}</span>
                </div>
                <div className="total-row">
                  <span>Tax:</span>
                  <span>${orderData.tax.toFixed(2)}</span>
                </div>
                <div className="total-row final-total">
                  <span>Total:</span>
                  <span>${orderData.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="delivery-info">
                <h4>Delivery Information</h4>
                <p>
                  <strong>{orderData.firstName} {orderData.lastName}</strong><br />
                  {orderData.address}<br />
                  {orderData.city}, {orderData.state} {orderData.zipCode}<br />
                  {orderData.country}
                </p>
                {orderData.deliveryInstructions && (
                  <p>
                    <strong>Instructions:</strong> {orderData.deliveryInstructions}
                  </p>
                )}
              </div>
            </div>

            <div className="security-info">
              <div className="security-item">
                <span className="security-icon">🔒</span>
                <span>256-bit SSL encryption</span>
              </div>
              <div className="security-item">
                <span className="security-icon">🛡️</span>
                <span>PCI DSS compliant</span>
              </div>
              <div className="security-item">
                <span className="security-icon">✅</span>
                <span>Secure payment processing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
