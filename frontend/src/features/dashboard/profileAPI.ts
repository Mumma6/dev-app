import axios from "axios"
import { UserProfile } from "../../Models/UserProfile"

const API_URL = "/api/profiles/"

const getProfileForUser = async (id: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + id, config)

  return response.data
}

const createProfile = async (profileData: UserProfile) => {
  const response = await axios.post(API_URL + "create", profileData)
  return response.data
}

interface UpdateData {
  id: string
  profileData?: UserProfile
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
