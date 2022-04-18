import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import mongoose from "mongoose"

import Profile, { IProfile } from "../models/profileModel"
import User, { IUser } from "../models/userModel"

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
// frontend will take care of if its the users own profile (dashboard) or another profile.

// or make a getMe controller https://github.com/Mumma6/pt-portalen/blob/master/routes/api/profile.js
const getProfile = asyncHandler(async (req: any, res: Response) => {
  const profile = await Profile.findOne({ "user._id": req.params.id })

  res.status(200).json(profile)
})

// @route  POST api/profiles
// @desc   Create user profile
// @access Private
const setProfile = asyncHandler(async (req: Request, res: any) => {
  // sätt namn från user objecetet
  // uppdatera profile att innehålla namn

  console.log(req.body)

  const profile: IProfile = await Profile.create({
    skills: req.body.skills,
    user: req.body.user,
    bio: req.body.bio,
    lookingForJob: req.body.lookingForJob,
    externalCourses: req.body.externalCourses,
    title: req.body.title,
    location: req.body.location,
    social: req.body.social,
  })

  console.log(profile, "from backend")
  res.status(200).json(profile)
})

// @desc    Update profile
// @route   PUT api/profiles/:id
// @access  Private
const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const profile = await Profile.findOne({ "user._id": req.params.id })

  if (!profile) {
    res.status(400)
    throw new Error("profile not found")
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

  console.log("before", profile)

  const updatedProfile = await Profile.findByIdAndUpdate(
    profile._id,
    req.body,
    {
      new: true,
    }
  )

  console.log("after,", updatedProfile)

  console.log(req.body)

  res.status(200).json(updatedProfile)
})

// @desc    Delete profile
// @route   DELETE api/profiles/:id
// @access  Private
const deleteProfile = asyncHandler(async (req: any, res: Response) => {
  const profile = await Profile.findOne({ "user._id": req.params.id })

  if (!profile) {
    res.status(400)
    throw new Error("Goal not found")
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error("User not found")
  }

  // Make sure the logged in user matches the goal user
  if (profile.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  await Profile.remove()

  res.status(200).json({ id: req.params.id })
})

export { getProfile, getProfiles, updateProfile, setProfile, deleteProfile }
