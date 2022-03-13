import express from "express"
const quiz = express.Router()
import { getQuizzes, setQuiz, updateQuiz, deleteQuiz } from '../controllers/quizController'

quiz.get('/', getQuizzes)

quiz.post('/', setQuiz)

quiz.put('/:id', updateQuiz)

quiz.delete('/:id', deleteQuiz)

export default quiz