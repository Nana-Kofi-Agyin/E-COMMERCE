import React from 'react'

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to EStore
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover amazing products with unbeatable prices
        </p>
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4">Summer Sale</h2>
          <p className="text-lg mb-6">Up to 50% off on selected items</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Shop Now
          </button>
        </div>

        {/* Categories Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-100 rounded-lg p-6 hover:bg-gray-200 transition-colors">
            <h3 className="text-xl font-semibold mb-2">Electronics</h3>
            <p className="text-gray-600">Latest gadgets and devices</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-6 hover:bg-gray-200 transition-colors">
            <h3 className="text-xl font-semibold mb-2">Fashion</h3>
            <p className="text-gray-600">Trendy clothes and accessories</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-6 hover:bg-gray-200 transition-colors">
            <h3 className="text-xl font-semibold mb-2">Home & Garden</h3>
            <p className="text-gray-600">Everything for your home</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home