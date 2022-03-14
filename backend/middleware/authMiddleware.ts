import { Request, Response, NextFunction } from 'express'
import process from 'process'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel'
import jwt from 'jsonwebtoken'

const protect = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  let token

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
