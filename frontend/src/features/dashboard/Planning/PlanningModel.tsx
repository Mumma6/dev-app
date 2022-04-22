import { useState } from "react"
import { Button, Form, Modal, Spinner } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { useForm } from "../../../customHooks/useForm"
import { UserProfile } from "../../../Models/UserProfile"
import { updateUserProfile } from "../profileSlice"

interface Props {
  show: boolean
  handleClose: () => void
}

interface Link {
  order: number
  url: string
  title: string
}

interface State {
  title: string
  description: string
}

const PlanningModel = ({ show, handleClose }: Props) => {
  const [links, setLinks] = useState<Link[]>([])
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const { userProfile } = useAppSelector((state) => state.profile)

  const initialState: State = {
    title: "",
    description: "",
  }

  const initialLinkState: Link = {
    order: 0,
    url: "",
    title: "",
  }

  const { formData, onChange, resetForm } = useForm(initialState)

  const {
    formData: linkFormData,
    onChange: linkOnChange,
    resetForm: linkResetForm,
  } = useForm(initialLinkState)

  const { title, description } = formData

  const { order, url, title: linkTitle } = linkFormData

  const handleSave = () => {
    const plannedCourse = {
      ...formData,
      links,
    }

    const input = {
      profileData: {
        plannedCourses: [...(userProfile?.plannedCourses || []), plannedCourse],
      },
      id: user._id,
    }
    console.log("to dispatch", input)
    dispatch(updateUserProfile(input))
    resetForm()
    handleClose()
  }

  const handleLinks = () => {
    setLinks(() => [...links, linkFormData])

    linkResetForm()
  }

  const button = () => (
    <Button variant="success" onClick={handleSave}>
      Save
    </Button>
  )

  const addLinkUrlButton = () => (
    <Button
      style={{ margin: 10 }}
      size="sm"
      variant="info"
      onClick={handleLinks}
    >
      Add link
    </Button>
  )

  const closeModal = () => {
    handleClose()
    setLinks([])
    linkResetForm()
    resetForm()
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create new study path</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                value={title}
                type="text"
                placeholder="Title"
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                value={description}
                type="text"
                placeholder="Add description"
                onChange={onChange}
              />
            </Form.Group>

            <div>
              <h5>Links</h5>
              {links.map((link) => (
                <p>{link.title}</p>
              ))}
            </div>

            <div>
              <h5>Add links here</h5>

              <Form.Group className="mb-3">
                <Form.Label>Url</Form.Label>
                <Form.Control
                  name="url"
                  value={url}
                  type="text"
                  placeholder="Add url"
                  onChange={linkOnChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  value={linkFormData.title}
                  type="text"
                  placeholder="Add title"
                  onChange={linkOnChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Order</Form.Label>
                <Form.Control
                  name="order"
                  value={order}
                  type="number"
                  placeholder="Add order"
                  onChange={linkOnChange}
                />
              </Form.Group>
              {addLinkUrlButton()}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          {button()}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default PlanningModel
