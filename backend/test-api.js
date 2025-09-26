const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123',
  phone: '+1234567890'
};

let authToken = '';

// Helper function to make API calls
const apiCall = async (method, endpoint, data = null, token = null) => {
  try {
    const config = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || error.message 
    };
  }
};

// Test functions
const testHealthCheck = async () => {
  console.log('🏥 Testing health check...');
  const result = await apiCall('GET', '/health');
  if (result.success) {
    console.log('✅ Health check passed');
  } else {
    console.log('❌ Health check failed:', result.error);
  }
};

const testUserRegistration = async () => {
  console.log('👤 Testing user registration...');
  const result = await apiCall('POST', '/auth/register', testUser);
  if (result.success) {
    authToken = result.data.token;
    console.log('✅ User registration successful');
    console.log('🔑 Auth token received');
  } else {
    console.log('❌ User registration failed:', result.error);
  }
};

const testUserLogin = async () => {
  console.log('🔐 Testing user login...');
  const result = await apiCall('POST', '/auth/login', {
    email: testUser.email,
    password: testUser.password
  });
  if (result.success) {
    authToken = result.data.token;
    console.log('✅ User login successful');
  } else {
    console.log('❌ User login failed:', result.error);
  }
};

const testGetProfile = async () => {
  console.log('👤 Testing get profile...');
  const result = await apiCall('GET', '/auth/profile', null, authToken);
  if (result.success) {
    console.log('✅ Get profile successful');
  } else {
    console.log('❌ Get profile failed:', result.error);
  }
};

const testGetProducts = async () => {
  console.log('🛍️ Testing get products...');
  const result = await apiCall('GET', '/products');
  if (result.success) {
    console.log(`✅ Get products successful - Found ${result.data.count} products`);
  } else {
    console.log('❌ Get products failed:', result.error);
  }
};

const testGetCategories = async () => {
  console.log('📂 Testing get categories...');
  const result = await apiCall('GET', '/categories');
  if (result.success) {
    console.log(`✅ Get categories successful - Found ${result.data.count} categories`);
  } else {
    console.log('❌ Get categories failed:', result.error);
  }
};

const testSearchProducts = async () => {
  console.log('🔍 Testing product search...');
  const result = await apiCall('GET', '/products/search?q=apple');
  if (result.success) {
    console.log(`✅ Product search successful - Found ${result.data.count} results`);
  } else {
    console.log('❌ Product search failed:', result.error);
  }
};

const testCreateOrder = async () => {
  console.log('📦 Testing create order...');
  
  // First get a product to order
  const productsResult = await apiCall('GET', '/products');
  if (!productsResult.success || productsResult.data.products.length === 0) {
    console.log('❌ No products available for order test');
    return;
  }

  const product = productsResult.data.products[0];
  const orderData = {
    items: [
      {
        product: product._id,
        quantity: 1
      }
    ],
    shippingAddress: {
      firstName: 'Test',
      lastName: 'User',
      email: testUser.email,
      phone: testUser.phone,
      address: '123 Test Street',
      city: 'Test City',
      state: 'TS',
      zipCode: '12345',
      country: 'US'
    }
  };

  const result = await apiCall('POST', '/orders', orderData, authToken);
  if (result.success) {
    console.log('✅ Create order successful');
    console.log(`📋 Order ID: ${result.data.order.orderNumber}`);
  } else {
    console.log('❌ Create order failed:', result.error);
  }
};

// Main test function
const runTests = async () => {
  console.log('🚀 Starting FreshCart API Tests...\n');

  await testHealthCheck();
  console.log('');

  await testUserRegistration();
  console.log('');

  await testUserLogin();
  console.log('');

  await testGetProfile();
  console.log('');

  await testGetProducts();
  console.log('');

  await testGetCategories();
  console.log('');

  await testSearchProducts();
  console.log('');

  await testCreateOrder();
  console.log('');

  console.log('🎉 API tests completed!');
};

// Run tests
runTests().catch(console.error);
