# AliExpress Clone - Backend API

This is the backend API for the AliExpress clone e-commerce application.

## Features

- **Authentication**: JWT-based user authentication with signup, signin, and profile management
- **Products**: Product catalog with categories, search, filtering, and pagination
- **Shopping Cart**: Add, update, remove items with real-time stock validation
- **Orders**: Order creation, tracking, and management
- **Database**: PostgreSQL with proper schema design and relationships

## Tech Stack

- **Node.js** with Express.js
- **MongoDB** database with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation
- **helmet** for security headers
- **cors** for cross-origin requests
- **express-rate-limit** for API rate limiting

## Database Schema

The database includes the following collections:

- **users**: User accounts and profiles
- **categories**: Product categories
- **products**: Product catalog with reviews and specifications
- **cartitems**: Shopping cart items
- **orders**: Order information with embedded order items

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Database Setup**
   - Install MongoDB
   - Start MongoDB service
   - Seed the database with sample data:
     ```bash
     npm run seed
     ```

3. **Environment Configuration**
   - Copy `env.example` to `.env`
   - Update the database credentials and JWT secret

4. **Start the Server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/signout` - Logout user

### Products
- `GET /api/products` - Get products with filtering and pagination
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories/all` - Get all categories

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:itemId` - Update cart item quantity
- `DELETE /api/cart/remove/:itemId` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart

### Orders
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:orderId` - Get order details
- `POST /api/orders/create` - Create new order
- `PUT /api/orders/:orderId/status` - Update order status

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Rate limiting to prevent abuse
- Input validation and sanitization
- CORS configuration
- Security headers with helmet

## Environment Variables

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/aliexpress

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

## Development

The backend is designed to work with the Next.js frontend. Make sure to:

1. Update the frontend API calls to point to the backend endpoints
2. Handle JWT tokens in the frontend for authenticated requests
3. Update the Redux store to work with the new API structure

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use a strong JWT secret
3. Configure proper CORS origins
4. Set up SSL/HTTPS
5. Use environment variables for all sensitive data
6. Set up proper database backups
