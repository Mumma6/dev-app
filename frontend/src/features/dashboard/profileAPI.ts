import axios from "axios"

const API_URL = "/api/profiles/"

interface ExternalCourse {
  title: string
  link: string
  description: string
}

export interface User {
  _id: string
  name: string
  email: string
}

export interface ProfileData {
  skills: string[]
  bio: string
  lookingForJob: boolean
  externalCourses?: ExternalCourse[]
  user: User
  title: string
  location: string
  social?: {
    linkedin: string
    twitter: string
    github: string
    website: string
  }
}

const getProfileForUser = async (id: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + id, config)

  return response.data
}

const createProfile = async (profileData: ProfileData) => {
  const response = await axios.post(API_URL + "create", profileData)
  return response.data
}

interface UpdateData {
  id: string
  profileData?: ProfileData
}

const updateProfile = async (data: UpdateData) => {
  const { id, profileData } = data
  const response = await axios.put(API_URL + id, profileData)

  return response.data
}

const profileAPI = {
  getProfileForUser,
  createProfile,
  updateProfile,
}

export default profileAPI
