import { Button, Form, Container, Spinner } from 'react-bootstrap'
import { FaSignInAlt } from 'react-icons/fa'
import React, { useState, useEffect, ChangeEvent, SyntheticEvent } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from './authSlice'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { user, isLoading, isError, isSuccess, message } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/dashboard')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  const spinnerButton = () => (
    <Button variant="primary" type="submit" disabled>
      <Spinner
        style={{ marginRight: 5 }}
        animation="border"
        as="span"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      Loading...
    </Button>
  )

  const button = () => (
    <Button variant="primary" type="submit">
      Submit
    </Button>
  )

  return (
    <Container
      style={{
        marginTop: 40,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: 'white',
        width: 600,
      }}
    >
      <Container>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login to acces you profile</p>
      </Container>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            name="email"
            value={email}
            type="email"
            placeholder="Enter email"
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            name="password"
            value={password}
            onChange={onChange}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <div className="d-grid gap-2">{isLoading ? spinnerButton() : button()}</div>
      </Form>
    </Container>
  )
}

export default Login
