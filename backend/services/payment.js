// services/payment.js
exports.processPayment = async ({ amount, bookingId }) => {
  // Simulate payment gateway
  // Replace this with Razorpay / Stripe SDK later

  const isSuccess = Math.random() > 0.2; // 80% success

  if (!isSuccess) {
    return {
      success: false,
      message: 'Payment failed. Please try again later.'
    };
  }

  return {
    success: true,
    paymentId: 'PAY_' + Date.now()
  };
};
