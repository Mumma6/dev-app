import { Col, Container, Row, Image, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate()

  const handleClick = (url: string) => navigate(url)

  return (
    <Container style={{ marginTop: 200 }} className='align-items-center'>
      <Row className='align-items-center'>
        <Col lg={4} style={{ marginTop: 20 }} >
          <h1>Welcome to DEV app</h1>
          <h3>Learn more or get started below</h3>
          <Button variant="primary" size="lg" onClick={() => handleClick('/register')}>
            Get started
          </Button>
          <Button variant="info" size="lg" onClick={() => handleClick('/about')}>
            Learn more
          </Button>
        </Col>
        <Col style={{ marginTop: 20 }}>
          <Image src="\img\developer.svg" />
        </Col>
      </Row>
    </Container>
  )
}

export default Landing
