import axios from "axios";

const API_URL = '/api/users/'

interface User {
  name: string
  email: string
  password: string
}

// Register user
const register = async (userData: User) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data as User
}

const logout = () => {
  localStorage.removeItem('user')
}

const login = async (userData: { email: string, password: string }) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data as User
}


const authAPI = {
  register,
  logout,
  login,
}

export default authAPI