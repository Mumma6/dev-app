import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

import Profile, { IProfile } from '../models/profileModel'

// @desc Get all profiles
// @route GET /api/profiles
// @access public
const getProfiles = asyncHandler(async (req: Request, res: Response) => {
  const profiles: IProfile[] = await Profile.find()

  res.status(200).send(profiles)
})

// @route  GET api/profiles/me
// @desc   Get current user profile
// @access Private
const getProfile = asyncHandler(async (req: any, res: Response) => {
  const profile = await Profile.findOne({ user: req.user.id })

  if (!profile) {
    res.status(400).json({ msg: 'There is no profile for this user' })
  }

  res.status(200).json(profile)
})

// @route  POST api/profiles
// @desc   Create user profile
// @access Private
const setProfile = asyncHandler(async (req: any, res: any) => {
  const profile: IProfile = await Profile.create({
    skills: req.body.skills,
    user: req.user.id,
    bio: req.body.bio,
    lookingForJob: req.body.lookingForJob,
  })

  res.status(200).json(profile)
})

// @desc    Update profile
// @route   PUT api/profiles/:id
// @access  Private
const updateProfile = asyncHandler(async (req: any, res: Response) => {
  const profile = await Profile.findById(req.params.id)

  if (!profile) {
    res.status(400)
    throw new Error('profile not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (profile.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedGoal = await Profile.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedGoal)
})

// @desc    Delete profile
// @route   DELETE api/profiles/:id
// @access  Private
const deleteProfile = asyncHandler(async (req: any, res: Response) => {
  const profile = await Profile.findById(req.params.id)

  if (!profile) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (profile.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await Profile.remove()

  res.status(200).json({ id: req.params.id })
})

export { getProfile, getProfiles, updateProfile, setProfile, deleteProfile }
