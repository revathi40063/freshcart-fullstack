# FreshCart Frontend

A modern React-based e-commerce frontend for FreshCart, an online grocery store specializing in fresh fruits, vegetables, and daily essentials.

## Features

- 🛒 **Shopping Cart** - Add, remove, and manage items with real-time updates
- 🔐 **User Authentication** - Login and signup with session management
- 📱 **Responsive Design** - Mobile-first design that works on all devices
- 🎨 **Modern UI** - Clean, intuitive interface with smooth animations
- 🔍 **Product Search & Filtering** - Find products by category, name, or price
- 💳 **Checkout Process** - Complete order flow with payment simulation
- 📦 **Order Management** - View order history and track status
- 🚀 **Fast Performance** - Optimized for speed and user experience

## Tech Stack

- **React 18** - Modern React with hooks and functional components
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Context API** - State management for cart and authentication
- **CSS3** - Custom styling with responsive design
- **Local Storage** - Persistent data storage

## Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Navbar.css
│   │   ├── Footer.js
│   │   ├── Footer.css
│   │   ├── ProductCard.js
│   │   ├── ProductCard.css
│   │   ├── CartItem.js
│   │   ├── CartItem.css
│   │   ├── PaymentForm.js
│   │   └── PaymentForm.css
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Home.css
│   │   ├── Products.js
│   │   ├── Products.css
│   │   ├── ProductDetails.js
│   │   ├── ProductDetails.css
│   │   ├── Cart.js
│   │   ├── Cart.css
│   │   ├── Checkout.js
│   │   ├── Checkout.css
│   │   ├── Payment.js
│   │   ├── Payment.css
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   ├── Auth.css
│   │   ├── Profile.js
│   │   └── Profile.css
│   ├── context/
│   │   ├── AuthContext.js
│   │   └── CartContext.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Features Overview

### 🏠 Home Page
- Hero section with call-to-action
- Featured product categories
- Featured products grid
- Company features and benefits

### 🛍️ Products Page
- Product grid with search and filtering
- Category-based filtering
- Price and rating sorting
- Responsive product cards

### 📦 Product Details
- Detailed product information
- Image gallery
- Quantity selector
- Add to cart functionality
- Product specifications

### 🛒 Shopping Cart
- Cart item management
- Quantity updates
- Item removal
- Order summary with totals
- Proceed to checkout

### 💳 Checkout Process
- Customer information form
- Delivery address
- Order summary
- Payment form integration

### 🔐 Authentication
- User login and signup
- Form validation
- Session management
- Protected routes

### 👤 User Profile
- Account information
- Order history
- Settings management
- Order tracking

## API Integration

The frontend is designed to work with a backend API. The API service (`src/services/api.js`) includes:

- **Authentication endpoints** - Login, signup, profile management
- **Product endpoints** - Get products, categories, search, filtering
- **Cart endpoints** - Add, remove, update cart items
- **Order endpoints** - Create orders, get order history
- **Payment endpoints** - Process payments

### Demo Mode

The application includes demo data and simulated API responses for development and testing purposes. All API calls are mocked with realistic data.

## State Management

The application uses React Context API for state management:

- **AuthContext** - User authentication state
- **CartContext** - Shopping cart state and operations

Both contexts persist data to localStorage for session management.

## Styling

The application uses custom CSS with:

- **Mobile-first responsive design**
- **CSS Grid and Flexbox layouts**
- **Smooth animations and transitions**
- **Consistent color scheme and typography**
- **Accessible design patterns**

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Code Structure

- **Components** - Reusable UI components
- **Pages** - Route-based page components
- **Context** - State management providers
- **Services** - API integration layer
- **Styles** - Component-specific CSS files

### Best Practices

- Functional components with hooks
- Custom hooks for reusable logic
- Prop validation and error handling
- Responsive design patterns
- Accessibility considerations

## Deployment

### Build for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

### Environment Variables

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the FreshCart e-commerce platform.

## Support

For support and questions, please contact the development team or create an issue in the repository.

---

**FreshCart Frontend** - Bringing fresh groceries to your doorstep! 🥬🍎🥕
