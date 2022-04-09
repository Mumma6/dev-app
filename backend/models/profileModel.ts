import mongoose from 'mongoose'

interface ExternalCourse {
  title: string,
  link: string,
  description: string,
}

export interface IProfile extends mongoose.Document {
  user: string
  skills: string[]
  bio: string
  lookingForJob: boolean,
  externalCourses: ExternalCourse[]
}

const profileSchema = new mongoose.Schema(
  {
    user: { // detta är egentligen user_id: string
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true
    },
    bio: {
      type: String
    },
    lookingForJob: {
      type: Boolean,
    },
    externalCourses: [
      {
        title: String,
        link: String,
        description: String,
      },
    ],
    // type. ska defaula till user?, admin, premium och recruiter.
  },
  {
    timestamps: true,
  }
)

const Profile = mongoose.model<IProfile>('Profile', profileSchema)

export default Profile

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
// Quiz är inte kopplat till en user, Däremot så kommer profile vara det.

/*

profile: {
  type: mongose.Schema.Types.ObjectId,
  required: true,
  ref: 'Profile', // name of the model.
}


*/
