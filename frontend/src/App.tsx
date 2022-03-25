import React from 'react'
import { Counter } from './features/counter/Counter'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Login from './features/auth/Login'
import Dashboard from './pages/Dashboard'
import Register from './features/auth/Register'
import Landing from './pages/Landing'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import { Container } from 'react-bootstrap'
import About from './pages/About'
import Mission from './pages/Mission'

function App() {
  return (
    <>
      <Router>
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Container>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
