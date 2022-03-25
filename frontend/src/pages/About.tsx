import { Col, Container, Row, Image, Button } from 'react-bootstrap'

const About = () => {
  return (
    <Container style={{ marginTop: 200 }} className="align-items-center">
      <Row className="align-items-center">
        <Col style={{ marginTop: 20 }}>
          <Image src="\img\graphs.svg" />
        </Col>
        <Col lg={4} style={{ marginTop: 20 }}>
          <h1>Learn to code</h1>
          <h3>Create a profile, learn to code and get your first job!</h3>
        </Col>
      </Row>
    </Container>
  )
}

export default About
