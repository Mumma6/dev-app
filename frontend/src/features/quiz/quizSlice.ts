import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import quizAPI from "./quizAPI"

interface Question {
  title: string
  answer: string
  options: string[]
}

export interface Quiz {
  description: string
  difficulty: number
  questions: Question[]
  status: string
  _id: string,
}

export interface QuizState {
  status: string
  quizzes: Quiz[]
  currentQuiz: Quiz | undefined
}

const initialState: QuizState = {
  status: "",
  quizzes: [],
  currentQuiz: undefined,
}

export const getAllQuiz = createAsyncThunk("quiz/getAll", async () => {
  return await quizAPI.getAll()
})

export const getQuiz = createAsyncThunk("quiz/get", async (id: string) => {
  return await quizAPI.getQuiz(id)
})

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    reset: (state) => {
      state.quizzes = []
      state.status = ""
      state.currentQuiz = undefined
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllQuiz.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getAllQuiz.fulfilled, (state, action) => {
        state.status = "idle"
        state.quizzes = action.payload
        state.currentQuiz = undefined
      })
      .addCase(getQuiz.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getQuiz.fulfilled, (state, action) => {
        state.status = "idle"
        state.currentQuiz = action.payload
      })
  },
})

export const { reset } = quizSlice.actions
export default quizSlice.reducer
