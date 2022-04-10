import express from 'express'
const users = express.Router()
import { registerUser, loginUser } from '../controllers/userControllers'
import { protect } from '../middleware/authMiddleware'

// Register user
users.post('/', registerUser)

users.post('/login', loginUser)

export default users
