import React, { useState, useEffect, ChangeEvent, SyntheticEvent } from 'react'
import { Button, Form, Container } from 'react-bootstrap'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { register, reset } from './authSlice'
import SpinnerComponent from '../../components/SpinnerComponent'

interface FormData {
  name: string
  email: string
  password: string
  password2: string
}

function Register() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

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

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  const onSubmit = (event: SyntheticEvent) => {
    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <SpinnerComponent />
  }

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
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </Container>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            name="name"
            value={name}
            type="text"
            placeholder="Enter name"
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            name="email"
            value={email}
            type="email"
            placeholder="Enter email"
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            name="password"
            value={password}
            type="password"
            placeholder="Password"
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            name="password2"
            value={password2}
            type="password"
            placeholder="Comfirm password"
            onChange={onChange}
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default Register
