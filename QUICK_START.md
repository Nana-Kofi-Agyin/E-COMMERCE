# Quick Start Guide

## 🚀 Getting Started

Follow these steps to run your e-commerce application:

### Step 1: Start the Backend Server

Open a terminal and run:

```bash
cd Backend
npm run dev
```

You should see:
```
Server is running on http://localhost:3000
MongoDB connected successfully
```

### Step 2: Start the Frontend Development Server

Open a **NEW** terminal (keep the backend running) and run:

```bash
cd Frontend
npm run dev
```

You should see something like:
```
  VITE v7.1.2  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Step 3: Open the Application

Open your browser and go to: **http://localhost:5173**

## 🎯 What You Can Do Now

### As a New User:
1. **Register**: Click "Sign Up" in the header
2. **Browse Products**: Go to "Products" to see all items
3. **View Details**: Click on any product to see details
4. **Add to Cart**: Click "Add to Cart" on product pages
5. **Checkout**: Go to cart and proceed to checkout
6. **View Orders**: Check your order history

### Testing the Application:

1. **Create an Account**
   - Click "Sign Up"
   - Fill in your details
   - You'll be automatically logged in

2. **Browse Products**
   - The database is currently empty
   - You'll need to add products via API or create a vendor account

3. **Add Products (Using API)**
   Since you need products to shop, you can add some via API:

   Open a new terminal and run:
   ```bash
   # First, register as a user to get a token
   # Then use the token to create products
   ```

## 📝 Creating Sample Products

### Option 1: Using Postman or Thunder Client

1. **Register a User** (POST to http://localhost:3000/api/users/register)
   ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "password123"
   }
   ```
   Copy the `token` from the response.

2. **Change User Role to Vendor** (manually in MongoDB)
   - Open MongoDB Compass or mongo shell
   - Find the user and change `role: "customer"` to `role: "vendor"`

3. **Create a Product** (POST to http://localhost:3000/api/products)
   Add header: `Authorization: Bearer YOUR_TOKEN`
   ```json
   {
     "name": "Wireless Headphones",
     "description": "High-quality wireless headphones with noise cancellation",
     "price": 99.99,
     "category": "Electronics",
     "brand": "AudioTech",
     "images": ["https://via.placeholder.com/400"],
     "stock": 50,
     "discount": 10
   }
   ```

### Option 2: Create a Seed Script

Create `Backend/seed.js`:

```javascript
const mongoose = require('mongoose');
const Product = require('./Database/models/product');
const User = require('./Database/models/user');
require('dotenv').config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Find or create a vendor
    let vendor = await User.findOne({ role: 'vendor' });
    if (!vendor) {
      vendor = await User.create({
        name: 'Sample Vendor',
        email: 'vendor@example.com',
        password: 'password123',
        role: 'vendor'
      });
    }

    // Create sample products
    const products = [
      {
        name: 'Wireless Headphones',
        description: 'Premium wireless headphones with active noise cancellation',
        price: 149.99,
        category: 'Electronics',
        brand: 'AudioPro',
        images: ['https://via.placeholder.com/400'],
        stock: 50,
        vendor: vendor._id,
        featured: true
      },
      {
        name: 'Smart Watch',
        description: 'Fitness tracking smartwatch with heart rate monitor',
        price: 199.99,
        category: 'Electronics',
        brand: 'TechFit',
        images: ['https://via.placeholder.com/400'],
        stock: 30,
        vendor: vendor._id,
        discount: 15
      },
      // Add more products as needed
    ];

    await Product.insertMany(products);
    console.log('Sample products created!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedProducts();
```

Run it:
```bash
cd Backend
node seed.js
```

## 🔧 Troubleshooting

### Backend Issues:

**"MongoDB connection failed"**
- Check your MONGO_URI in Backend/.env
- Ensure MongoDB is running (if using local)
- Check your internet connection (if using MongoDB Atlas)

**"Port 3000 already in use"**
- Change PORT in Backend/.env to another port (e.g., 3001)
- Or kill the process using port 3000

### Frontend Issues:

**"Failed to fetch"**
- Ensure backend is running on http://localhost:3000
- Check the API_URL in Frontend/src/utils/api.js

**"Cannot find module"**
- Run `npm install` in the Frontend directory

**Tailwind CSS not working**
- Clear browser cache
- Restart the dev server

## 📱 Features to Test

1. ✅ User Registration & Login
2. ✅ Browse Products (once you add some)
3. ✅ Product Details & Reviews
4. ✅ Shopping Cart
5. ✅ Checkout Process
6. ✅ Order History

## 🎨 Customization

### Changing Colors:
The app uses Tailwind CSS. Primary color is blue-600. To change:
- Find `bg-blue-600` and `text-blue-600` in components
- Replace with your preferred color (e.g., `bg-purple-600`)

### Adding Your Logo:
- Replace "EStore" in `Frontend/UI Components/Layout/Header/header.jsx`
- Add an image: `<img src="/logo.png" alt="Logo" />`

## 📚 Next Steps

1. Add products to your database
2. Create different user accounts (customer, vendor, admin)
3. Test the complete shopping flow
4. Customize the design to match your brand
5. Add more features from the documentation

## 🆘 Need Help?

- Check the full documentation: `PROJECT_DOCUMENTATION.md`
- Review API endpoints in the documentation
- Check console logs for errors
- Ensure both frontend and backend are running

---

**Happy Coding! 🎉**
