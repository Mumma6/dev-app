import express from 'express'
const profiles = express.Router()
import { setProfile, getProfile, getProfiles, updateProfile, deleteProfile } from '../controllers/profileController'
import { protect } from '../middleware/authMiddleware'

// Register user
profiles.get('/', getProfiles)

profiles.get('/:id', getProfile)

profiles.post('/create', setProfile)

profiles.put('/:id', updateProfile)

profiles.delete('/:id', deleteProfile)

export default profiles
