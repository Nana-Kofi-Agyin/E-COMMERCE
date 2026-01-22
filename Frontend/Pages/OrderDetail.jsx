import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderAPI } from '../src/utils/api';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const data = await orderAPI.getById(id);
      setOrder(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch order');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Processing: 'bg-blue-100 text-blue-800',
      Shipped: 'bg-purple-100 text-purple-800',
      Delivered: 'bg-green-100 text-green-800',
      Cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading order...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/orders" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Orders
      </Link>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Details</h1>
            <p className="text-gray-600">Order ID: {order._id}</p>
            <p className="text-gray-600">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <span
            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
              order.status
            )}`}
          >
            {order.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Shipping Address */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Shipping Address</h3>
            <p className="text-gray-700">{order.shippingAddress.address}</p>
            <p className="text-gray-700">
              {order.shippingAddress.city}, {order.shippingAddress.postalCode}
            </p>
            <p className="text-gray-700">{order.shippingAddress.country}</p>
          </div>

          {/* Payment Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Payment Information</h3>
            <p className="text-gray-700">Method: {order.paymentMethod}</p>
            <p className="text-gray-700">
              Status:{' '}
              {order.isPaid ? (
                <span className="text-green-600 font-semibold">
                  Paid on {new Date(order.paidAt).toLocaleDateString()}
                </span>
              ) : (
                <span className="text-red-600 font-semibold">Not Paid</span>
              )}
            </p>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-4 text-lg">Order Items</h3>
          <div className="space-y-4">
            {order.orderItems.map((item) => (
              <div key={item._id} className="flex items-center border-b pb-4 last:border-b-0">
                <img
                  src={item.image || 'https://via.placeholder.com/100'}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="ml-4 flex-1">
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    ${item.price.toFixed(2)} × {item.quantity}
                  </p>
                </div>
                <p className="font-semibold text-blue-600">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="border-t pt-4">
          <div className="max-w-md ml-auto space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Items Price:</span>
              <span className="font-semibold">${order.itemsPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping:</span>
              <span className="font-semibold">${order.shippingPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax:</span>
              <span className="font-semibold">${order.taxPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg border-t pt-2">
              <span className="font-bold">Total:</span>
              <span className="font-bold text-blue-600">${order.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Status */}
      {order.isDelivered && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 font-semibold">
            ✓ Order delivered on {new Date(order.deliveredAt).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
