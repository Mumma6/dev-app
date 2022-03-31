import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getQuiz } from "./quizSlice"
import { useParams } from "react-router-dom"
import LinkButton from "../../components/LinkButton"
import { Spinner, Button, Container } from "react-bootstrap"
import QuestionItem from "./QuestionItem"

const CurrentQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isChecked, setIsChecked] = useState(false)
  const [questionQuessValue, setQuestionQuessValue] = useState("")
  const dispatch = useAppDispatch()
  const [done, setIsDone] = useState(false)
  const [points, setPoints] = useState(0)
  const { status, currentQuiz } = useAppSelector((state) => state.quiz)
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      dispatch(getQuiz(id))
    }
  }, [dispatch, id])

  const showScore = () => {
    alert("Du fick: " + points + " rätt")
  }

  useEffect(() => {
    if (done) {
      showScore()
    }
  }, [done])

  const reset = () => {
    setIsChecked(false)
    setQuestionQuessValue("")
  }

  const handleQuestionClick = (e: any) => {
    setQuestionQuessValue(e.target.checked ? e.target.value : "")
    setIsChecked(e.target.checked)
  }

  const handleQuestionSubmit = () => {
    const currentQuestionCorrectAnwser =
      currentQuiz?.questions[currentQuestion].answer

    if (questionQuessValue === currentQuestionCorrectAnwser) {
      setPoints((p) => p + 1)
      console.log(points)
    }

    if (currentQuestion + 1 !== currentQuiz?.questions?.length!) {
      setCurrentQuestion(currentQuestion + 1)
    }

    if (currentQuestion + 1 === currentQuiz?.questions?.length!) {
      setIsDone(true)
    }
    reset()
  }

  return (
    <>
      <LinkButton
        url={"quiz"}
        text="go back"
        customStyles={{ marginBottom: 10 }}
        props={{ size: "sm" }}
      />
      <div>
        {status === "loading" ? (
          <Spinner animation="border" />
        ) : (
          <Container
            style={{
              marginTop: 40,
              backgroundColor: "white",
              paddingBottom: 55,
            }}
          >
            <h3>{currentQuiz?.description}</h3>

            <h5>Fråga {currentQuestion + 1}</h5>
            <h1>{currentQuiz?.questions[currentQuestion].title}</h1>
            <QuestionItem
              question={currentQuiz?.questions[currentQuestion]}
              isChecked={isChecked}
              handleQuestionClick={handleQuestionClick}
              questionQuessValue={questionQuessValue}
            />
            <Button
              onClick={() => handleQuestionSubmit()}
              variant="success"
              disabled={!isChecked}
              style={{ float: "right" }}
            >
              Svara
            </Button>
          </Container>
        )}
      </div>
    </>
  )
}

export default CurrentQuiz
