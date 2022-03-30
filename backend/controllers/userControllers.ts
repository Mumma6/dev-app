import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import User, { IUser } from '../models/userModel'
import jwt from 'jsonwebtoken'

// Utils funktion
const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}
const comparePassword = async (password: string, userPassword: string) =>
  await bcrypt.compare(password, userPassword)

// generate jwt
const secret = 'abc123'
const generateToken = (id: string) =>
  jwt.sign({ id }, process.env.JWT_SECRET || secret, {
    expiresIn: '30d',
  })

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User aldready exists')
  }

  // hash pw
  const hashedPassword = await hashPassword(password)

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid userdata')
  }
})

// @desc Authenticate a user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body

  // check for user email
  const user = await User.findOne({ email })

  console.log(user)

  // check password
  if (user && (await comparePassword(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc Get user date
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req: any, res: Response) => {
  const { _id, name, email }: IUser = await User.findById(req.user.id) as IUser

  res.status(200).json({
    id: _id,
    name,
    email,
  })
})

export { registerUser, loginUser, getMe }
