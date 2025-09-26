const express = require('express');
const { body } = require('express-validator');
const {
  createPaymentIntent,
  confirmPayment,
  getPaymentStatus,
  createRefund,
  handleWebhook
} = require('../controllers/paymentController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   POST /api/payment/webhook
// @desc    Stripe webhook handler
// @access  Public
router.post('/webhook', handleWebhook);

// @route   POST /api/payment/create-payment-intent
// @desc    Create payment intent
// @access  Private
router.post('/create-payment-intent', protect, [
  body('orderId')
    .isMongoId()
    .withMessage('Valid order ID is required')
], createPaymentIntent);

// @route   POST /api/payment/confirm
// @desc    Confirm payment
// @access  Private
router.post('/confirm', protect, [
  body('paymentIntentId')
    .notEmpty()
    .withMessage('Payment intent ID is required')
], confirmPayment);

// @route   GET /api/payment/status/:orderId
// @desc    Get payment status
// @access  Private
router.get('/status/:orderId', protect, getPaymentStatus);

// @route   POST /api/payment/refund
// @desc    Create refund
// @access  Private/Admin
router.post('/refund', protect, authorize('admin'), [
  body('orderId')
    .isMongoId()
    .withMessage('Valid order ID is required'),
  body('amount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Amount must be a positive number'),
  body('reason')
    .optional()
    .isIn(['duplicate', 'fraudulent', 'requested_by_customer'])
    .withMessage('Invalid refund reason')
], createRefund);

module.exports = router;
