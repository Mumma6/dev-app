import { Button, Form, Container } from 'react-bootstrap'
import { FaSignInAlt } from 'react-icons/fa'

const Login = () => {
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
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Password" />
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

export default Login
