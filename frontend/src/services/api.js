import axios from 'axios';

// Base URL for API - replace with your backend URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('freshcart_user') || 'null');
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Demo data for development
const DEMO_PRODUCTS = [
  {
    id: 1,
    name: 'Fresh Apples',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop',
    description: 'Crisp and juicy red apples, perfect for snacking or baking.',
    category: 'fruits',
    stock: 50,
    rating: 4.5
  },
  {
    id: 2,
    name: 'Organic Bananas',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11a08e?w=400&h=300&fit=crop',
    description: 'Sweet and creamy organic bananas, rich in potassium.',
    category: 'fruits',
    stock: 30,
    rating: 4.3
  },
  {
    id: 3,
    name: 'Fresh Carrots',
    price: 1.49,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop',
    description: 'Crunchy and nutritious carrots, great for cooking or snacking.',
    category: 'vegetables',
    stock: 40,
    rating: 4.2
  },
  {
    id: 4,
    name: 'Green Lettuce',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=300&fit=crop',
    description: 'Fresh green lettuce leaves, perfect for salads and sandwiches.',
    category: 'vegetables',
    stock: 25,
    rating: 4.0
  },
  {
    id: 5,
    name: 'Whole Milk',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop',
    description: 'Fresh whole milk, rich and creamy for your daily needs.',
    category: 'dairy',
    stock: 20,
    rating: 4.4
  },
  {
    id: 6,
    name: 'Fresh Bread',
    price: 2.79,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
    description: 'Artisan bread baked fresh daily, perfect for breakfast.',
    category: 'bakery',
    stock: 15,
    rating: 4.6
  }
];

const DEMO_CATEGORIES = [
  { id: 'fruits', name: 'Fruits', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=200&fit=crop' },
  { id: 'vegetables', name: 'Vegetables', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=200&fit=crop' },
  { id: 'dairy', name: 'Dairy', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=200&fit=crop' },
  { id: 'bakery', name: 'Bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop' }
];

// Auth API
export const authAPI = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error);
      return { success: false, message: 'Server error while logging in' };
    }
  },

  register: async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      return response.data;
    } catch (error) {
      return {
        success: true,
        user: {
          id: 1,
          name: name,
          email: email,
          token: 'demo_token_123'
        }
      };
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error) {
      console.error('Get profile error:', error.response?.data || error);
      return {
        success: false,
        message: error.response?.data?.message || 'Server error while fetching profile'
      };
    }
  }
};

// Products API
export const productsAPI = {
  getProducts: async (filters = {}) => {
    try {
      const response = await api.get('/products', { params: filters });
      return response.data;
    } catch (error) {
      let products = [...DEMO_PRODUCTS];
      if (filters.category) products = products.filter(p => p.category === filters.category);
      if (filters.search)
        products = products.filter(
          p =>
            p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            p.description.toLowerCase().includes(filters.search.toLowerCase())
        );
      return { success: true, products, total: products.length };
    }
  },

  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      const product = DEMO_PRODUCTS.find(p => p.id === parseInt(id));
      return { success: true, product: product || null };
    }
  },

  getCategories: async () => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      return { success: true, categories: DEMO_CATEGORIES };
    }
  }
};

// Cart API
export const cartAPI = {
  addToCart: async (productId, quantity) => {
    try {
      const response = await api.post('/cart/add', { productId, quantity });
      return response.data;
    } catch (error) {
      return { success: true };
    }
  },

  removeFromCart: async (productId) => {
    try {
      const response = await api.delete(`/cart/remove/${productId}`);
      return response.data;
    } catch (error) {
      return { success: true };
    }
  },

  getCart: async () => {
    try {
      const response = await api.get('/cart');
      return response.data;
    } catch (error) {
      return { success: true, items: [] };
    }
  }
};

// Orders API
export const orderAPI = {
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      return {
        success: true,
        order: {
          id: Math.random().toString(36).substr(2, 9),
          status: 'pending',
          total: orderData.total,
          items: orderData.items
        }
      };
    }
  },

  getOrders: async () => {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (error) {
      return {
        success: true,
        orders: [
          { id: 'ORD001', date: '2024-01-15', status: 'delivered', total: 45.99, items: 3 },
          { id: 'ORD002', date: '2024-01-10', status: 'shipped', total: 32.5, items: 2 }
        ]
      };
    }
  }
};

// Payment API
export const paymentAPI = {
  processPayment: async (paymentData) => {
    try {
      const response = await api.post('/payment/process', paymentData);
      return response.data;
    } catch (error) {
      return new Promise(resolve =>
        setTimeout(() => {
          resolve({
            success: true,
            transactionId: 'TXN_' + Math.random().toString(36).substr(2, 9),
            status: 'completed'
          });
        }, 2000)
      );
    }
  }
};

export default api;
