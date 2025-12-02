import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header/header.jsx'
import Footer from './Footer/footer.jsx'

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout