import { Button, Form, Modal, Spinner } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { useForm } from '../../../customHooks/useForm'
import { UserProfile } from '../../../Models/UserProfile'
import { updateUserProfile } from '../profileSlice'

interface Props {
  show: boolean
  handleClose: () => void
}

const AddCourseModal = ({ show, handleClose }: Props) => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const { userProfile } = useAppSelector((state) => state.profile)
  const initialState = {
    title: '',
    description: '',
    link: '',
    completed: true,
  }

  const { formData, onChange, resetForm, onCheckboxChange } = useForm(initialState)

  const { title, description, link } = formData

  const handleSave = () => {
    const input = {
      profileData: {
        externalCourses: [...(userProfile?.externalCourses || []), formData],
      },
      id: user._id,
    }
    dispatch(updateUserProfile(input))
    resetForm()
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

            <Form.Group className="mb-3">
              <Form.Label>Link</Form.Label>
              <Form.Control
                name="link"
                value={link}
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
          {button()}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddCourseModal
