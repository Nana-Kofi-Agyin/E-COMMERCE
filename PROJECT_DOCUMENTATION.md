# E-Commerce Platform

A full-stack e-commerce application built with React, Node.js, Express, and MongoDB.

## Features

### Frontend
- **Authentication**: User registration and login with JWT
- **Product Catalog**: Browse products with filtering, search, and pagination
- **Product Details**: View detailed product information, images, and reviews
- **Shopping Cart**: Add/remove items, update quantities
- **Checkout**: Complete orders with shipping address and payment method
- **Order Management**: View order history and order details
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS

### Backend
- **RESTful API**: Complete REST API for all operations
- **User Management**: Registration, login, profile management
- **Product Management**: CRUD operations for products
- **Cart Management**: Add, update, remove items from cart
- **Order Processing**: Create and manage orders
- **Reviews**: Add and view product reviews
- **Authentication**: JWT-based authentication
- **Authorization**: Role-based access control (customer, vendor, admin)

## Tech Stack

### Frontend
- React 19
- React Router DOM
- Tailwind CSS
- Context API for state management
- Fetch API for HTTP requests

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Project Structure

```
Ecommerce/
├── Backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── Database/
│   │   └── models/               # Mongoose models
│   │       ├── user.js
│   │       ├── product.js
│   │       ├── cart.js
│   │       └── order.js
│   ├── middleware/
│   │   └── auth.js               # Authentication middleware
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   ├── .env                      # Environment variables
│   ├── .env.example              # Environment variables template
│   ├── package.json
│   └── server.js                 # Entry point
│
└── Frontend/
    ├── Auth/
    │   ├── Login.jsx
    │   └── Register.jsx
    ├── Pages/
    │   ├── Home.jsx
    │   ├── Products.jsx
    │   ├── ProductDetail.jsx
    │   ├── Cart.jsx
    │   ├── Checkout.jsx
    │   ├── Orders.jsx
    │   └── OrderDetail.jsx
    ├── UI Components/
    │   └── Layout/
    │       ├── layout.jsx
    │       ├── Header/
    │       │   └── header.jsx
    │       └── Footer/
    │           └── footer.jsx
    ├── src/
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── CartContext.jsx
    │   ├── utils/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    └── package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration:
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_super_secure_jwt_secret_key
   NODE_ENV=development
   ```

5. Start the server:
   ```bash
   npm run dev     # Development mode with nodemon
   # or
   npm start       # Production mode
   ```

The backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:5173` (or the next available port)

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (Protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Vendor/Admin)
- `PUT /api/products/:id` - Update product (Vendor/Admin)
- `DELETE /api/products/:id` - Delete product (Vendor/Admin)
- `POST /api/products/:id/reviews` - Add product review (Protected)

### Cart
- `GET /api/cart` - Get user's cart (Protected)
- `POST /api/cart` - Add item to cart (Protected)
- `PUT /api/cart/:itemId` - Update cart item (Protected)
- `DELETE /api/cart/:itemId` - Remove item from cart (Protected)
- `DELETE /api/cart` - Clear cart (Protected)

### Orders
- `POST /api/orders` - Create order (Protected)
- `GET /api/orders` - Get user's orders (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)
- `PUT /api/orders/:id/pay` - Update order to paid (Protected)
- `PUT /api/orders/:id/deliver` - Update order to delivered (Admin)
- `PUT /api/orders/:id/status` - Update order status (Admin)

## User Roles

- **Customer**: Can browse products, add to cart, place orders, and write reviews
- **Vendor**: Can create, update, and delete their own products (plus all customer features)
- **Admin**: Full access to all features including order management

## Features in Detail

### Authentication & Authorization
- JWT-based authentication
- Secure password hashing with bcryptjs
- Role-based access control
- Protected routes on both frontend and backend

### Product Management
- Product categories
- Product images (multiple)
- Stock management
- Discount pricing
- Product ratings and reviews
- Search and filter functionality

### Shopping Cart
- Add/remove products
- Update quantities
- Real-time price calculation
- Persistent cart (stored in database)

### Order Processing
- Shipping address management
- Multiple payment methods
- Order status tracking
- Order history
- Tax and shipping calculation

### Reviews System
- 5-star rating system
- Review comments
- One review per user per product
- Average rating calculation

## Development

### Running in Development Mode

Backend:
```bash
cd Backend
npm run dev
```

Frontend:
```bash
cd Frontend
npm run dev
```

### Building for Production

Backend:
```bash
cd Backend
npm start
```

Frontend:
```bash
cd Frontend
npm run build
npm run preview
```

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 3000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)

## Default Users

After setting up, you can create users with different roles:

**Customer** (default role when registering)
- Can browse, shop, and review products

**Vendor** (requires role change in database)
- Can manage their own products

**Admin** (requires role change in database)
- Full system access

## Future Enhancements

- Payment gateway integration (Stripe/PayPal)
- Email notifications
- Advanced search with Elasticsearch
- Product recommendations
- Wishlist functionality
- Product comparison
- Admin dashboard
- Vendor dashboard
- Image upload to cloud storage
- Real-time order tracking
- Customer support chat

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.

## Support

For issues and questions, please create an issue in the repository.
