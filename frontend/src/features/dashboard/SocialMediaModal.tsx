import React, { ChangeEvent, useState } from "react"
import { Button, Form, Modal, Spinner } from "react-bootstrap"
import { FaGithub, FaHome, FaLinkedin, FaTwitch } from "react-icons/fa"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { updateUserProfile } from "./profileSlice"

interface Props {
  show: boolean
  handleClose: () => void
}

interface FormData {
  linkedin: string
  twitter: string
  github: string
  website: string
}

const SocialMediaModal = ({ show, handleClose }: Props) => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const { userProfile, isLoading } = useAppSelector((state) => state.profile)

  const initialFormData: FormData = {
    linkedin: userProfile?.social?.linkedin || "",
    twitter: userProfile?.social?.twitter || "",
    github: userProfile?.social?.github || "",
    website: userProfile?.social?.website || "",
  }
  const [formData, setFormData] = useState(initialFormData)

  const { linkedin, twitter, github, website } = formData

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSave = () => {
    const input = {
      profileData: {
        social: formData,
      },
      id: user._id,
    }
    dispatch(updateUserProfile(input))

    handleClose()
  }

  const spinnerButton = () => (
    <Button variant="primary" onClick={handleSave} disabled>
      <Spinner
        style={{ marginRight: 5 }}
        animation="border"
        as="span"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      Loading...
    </Button>
  )

  const button = () => (
    <Button variant="primary" onClick={handleSave}>
      Save
    </Button>
  )

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Social media links</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Linkedin</Form.Label>
              <FaLinkedin style={{ marginLeft: 5 }} />
              <Form.Control
                name="linkedin"
                value={linkedin}
                type="text"
                placeholder="Enter url..."
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Twitter</Form.Label>
              <FaTwitch style={{ marginLeft: 5 }} />
              <Form.Control
                name="twitter"
                value={twitter}
                type="text"
                placeholder="Enter url..."
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Github</Form.Label>
              <FaGithub style={{ marginLeft: 5 }} />
              <Form.Control
                name="github"
                value={github}
                type="text"
                placeholder="Enter url..."
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Website</Form.Label>
              <FaHome style={{ marginLeft: 5 }} />
              <Form.Control
                name="website"
                value={website}
                type="text"
                placeholder="Enter url..."
                onChange={onChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {isLoading ? spinnerButton() : button()}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SocialMediaModal
