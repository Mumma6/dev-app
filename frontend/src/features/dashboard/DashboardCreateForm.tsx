import React, { useState, useEffect, ChangeEvent, SyntheticEvent } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { UserProfile } from "../../Models/UserProfile"

import { createUserProfile } from "./profileSlice"

interface FormData {
  skills: string
  bio: string
  lookingForJob: boolean
  title: string
  location: string
}

const initialState: FormData = {
  skills: "",
  bio: "",
  lookingForJob: false,
  title: "",
  location: "",
}

const DashboardCreateForm = () => {
  const dispatch = useAppDispatch()

  const { user } = useAppSelector((state) => state.auth)

  const [formData, setFormData] = useState<FormData>(initialState)
  const { skills, bio, lookingForJob, title, location } = formData

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    // make array of skills.
    const skillsArray = skills.split(",")

    const profileData: UserProfile = {
      skills: skillsArray,
      bio,
      lookingForJob,
      user,
      title,
      location,
    }
    console.log("dispatch")
    dispatch(createUserProfile(profileData))
  }

  const handleQuestionClick = (e: any) => {
    setFormData((data) => ({
      ...formData,
      lookingForJob: e.target.checked,
    }))
  }

  return (
    <Container
      style={{
        marginTop: 40,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: "white",
        width: 600,
      }}
    >
      <Container style={{ marginBottom: 20 }}>
        <h1>Hello {user?.name}</h1>
        <p>To get started please fill in the form below</p>
        <i>More info can be added later...</i>
      </Container>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            name="title"
            value={title}
            type="text"
            placeholder="Title..."
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            name="location"
            value={location}
            type="text"
            placeholder="Location..."
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            name="skills"
            value={skills}
            type="text"
            placeholder="Enter skills, seperated by commas"
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            name="bio"
            value={bio}
            type="text"
            placeholder="Tell us about yourself..."
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type={"checkbox"}>
            <Form.Check.Input
              type={"checkbox"}
              defaultChecked={false}
              onClick={(e: any) => {
                handleQuestionClick(e)
              }}
            />
            <Form.Check.Label>Are you looking for a job?</Form.Check.Label>
          </Form.Check>
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

export default DashboardCreateForm
