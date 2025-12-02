import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../UI Components/Layout/layout.jsx'
import Home from '../Pages/Home.jsx'

const App = () => {
  return (

    <>
      <BrowserRouter>
        <Routes>

          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App