import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

const getQuizzes = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).send({ message: 'Get all quizzes' })
})

const setQuiz = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).send({ message: 'Set quiz' })
})

const updateQuiz = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).send({ message: `Update ${req.params.id}` })
})

const deleteQuiz = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).send({ message: `Update ${req.params.id}` })
})

export { getQuizzes, setQuiz, updateQuiz, deleteQuiz }
