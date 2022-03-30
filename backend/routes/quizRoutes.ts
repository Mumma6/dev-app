import express from "express"
const quiz = express.Router()
import { getQuizzes, setQuiz, updateQuiz, deleteQuiz, getQuiz } from '../controllers/quizController'

quiz.get('/', getQuizzes)

quiz.post('/', setQuiz)

quiz.put('/:id', updateQuiz)

quiz.delete('/:id', deleteQuiz)

quiz.get('/:id', getQuiz)

export default quiz