import { ListGroup, Card, Row, Col } from "react-bootstrap"
import { PlannedCourses } from "../../../Models/UserProfile"

const PlanningObjectCard = ({
  plannedCourses,
}: {
  plannedCourses: PlannedCourses[] | undefined
}) => {
  return (
    <Row style={{ marginTop: 20 }}>
      {plannedCourses?.map((course) => (
        <Col key={course.title}>
          <Card className="mb-2">
            <Card.Header>{course.title}</Card.Header>
            <Card.Body>
              <Card.Title>{course.description}</Card.Title>
              <ListGroup>
                {course.links
                  //.sort((a, b) => a.order - b.order) alla har inte order atm
                  .map((link) => (
                    <ListGroup.Item>
                      <p>{link.title}</p>
                      <a target="_blank" href={link.url} rel="noreferrer">
                        Go to
                      </a>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default PlanningObjectCard
