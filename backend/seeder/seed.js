const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load environment variables
dotenv.config();

// Import models
const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Order = require('../models/Order');

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

// Clear existing data
const clearData = async () => {
  try {
    await Order.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});
    await User.deleteMany({});
    console.log('Existing data cleared');
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};

// Seed categories
const seedCategories = async () => {
  try {
    const categories = [
      {
        name: 'Fruits',
        description: 'Fresh and juicy fruits delivered daily',
        image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=200&fit=crop',
        sortOrder: 1
      },
      {
        name: 'Vegetables',
        description: 'Organic and fresh vegetables from local farms',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=200&fit=crop',
        sortOrder: 2
      },
      {
        name: 'Dairy',
        description: 'Fresh dairy products and milk',
        image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=200&fit=crop',
        sortOrder: 3
      },
      {
        name: 'Bakery',
        description: 'Fresh bread and baked goods',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop',
        sortOrder: 4
      }
    ];

    const createdCategories = await Category.insertMany(categories);
    console.log(`${createdCategories.length} categories created`);
    return createdCategories;
  } catch (error) {
    console.error('Error seeding categories:', error);
  }
};

// Seed users
const seedUsers = async () => {
  try {
    const users = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '+1234567890',
        role: 'user',
        avatar: 'https://via.placeholder.com/150'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        phone: '+1234567891',
        role: 'user',
        avatar: 'https://via.placeholder.com/150'
      },
      {
        name: 'Admin User',
        email: 'admin@freshcart.com',
        password: 'admin123',
        phone: '+1234567892',
        role: 'admin',
        avatar: 'https://via.placeholder.com/150'
      }
    ];

    const createdUsers = await User.insertMany(users);
    console.log(`${createdUsers.length} users created`);
    return createdUsers;
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

