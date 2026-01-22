import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Layout from '../UI Components/Layout/layout.jsx'
import Home from '../Pages/Home.jsx'
import Products from '../Pages/Products.jsx'
import ProductDetail from '../Pages/ProductDetail.jsx'
import Cart from '../Pages/Cart.jsx'
import Checkout from '../Pages/Checkout.jsx'
import Orders from '../Pages/Orders.jsx'
import OrderDetail from '../Pages/OrderDetail.jsx'
import Login from '../Auth/Login.jsx'
import Register from '../Auth/Register.jsx'

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='/products' element={<Products />} />
              <Route path='/products/:id' element={<ProductDetail />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/orders/:id' element={<OrderDetail />} />
            </Route>
            
            {/* Auth routes without layout */}
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App