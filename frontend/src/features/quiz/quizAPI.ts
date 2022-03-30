import axios from "axios"

const API_URL = "/api/quiz/"

const getAll = async () => {
  const response = await axios.get(API_URL)

  return response.data
}

const getQuiz = async (id: string) => {
  const response = await axios.get(API_URL + id)

  return response.data
}

const quizAPI = {
  getAll,
  getQuiz,
}

export default quizAPI