// Seed products
const seedProducts = async (categories) => {
  try {
    const products = [
      // Fruits
      {
        name: 'Fresh Apples',
        description: 'Crisp and juicy red apples, perfect for snacking or baking.',
        price: 2.99,
        images: ['https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop'],
        category: categories[0]._id,
        stock: 50,
        rating: { average: 4.5, count: 25 },
        tags: ['organic', 'fresh', 'healthy'],
        isFeatured: true,
        sku: 'FRU-APP-001'
      },
      {
        name: 'Organic Bananas',
        description: 'Sweet and creamy organic bananas, rich in potassium.',
        price: 1.99,
        images: ['https://images.unsplash.com/photo-1571771894821-ce9b6c11a08e?w=400&h=300&fit=crop'],
        category: categories[0]._id,
        stock: 30,
        rating: { average: 4.3, count: 18 },
        tags: ['organic', 'potassium', 'energy'],
        isFeatured: true,
        sku: 'FRU-BAN-001'
      },
      {
        name: 'Fresh Oranges',
        description: 'Juicy and vitamin C rich oranges, perfect for breakfast.',
        price: 3.49,
        images: ['https://images.unsplash.com/photo-1557800634-7bf3c73a9c2e?w=400&h=300&fit=crop'],
        category: categories[0]._id,
        stock: 25,
        rating: { average: 4.2, count: 12 },
        tags: ['vitamin-c', 'citrus', 'fresh'],
        sku: 'FRU-ORA-001'
      },
      {
        name: 'Sweet Grapes',
        description: 'Sweet and seedless grapes, perfect for snacking.',
        price: 4.99,
        images: ['https://images.unsplash.com/photo-1537640538966-79f369143aa8?w=400&h=300&fit=crop'],
        category: categories[0]._id,
        stock: 20,
        rating: { average: 4.6, count: 8 },
        tags: ['sweet', 'seedless', 'snack'],
        sku: 'FRU-GRA-001'
      },

      // Vegetables
      {
        name: 'Fresh Carrots',
        description: 'Crunchy and nutritious carrots, great for cooking or snacking.',
        price: 1.49,
        images: ['https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop'],
        category: categories[1]._id,
        stock: 40,
        rating: { average: 4.2, count: 15 },
        tags: ['crunchy', 'nutritious', 'beta-carotene'],
        isFeatured: true,
        sku: 'VEG-CAR-001'
      },
      {
        name: 'Green Lettuce',
        description: 'Fresh green lettuce leaves, perfect for salads and sandwiches.',
        price: 2.49,
        images: ['https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=300&fit=crop'],
        category: categories[1]._id,
        stock: 25,
        rating: { average: 4.0, count: 10 },
        tags: ['fresh', 'salad', 'green'],
        sku: 'VEG-LET-001'
      },
      {
        name: 'Fresh Tomatoes',
        description: 'Ripe and juicy tomatoes, perfect for cooking and salads.',
        price: 2.99,
        images: ['https://images.unsplash.com/photo-1546470427-227ae2b2b8e6?w=400&h=300&fit=crop'],
        category: categories[1]._id,
        stock: 35,
        rating: { average: 4.4, count: 20 },
        tags: ['ripe', 'juicy', 'versatile'],
        sku: 'VEG-TOM-001'
      },
      {
        name: 'Organic Spinach',
        description: 'Fresh organic spinach leaves, packed with iron and vitamins.',
        price: 3.99,
        images: ['https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop'],
        category: categories[1]._id,
        stock: 15,
        rating: { average: 4.1, count: 7 },
        tags: ['organic', 'iron', 'vitamins'],
        sku: 'VEG-SPI-001'
      },

      // Dairy
      {
        name: 'Whole Milk',
        description: 'Fresh whole milk, rich and creamy for your daily needs.',
        price: 3.99,
        images: ['https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop'],
        category: categories[2]._id,
        stock: 20,
        rating: { average: 4.4, count: 30 },
        tags: ['fresh', 'creamy', 'calcium'],
        isFeatured: true,
        sku: 'DAI-MIL-001'
      },
      {
        name: 'Greek Yogurt',
        description: 'Thick and creamy Greek yogurt, high in protein.',
        price: 4.49,
        images: ['https://images.unsplash.com/photo-1571212058562-8c4b4a4b4b4b?w=400&h=300&fit=crop'],
        category: categories[2]._id,
        stock: 18,
        rating: { average: 4.3, count: 22 },
        tags: ['protein', 'creamy', 'healthy'],
        sku: 'DAI-YOG-001'
      },
      {
        name: 'Fresh Cheese',
        description: 'Aged cheddar cheese, perfect for sandwiches and cooking.',
        price: 5.99,
        images: ['https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=300&fit=crop'],
        category: categories[2]._id,
        stock: 12,
        rating: { average: 4.5, count: 16 },
        tags: ['aged', 'cheddar', 'versatile'],
        sku: 'DAI-CHE-001'
      },

      // Bakery
      {
        name: 'Fresh Bread',
        description: 'Artisan bread baked fresh daily, perfect for breakfast.',
        price: 2.79,
        images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop'],
        category: categories[3]._id,
        stock: 15,
        rating: { average: 4.6, count: 28 },
        tags: ['artisan', 'fresh', 'breakfast'],
        isFeatured: true,
        sku: 'BAK-BRE-001'
      },
      {
        name: 'Croissants',
        description: 'Buttery and flaky croissants, perfect with coffee.',
        price: 3.99,
        images: ['https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop'],
        category: categories[3]._id,
        stock: 10,
        rating: { average: 4.7, count: 14 },
        tags: ['buttery', 'flaky', 'french'],
        sku: 'BAK-CRO-001'
      },
      {
        name: 'Muffins',
        description: 'Fresh baked muffins in various flavors.',
        price: 2.49,
        images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'],
        category: categories[3]._id,
        stock: 8,
        rating: { average: 4.2, count: 11 },
        tags: ['fresh', 'sweet', 'breakfast'],
        sku: 'BAK-MUF-001'
      }
    ];

    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} products created`);
    return createdProducts;
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};

// Seed sample orders
const seedOrders = async (users, products) => {
  try {
    const orders = [
      {
        user: users[0]._id,
        orderNumber: 'ORD-000001',
        items: [
          {
            product: products[0]._id,
            name: products[0].name,
            price: products[0].price,
            quantity: 2,
            image: products[0].images[0]
          },
          {
            product: products[4]._id,
            name: products[4].name,
            price: products[4].price,
            quantity: 1,
            image: products[4].images[0]
          }
        ],
        shippingAddress: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phone: '+1234567890',
          address: '123 Main Street',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'US'
        },
        paymentInfo: {
          method: 'card',
          status: 'paid',
          transactionId: 'txn_123456789'
        },
        pricing: {
          subtotal: 7.47,
          shipping: 0,
          tax: 0.60,
          total: 8.07
        },
        status: 'delivered',
        deliveredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      },
      {
        user: users[1]._id,
        orderNumber: 'ORD-000002',
        items: [
          {
            product: products[1]._id,
            name: products[1].name,
            price: products[1].price,
            quantity: 3,
            image: products[1].images[0]
          }
        ],
        shippingAddress: {
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@example.com',
          phone: '+1234567891',
          address: '456 Oak Avenue',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90210',
          country: 'US'
        },
        paymentInfo: {
          method: 'card',
          status: 'paid',
          transactionId: 'txn_123456790'
        },
        pricing: {
          subtotal: 5.97,
          shipping: 9.99,
          tax: 1.28,
          total: 17.24
        },
        status: 'shipped',
        trackingNumber: 'TRK123456789'
      }
    ];

    const createdOrders = await Order.insertMany(orders);
    console.log(`${createdOrders.length} orders created`);
    return createdOrders;
  } catch (error) {
    console.error('Error seeding orders:', error);
  }
};

// Main seed function
const seed = async () => {
  try {
    await connectDB();
    await clearData();
    
    const categories = await seedCategories();
    const users = await seedUsers();
    const products = await seedProducts(categories);
    await seedOrders(users, products);
    
    console.log('\n✅ Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`- ${categories.length} categories`);
    console.log(`- ${users.length} users`);
    console.log(`- ${products.length} products`);
    console.log('- 2 sample orders');
    
    console.log('\n🔑 Test Credentials:');
    console.log('User: john@example.com / password123');
    console.log('User: jane@example.com / password123');
    console.log('Admin: admin@freshcart.com / admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

// Run seeder
seed();
