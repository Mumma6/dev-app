import React, { useState } from "react"
import { Button, Col } from "react-bootstrap"
import { Row } from "react-bootstrap"
import { Container, Image } from "react-bootstrap"
import { FaPlus } from "react-icons/fa"
import { capitilizeFirstChar } from "../../utils/utils"
import SocialMediaModal from "./SocialMediaModal"
import * as Icons from "react-icons/fa"

const DashboardProfilePage = ({ userProfile }: any) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const createSocialLinks = () => {
    const links = Object.entries<string>(userProfile.social).filter(
      ([_, v]) => v !== ""
    )

    const DynamicIcon = ({ name }: { name: string }) => {
      const typeString = `Fa${capitilizeFirstChar(name)}`
      // @ts-ignore
      const IconComponent = Icons[typeString]

      if (!IconComponent) {
        // Return a default one
        return <Icons.FaHome />
      }

      return <IconComponent />
    }

    return links.map(([type, link]) => (
      <>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>{link}</p>
          <DynamicIcon name={type} />
        </div>
      </>
    ))
  }

  return (
    <Container
      style={{
        marginTop: 40,
        paddingTop: 20,
        paddingBottom: 20,
      }}
    >
      <SocialMediaModal show={show} handleClose={handleClose} />
      <Row style={{ marginBottom: 10 }}>
        <Col sm={12} md={4} lg={4}>
          <Container
            style={{ backgroundColor: "white", borderRadius: 5, padding: 10 }}
          >
            <div style={{ margin: 40, marginBottom: 10 }}>
              <Image fluid src="\img\user.jpg" />
            </div>

            <Container style={{ margin: 10 }}>
              <h1 style={{ textAlign: "center" }}>
                {capitilizeFirstChar(userProfile.user.name)}
              </h1>
              <p
                style={{ textAlign: "center" }}
                className="text-secondary mb-1"
              >
                {userProfile.title}
              </p>
              <p
                style={{ textAlign: "center" }}
                className="text-muted font-size-sm"
              >
                {userProfile.location}
              </p>
              <p
                style={{ textAlign: "center" }}
                className="text-muted font-size-sm"
              >
                {userProfile.user.email}
              </p>
              <div style={{ justifyContent: "center", display: "flex" }}>
                <button className="btn btn-primary">Follow</button>
                <button className="btn btn-outline-primary">Message</button>
              </div>
            </Container>
          </Container>
        </Col>
        <Col>
          <Container style={{ backgroundColor: "white", borderRadius: 5 }}>
            Här ska alla externa kurser finnas.
          </Container>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={4} lg={4}>
          <Container
            style={{ backgroundColor: "white", borderRadius: 5, padding: 10 }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h6>Social media links</h6>
              <Button onClick={handleShow} size="sm">
                <FaPlus />
              </Button>
            </div>
            <div>{createSocialLinks()}</div>
          </Container>
        </Col>
        <Col>
          <Container style={{ backgroundColor: "white", borderRadius: 5 }}>
            Här ska alla test resultat finnas
          </Container>
        </Col>
      </Row>
    </Container>
  )
}

export default DashboardProfilePage
