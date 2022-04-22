export interface Social {
  github: string
  website: string
  linkedin: string
  twitter: string
}

interface User {
  _id: string
  name: string
  email: string
}

interface ExternalCourse {
  title: string
  link: string
  description: string
  completed: boolean
}

interface Link {
  order: number
  url: string
  title: string
}

export interface PlannedCourses {
  title: string
  description: string
  links: Link[]
}

export interface UserProfile {
  bio: string
  createdAt?: string
  externalCourses?: ExternalCourse[]
  plannedCourses?: PlannedCourses[]
  location: string
  lookingForJob: boolean
  skills: string[]
  social?: Social
  title: string
  updatedAt?: string
  user: User
  _id?: string
}
