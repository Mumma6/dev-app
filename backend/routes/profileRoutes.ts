import express from 'express'
const profiles = express.Router()
import { setProfile, getProfile, getProfiles, updateProfile, deleteProfile } from '../controllers/profileController'
import { protect } from '../middleware/authMiddleware'

// Register user
profiles.get('/', getProfiles)

profiles.get('/:id', protect, getProfile)

profiles.post('/', protect, setProfile)

profiles.put('/:id', protect, updateProfile)

profiles.delete('/:id', protect, deleteProfile)

export default profiles
