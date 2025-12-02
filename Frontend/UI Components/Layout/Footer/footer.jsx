import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-blue-400">EStore</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted online shopping destination. We offer high-quality products 
              with fast delivery and excellent customer service.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons */}
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.017 0H7.983C3.585 0 0 3.585 0 7.983v4.034C0 16.415 3.585 20 7.983 20h4.034C16.415 20 20 16.415 20 12.017V7.983C20 3.585 16.415 0 12.017 0zM10 15A5 5 0 110 5a5 5 0 010 10zm6.108-10.846a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Track Your Order</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Best Sellers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Sale</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Gift Cards</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Connected</h3>
            <p className="text-gray-300 text-sm">
              Subscribe to get special offers, free giveaways, and exclusive deals.
            </p>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full sm:flex-1 min-w-0 px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md sm:rounded-l-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md sm:rounded-l-none sm:rounded-r-md hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <div className="flex items-start space-x-2">
                <input type="checkbox" id="privacy" className="rounded border-gray-700 mt-0.5 flex-shrink-0" />
                <label htmlFor="privacy" className="text-xs text-gray-400 leading-relaxed">
                  I agree to the <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 gap-4">
            
            {/* Copyright */}
            <div className="text-sm text-gray-400 text-center lg:text-left">
              © 2025 EStore. All rights reserved.
            </div>

            {/* Payment Methods */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <span className="text-sm text-gray-400 whitespace-nowrap">We Accept:</span>
              <div className="flex flex-wrap justify-center gap-2">
                <div className="bg-white rounded px-2 py-1 min-w-[40px] text-center">
                  <span className="text-xs font-bold text-blue-600">VISA</span>
                </div>
                <div className="bg-white rounded px-2 py-1 min-w-[40px] text-center">
                  <span className="text-xs font-bold text-red-600">MC</span>
                </div>
                <div className="bg-white rounded px-2 py-1 min-w-[40px] text-center">
                  <span className="text-xs font-bold text-blue-800">AMEX</span>
                </div>
                <div className="bg-white rounded px-2 py-1 min-w-[40px] text-center">
                  <span className="text-xs font-bold text-yellow-600">PP</span>
                </div>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-4 lg:gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors whitespace-nowrap">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors whitespace-nowrap">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors whitespace-nowrap">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer