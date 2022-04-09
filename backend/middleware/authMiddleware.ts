/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response, NextFunction } from 'express'
import process from 'process'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel'
import jwt from 'jsonwebtoken'

const protect = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  let token

  console.log(req.headers.authorization)

  console.log(process.env)

  // to use this make sure to pass headers via axios config
  // also find out why procees.env is missing

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }

      // wont include password
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

export { protect }

// Använd denna func istället
/*

import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
const config = require('../config')

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = Array.isArray(req.headers['x-access-token'])
    ? req.headers['x-access-token'][0]
    : req.headers['x-access-token']

  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' })
  }

  jwt.verify(token, config.jwtSecret, (err: jwt.VerifyErrors | null) => {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' })
    }
  })
  next()
}

*/