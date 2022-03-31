import React, { useState } from "react"
import { Container, Form } from "react-bootstrap"
import { Question } from "./quizSlice"

interface Props {
  question: Question | undefined
  isChecked: boolean
  handleQuestionClick: (e: any) => void
  questionQuessValue: string
}

const QuestionItem = ({
  question,
  isChecked,
  handleQuestionClick,
  questionQuessValue,
}: Props) => {
  return (
      <Form>
        {question?.options.map((option, i) => (
          <Form.Check key={question._id + option} type={"checkbox"}>
            <Form.Check.Input
              value={option}
              disabled={isChecked && questionQuessValue !== option}
              type={"checkbox"}
              defaultChecked={false}
              onClick={(e: any) => {
                handleQuestionClick(e)
              }}
            />
            <Form.Check.Label>{option}</Form.Check.Label>
          </Form.Check>
        ))}
      </Form>
  )
}

export default QuestionItem
