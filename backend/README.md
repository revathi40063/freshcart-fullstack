# FreshCart Backend API

A comprehensive Node.js backend API for the FreshCart e-commerce application, built with Express.js, MongoDB, and Stripe integration.

## 🚀 Features

- **Authentication & Authorization** - JWT-based auth with role-based access control
- **Product Management** - CRUD operations for products and categories
- **Order Processing** - Complete order lifecycle management
- **Payment Integration** - Stripe payment processing with webhooks
- **User Management** - User profiles and account management
- **Data Validation** - Comprehensive input validation and sanitization
- **Database Seeding** - Demo data for development and testing

## 🛠 Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Stripe** - Payment processing
- **express-validator** - Input validation
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger

## 📁 Project Structure

```
backend/
├── server.js                 # Main server file
├── config/
│   └── db.js                # Database connection
├── models/
│   ├── User.js              # User model
│   ├── Product.js           # Product model
│   ├── Order.js             # Order model
│   └── Category.js          # Category model
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── productController.js # Product operations
│   ├── orderController.js   # Order management
│   ├── categoryController.js # Category operations
│   └── paymentController.js # Payment processing
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   ├── productRoutes.js     # Product endpoints
│   ├── orderRoutes.js       # Order endpoints
│   ├── categoryRoutes.js    # Category endpoints
│   └── paymentRoutes.js     # Payment endpoints
├── middleware/
│   └── authMiddleware.js    # Authentication middleware
├── seeder/
│   └── seed.js              # Database seeder
├── package.json
└── env.example              # Environment variables template
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Stripe account (for payment processing)

### Installation

1. **Clone the repository and navigate to backend:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/freshcart
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Seed the database (optional):**
   ```bash
   npm run seed
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)
- `PUT /api/auth/profile` - Update user profile (Protected)
- `PUT /api/auth/password` - Change password (Protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/featured` - Get featured products
- `GET /api/products/search` - Search products
- `GET /api/products/category/:categoryId` - Get products by category

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Orders
- `POST /api/orders` - Create new order (Protected)
- `GET /api/orders/my` - Get user's orders (Protected)
- `GET /api/orders/:id` - Get single order (Protected)
- `PUT /api/orders/:id/cancel` - Cancel order (Protected)
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Payments
- `POST /api/payment/create-payment-intent` - Create payment intent (Protected)
- `POST /api/payment/confirm` - Confirm payment (Protected)
- `GET /api/payment/status/:orderId` - Get payment status (Protected)
- `POST /api/payment/refund` - Create refund (Admin)
- `POST /api/payment/webhook` - Stripe webhook handler

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### User Roles
- **user** - Regular customer (default)
- **admin** - Administrative access

## 💳 Payment Integration

The API integrates with Stripe for payment processing:

1. **Create Payment Intent** - Generate a payment intent for an order
2. **Confirm Payment** - Confirm successful payment
3. **Webhooks** - Handle Stripe events (payment success/failure)
4. **Refunds** - Process refunds for orders

### Stripe Setup
1. Create a Stripe account
2. Get your API keys from the Stripe dashboard
3. Add keys to your `.env` file
4. Set up webhook endpoints in Stripe dashboard

## 🗄️ Database Models

### User
- Personal information (name, email, phone)
- Authentication (password, role)
- Address information
- Account status

### Product
- Product details (name, description, price)
- Images and media
- Inventory management (stock, SKU)
- Categorization and tags
- Rating system

### Order
- Order information (items, pricing, status)
- Shipping address
- Payment details
- Tracking information

### Category
- Category details (name, description, image)
- Organization (sort order, active status)
- SEO-friendly slugs

## 🔍 API Features

### Search & Filtering
- Text search across products
- Category-based filtering
- Price range filtering
- Sorting options (name, price, rating, date)

### Pagination
- Page-based pagination
- Configurable page size
- Total count and page information

### Validation
- Input validation using express-validator
- Sanitization of user inputs
- Error handling and response formatting

### Error Handling
- Consistent error response format
- Detailed error messages
- HTTP status codes
- Development vs production error details

## 🧪 Testing

### Test Credentials (from seeder)
```
User: john@example.com / password123
User: jane@example.com / password123
Admin: admin@freshcart.com / admin123
```

### Sample API Calls

**Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "+1234567890"
  }'
```

**Get Products:**
```bash
curl http://localhost:5000/api/products
```

**Create Order:**
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -d '{
    "items": [
      {
        "product": "product_id_here",
        "quantity": 2
      }
    ],
    "shippingAddress": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "address": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001"
    }
  }'
```

## 🚀 Deployment

### Environment Variables
Ensure all required environment variables are set:
- Database connection string
- JWT secret and expiration
- Stripe API keys
- CORS configuration
- File upload settings

### Production Considerations
- Use environment-specific configurations
- Set up proper logging
- Configure rate limiting
- Set up monitoring and health checks
- Use HTTPS in production
- Configure CORS properly

## 📝 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with demo data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of the FreshCart e-commerce platform.

## 🆘 Support

For support and questions:
- Check the API documentation
- Review error logs
- Contact the development team

---

**FreshCart Backend API** - Powering fresh grocery delivery! 🥬🍎🥕
