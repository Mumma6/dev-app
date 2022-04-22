import React, { useState } from "react"
import { Button } from "react-bootstrap"
import { FaPlus } from "react-icons/fa"
import { Container, Row, Col } from "react-bootstrap"
import PlanningModel from "./PlanningModel"
import PlanningObjectCard from "./PlanningObjectCard"
import { useAppSelector } from "../../../app/hooks"

const Planning = () => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const { userProfile } = useAppSelector((state) => state.profile)
  return (
    <Container>
      <PlanningModel show={show} handleClose={handleClose} />
      <h3>Planera dina studier här</h3>
      <Button onClick={handleShow} size="sm">
        Add new path
      </Button>

      <PlanningObjectCard plannedCourses={userProfile?.plannedCourses} />
    </Container>
  )
}

export default Planning
