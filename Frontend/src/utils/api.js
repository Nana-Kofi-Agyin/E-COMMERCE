const API_URL = 'http://localhost:3000/api';

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// API request helper
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// Auth APIs
export const authAPI = {
  register: (userData) => apiRequest('/users/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  login: (credentials) => apiRequest('/users/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  getProfile: () => apiRequest('/users/profile'),
};

// Product APIs
export const productAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/products?${queryString}`);
  },
  
  getFeatured: () => apiRequest('/products/featured'),
  
  getById: (id) => apiRequest(`/products/${id}`),
  
  create: (productData) => apiRequest('/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  }),
  
  update: (id, productData) => apiRequest(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  }),
  
  delete: (id) => apiRequest(`/products/${id}`, {
    method: 'DELETE',
  }),
  
  addReview: (id, reviewData) => apiRequest(`/products/${id}/reviews`, {
    method: 'POST',
    body: JSON.stringify(reviewData),
  }),
};

// Cart APIs
export const cartAPI = {
  get: () => apiRequest('/cart'),
  
  addItem: (productId, quantity) => apiRequest('/cart', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity }),
  }),
  
  updateItem: (itemId, quantity) => apiRequest(`/cart/${itemId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
  }),
  
  removeItem: (itemId) => apiRequest(`/cart/${itemId}`, {
    method: 'DELETE',
  }),
  
  clear: () => apiRequest('/cart', {
    method: 'DELETE',
  }),
};

// Order APIs
export const orderAPI = {
  create: (orderData) => apiRequest('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  }),
  
  getAll: () => apiRequest('/orders'),
  
  getById: (id) => apiRequest(`/orders/${id}`),
  
  updateToPaid: (id, paymentData) => apiRequest(`/orders/${id}/pay`, {
    method: 'PUT',
    body: JSON.stringify(paymentData),
  }),
  
  updateToDelivered: (id) => apiRequest(`/orders/${id}/deliver`, {
    method: 'PUT',
  }),
  
  updateStatus: (id, status) => apiRequest(`/orders/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  }),
};

export default {
  auth: authAPI,
  products: productAPI,
  cart: cartAPI,
  orders: orderAPI,
};
