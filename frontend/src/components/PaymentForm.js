import React, { useState } from 'react';
import './PaymentForm.css';

const PaymentForm = ({ onPaymentSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    city: '',
    zipCode: '',
    country: 'US'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }

    if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Please enter expiry date in MM/YY format';
    }

    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'Please enter cardholder name';
    }

    if (!formData.billingAddress.trim()) {
      newErrors.billingAddress = 'Please enter billing address';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Please enter city';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Please enter ZIP code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onPaymentSubmit(formData);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({
      ...prev,
      cardNumber: formatted
    }));
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setFormData(prev => ({
      ...prev,
      expiryDate: value
    }));
  };

  return (
    <div className="payment-form-container">
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-section">
          <h3>Payment Information</h3>
          
          <div className="form-group">
            <label htmlFor="cardNumber" className="form-label">
              Card Number *
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleCardNumberChange}
              className={`form-input ${errors.cardNumber ? 'error' : ''}`}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
            />
            {errors.cardNumber && (
              <div className="form-error">{errors.cardNumber}</div>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiryDate" className="form-label">
                Expiry Date *
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleExpiryChange}
                className={`form-input ${errors.expiryDate ? 'error' : ''}`}
                placeholder="MM/YY"
                maxLength="5"
              />
              {errors.expiryDate && (
                <div className="form-error">{errors.expiryDate}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="cvv" className="form-label">
                CVV *
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                className={`form-input ${errors.cvv ? 'error' : ''}`}
                placeholder="123"
                maxLength="4"
              />
              {errors.cvv && (
                <div className="form-error">{errors.cvv}</div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="cardholderName" className="form-label">
              Cardholder Name *
            </label>
            <input
              type="text"
              id="cardholderName"
              name="cardholderName"
              value={formData.cardholderName}
              onChange={handleChange}
              className={`form-input ${errors.cardholderName ? 'error' : ''}`}
              placeholder="John Doe"
            />
            {errors.cardholderName && (
              <div className="form-error">{errors.cardholderName}</div>
            )}
          </div>
        </div>

        <div className="form-section">
          <h3>Billing Address</h3>
          
          <div className="form-group">
            <label htmlFor="billingAddress" className="form-label">
              Address *
            </label>
            <input
              type="text"
              id="billingAddress"
              name="billingAddress"
              value={formData.billingAddress}
              onChange={handleChange}
              className={`form-input ${errors.billingAddress ? 'error' : ''}`}
              placeholder="123 Main Street"
            />
            {errors.billingAddress && (
              <div className="form-error">{errors.billingAddress}</div>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city" className="form-label">
                City *
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`form-input ${errors.city ? 'error' : ''}`}
                placeholder="New York"
              />
              {errors.city && (
                <div className="form-error">{errors.city}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="zipCode" className="form-label">
                ZIP Code *
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className={`form-input ${errors.zipCode ? 'error' : ''}`}
                placeholder="10001"
              />
              {errors.zipCode && (
                <div className="form-error">{errors.zipCode}</div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="form-input"
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={loading}
          >
            {loading ? 'Processing Payment...' : 'Complete Payment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
