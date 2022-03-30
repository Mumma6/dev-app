import { Col, Container, Row, Image, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import LinkButton from "../components/LinkButton"

const Landing = () => {
  return (
    <Container style={{ marginTop: 200 }} className="align-items-center">
      <Row className="align-items-center">
        <Col lg={4} style={{ marginTop: 20 }}>
          <h1>Welcome to DEV app</h1>
          <h3>Learn more or get started below</h3>
          <LinkButton url="register" text="Get started" />
          <LinkButton
            url="about"
            text="Learn more"
            props={{ variant: "info" }}
          />
        </Col>
        <Col style={{ marginTop: 20 }}>
          <Image src="\img\developer.svg" />
        </Col>
      </Row>
    </Container>
  )
}

export default Landing
