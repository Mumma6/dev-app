import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getQuiz } from "./quizSlice"
import { useParams } from "react-router-dom"
import LinkButton from "../../components/LinkButton"
import { Spinner } from "react-bootstrap"

const CurrentQuiz = () => {
  const dispatch = useAppDispatch()
  const { status, currentQuiz } = useAppSelector((state) => state.quiz)
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      dispatch(getQuiz(id))
    }
  }, [dispatch, id])

  return (
    <>
      <LinkButton
        url={"quiz"}
        text="go back"
        customStyles={{ marginBottom: 10 }}
        props={{ size: 'sm' }}
      />
      <div>
        {status === "loading" ? (
          <Spinner animation="border" />
        ) : (
          <h3>{currentQuiz?.description}</h3>
        )}
      </div>
    </>
  )
}

export default CurrentQuiz
