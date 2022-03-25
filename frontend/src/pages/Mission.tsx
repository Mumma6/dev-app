import { Col, Container, Row, Image, Button } from 'react-bootstrap'

const Mission = () => {
  return (
    <Container style={{ marginTop: 200 }} className="align-items-center">
      <Col lg={4} style={{ marginTop: 20 }}>
          <h1>For everyone</h1>
          <h3>Everyone should be able to learn to code and <b>launch</b> career in tech!</h3>
        </Col>
      <Row className="align-items-center">
        <Col style={{ marginTop: 20 }}>
          <Image src="\img\product-launch.svg" />
        </Col>
        
      </Row>
    </Container>
  )
}

export default Mission