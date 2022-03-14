import express from 'express'
const users = express.Router()
import { registerUser, loginUser, getMe } from '../controllers/userControllers'
import { protect } from '../middleware/authMiddleware'

// Register user
users.post('/', registerUser)

users.post('/login', loginUser)

users.get('/me', protect, getMe)

export default users
