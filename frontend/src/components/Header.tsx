import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap'

const Header = () => {
  return (
    <Navbar>
      <Container>
        <Link to="/" className="navbar-brand">
          App
        </Link>
        <Nav className="justify-content-end">
          <Link to="/login" className="nav-link">
            <FaSignInAlt /> Login
          </Link>
          <Link to="/register" className="nav-link">
            <FaUser /> Register
          </Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header
