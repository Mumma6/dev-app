import React from "react"
import { Card, Row, Col } from "react-bootstrap"
import LinkButton from "../../components/LinkButton"
import { Quiz } from "./quizSlice"

interface Props {
  quizzes: Quiz[]
}
const QuizList = ({ quizzes }: Props) => {
  return (
    <>
      <Row>
        {quizzes.map((quiz) => (
          <Col key={quiz.description}>
            <Card className="mb-2">
              <Card.Header>Header quiz.title här</Card.Header>
              <Card.Body>
                <Card.Title>Beskrivning</Card.Title>
                <Card.Text>{quiz.description}</Card.Text>
                <Card.Text>Svårighet: {quiz.difficulty}</Card.Text>
              </Card.Body>
              <LinkButton url={"quiz/" + quiz._id} text="Take test" />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default QuizList
