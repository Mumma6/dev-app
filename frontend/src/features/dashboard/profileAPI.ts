import axios from "axios"

const API_URL = "/api/profiles/"

interface ExternalCourse {
  title: string,
  link: string,
  description: string,
}


export interface ProfileData {
  skills: string[]
  bio: string
  lookingForJob: boolean,
  externalCourses: ExternalCourse[]
}



const getProfileForUser = async (id: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + id, config)

  console.log(response)
  return response.data
}

const createProfile = async (profileData: ProfileData) => {
  const response = await axios.post(API_URL, profileData)

  return response.data
}


const profileAPI = {
  getProfileForUser,
  createProfile,
}

export default profileAPI