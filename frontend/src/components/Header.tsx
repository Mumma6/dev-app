import React from 'react'
import { FaHome, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'

import { useAppSelector, useAppDispatch } from '../app/hooks'
import { logout, reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { user } = useAppSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <Navbar>
      <Container>
        <Link to="/" className="navbar-brand">
          App
        </Link>
        <Nav className="justify-content-end">
          {user ? (
            <>
              <Link to="/dashboard" className="nav-link">
                <FaHome /> Dashboard
              </Link>
              <Button style={{ marginLeft: 10 }} variant="danger" size="sm" onClick={onLogout}>
                <FaSignOutAlt />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/about" className="nav-link">
                About
              </Link>
              <Link to="/mission" className="nav-link">
                Mission
              </Link>
              <Link to="/login" className="nav-link">
                <FaSignInAlt /> Login
              </Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header
