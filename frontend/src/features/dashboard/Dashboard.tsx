import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getUserProfile } from "./profileSlice"
import DashboardCreateForm from "./DashboardCreateForm"
import DashboardProfilePage from "./DashboardProfilePage"

const Dashboard = () => {
  const dispatch = useAppDispatch()

  const { userProfile, isLoading } = useAppSelector((state) => state.profile)
  const { user } = useAppSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getUserProfile(user?._id || ''))
  }, [dispatch, user?._id])

  if (isLoading && !userProfile) {
    return <p>laddar</p>
  }

  return (
    <>
      {!userProfile ? (
        <DashboardCreateForm />
      ) : (
        <DashboardProfilePage userProfile={userProfile} />
      )}
    </>
  )
}

export default Dashboard
