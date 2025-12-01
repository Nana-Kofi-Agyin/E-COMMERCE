import React from 'react'
import  ReactDOM from 'react-dom/client'
import './App.css'
import Header from '../UI Components/Layout/Header/header.jsx'
import Footer from '../UI Components/Layout/Footer/footer.jsx'

function App() {


  return (
    <>
      <Header />
      {/* Main content area will go here */}
      <main className="min-h-screen">
        {/* Page content will be added here */}
      </main>
      <Footer />
    </>
  )
}

export default App
