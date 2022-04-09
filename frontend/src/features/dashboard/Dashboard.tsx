import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getUserProfile } from './profileSlice'

const Dashboard = () => {
  const dispatch = useAppDispatch()

  const { userProfile } = useAppSelector((state) => state.profile)
  const { user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getUserProfile(user._id))
  }, [dispatch, user._id])

  console.log(userProfile)
  return (
    <div>Dashboard ska in under features</div>
  )
}

export default Dashboard