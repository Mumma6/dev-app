import React from 'react'
import { FaChartLine, FaHome, FaList, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'

import { useAppSelector, useAppDispatch } from '../app/hooks'
import { logout, reset } from '../features/auth/authSlice'
import LinkButton from './LinkButton'

const Header = () => {
  const dispatch = useAppDispatch()

  const { user } = useAppSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
  }

  const loggedIn = (
    <>
      <Link to="/quiz" className="nav-link">
        <FaList /> Quiz
      </Link>
      <Link to="/statistics" className="nav-link">
        <FaChartLine /> Statistics
      </Link>
      <Link to="/dashboard" className="nav-link">
        <FaHome /> Dashboard
      </Link>
      <LinkButton
        text="Logout "
        url="/"
        onClickFnc={onLogout}
        customStyles={{ marginLeft: 10 }}
        props={{ variant: 'outline-danger' }}
      >
        <FaSignOutAlt />
      </LinkButton>
    </>
  )

  return (
    <Navbar style={{ marginBottom: 20 }}>
      <Container>
        <Link to="/" className="navbar-brand">
          App
        </Link>
        <Nav className="justify-content-end">
          {user ? (
            loggedIn
          ) : (
            <>
              <Link to="/about" className="nav-link">
                About
              </Link>
              <Link to="/mission" className="nav-link">
                Mission
              </Link>
              <LinkButton url="/login" text="Login" props={{ variant: 'outline-success' }}>
                <FaSignInAlt />
              </LinkButton>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header
