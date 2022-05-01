import React from "react"
import { Container } from "react-bootstrap"
import { UserProfile } from "../../../Models/UserProfile"
import AddExternalCourse from "./AddExternalCourse"

const ExternalCourses = ({ userProfile }: { userProfile: UserProfile }) => {
  return (
    <>
      <Container style={{ backgroundColor: "white", borderRadius: 5 }}>
        <h2>View and add courses here</h2>
        <AddExternalCourse />
      </Container>
      <Container
        style={{ backgroundColor: "white", borderRadius: 5, marginTop: 30 }}
      >
        <h3>Completed courses</h3>
        {userProfile.externalCourses?.map((course) => (
          <>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>Link: {course.link}</p>
          </>
        ))}
      </Container>
    </>
  )
}

export default ExternalCourses
