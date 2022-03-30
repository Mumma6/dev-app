import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import QuizList from "./QuizList"
import { getAllQuiz } from "./quizSlice"

const Quiz = () => {
  const dispatch = useAppDispatch()
  const { status, quizzes } = useAppSelector((state) => state.quiz)

  useEffect(() => {
    dispatch(getAllQuiz())
  }, [dispatch])

  if (status === "pending") {
    <p>laddar quiz...</p>
  }
  return (
    <>
      <h2>Välj ett test</h2>
      <QuizList quizzes={quizzes} />
    </>
  )
}

export default Quiz
