import React from 'react'
import { Routes, Route,Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Profile from './pages/Profile'

import PostList from './pages/PostList'
import PrivateRoute from './utils/PrivateRoute'



function App() {


  return (
    <>
    <Navbar />
 <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
   
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/posts"element={<PrivateRoute><PostList /></PrivateRoute>} />
      
    </Routes>
    <Footer/>
    </>
  )
}

export default App
