import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'

import Profile, { IProfile } from '../models/profileModel'
import User, { IUser } from '../models/userModel'

interface UserResquest extends Request { // varför funkar inte detta med asynchandler
  user: any
}

// @desc Get all profiles
// @route GET /api/profiles
// @access public
const getProfiles = asyncHandler(async (req: Request, res: Response) => {
  const profiles: IProfile[] = await Profile.find()
  res.status(200).send(profiles)
})

// @route  GET api/profiles/id
// @desc   Get current user profile
// @access Private
const getProfile = asyncHandler(async (req: any, res: Response) => {
  const profile = await Profile.findOne({ user: req.params.id })


  res.status(200).json(profile)
})

// @route  POST api/profiles
// @desc   Create user profile
// @access Private
const setProfile = asyncHandler(async (req: any, res: any) => {
  const user = User.findOne({ _id: new mongoose.Types.ObjectId(req.body.user) })

  // sätt namn från user objecetet
  // uppdatera profile att innehålla namn

  const profile: IProfile = await Profile.create({
    skills: req.body.skills,
    user: req.body.user,
    bio: req.body.bio,
    lookingForJob: req.body.lookingForJob,
    externalCourses: req.body.externalCourses
  })

  console.log(profile)
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

  /*
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
  */

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
