import React, { useState } from "react"
import { Button } from "react-bootstrap"
import { FaPlus } from "react-icons/fa"
import AddCourseModal from "./AddCourseModal"

const AddExternalCourse = () => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <AddCourseModal show={show} handleClose={handleClose} />
      <Button onClick={handleShow} size="sm">
        <FaPlus />
      </Button>
    </>
  )
}

export default AddExternalCourse
