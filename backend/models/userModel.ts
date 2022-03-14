import mongoose from 'mongoose'

export interface IUser extends mongoose.Document {
  name: string
  email: string
  password: string
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add a email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    // type. ska defaula till user?, admin, premium och recruiter.
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model<IUser>('User', userSchema)

export default User

// Kolla dokumentation för detta.
// Detta ska vara en profileModel, https://github.com/Mumma6/pt-portalen/blob/master/models/Profile.js
/*
_id: ObjectId
email: string
name: string
role: string, egen roll för Rekruterare t ex som kan posta jobbannonser och kolla på profiler.
created_at: date,
upated_at: date,
premium_user: boolean,
blogPosts: Blog[],
activeCourses: Course[],
passedTest: Test[]
skills: String[]
lookingForJob: boolean,
externalLinks: String[], t ex linkedin.


*/
