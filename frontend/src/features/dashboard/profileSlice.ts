import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import profileAPI, { ProfileData } from "./profileAPI"

const initialState = {
  userProfile: undefined,
  profiles: [],
  isLoading: false,
  errorMsg: "",
}

export const getUserProfile = createAsyncThunk(
  "profile/get",
  async (id: string, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await profileAPI.getProfileForUser(id, token)
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      // this is rejected
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const createUserProfile = createAsyncThunk(
  "profile/create",
  async (data: ProfileData, thunkAPI) => {
    try {
      return await profileAPI.createProfile(data)
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      // this is rejected
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.userProfile = action.payload
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false
        state.errorMsg = action.payload as string
      })
      .addCase(createUserProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.userProfile = action.payload
      })
      .addCase(createUserProfile.rejected, (state, action) => {
        state.isLoading = false
        state.errorMsg = action.payload as string
      })
  },
})

export default profileSlice.reducer