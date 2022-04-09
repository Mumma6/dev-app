import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import authReducer from "../features/auth/authSlice"
import quizReducer from "../features/quiz/quizSlice"
import profileReducer from "../features/dashboard/profileSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    quiz: quizReducer,
    profile: profileReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
