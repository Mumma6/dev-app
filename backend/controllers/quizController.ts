import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

import Quiz, { IQuiz } from '../models/quizModel'

const getQuizzes = asyncHandler(async (req: Request, res: Response) => {
  const quizzes: IQuiz[] = await Quiz.find()

  res.status(200).send(quizzes)
})

const setQuiz = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Pleas add text field')
  }

  const quiz = await Quiz.create({
    text: req.body.text,
  })

  res.status(200).send(quiz)
})

const updateQuiz = asyncHandler(async (req: Request, res: Response) => {
  const quiz = await Quiz.findById(req.params.id)

  if (!quiz) {
    res.status(400)
    throw new Error('Qiz not found')
  }

  // New: true will create it if it dodsend exist
  const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true })

  res.status(200).send(updatedQuiz)
})

const deleteQuiz = asyncHandler(async (req: Request, res: Response) => {
  const quiz = await Quiz.findById(req.params.id)

  if (!quiz) {
    res.status(400)
    throw new Error('Qiz not found')
  }

  await quiz.remove()

  // for the frontend
  res.status(200).send({ id: req.params.id })
})

export { getQuizzes, setQuiz, updateQuiz, deleteQuiz }
