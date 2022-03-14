import mongoose from 'mongoose'

export interface IQuiz extends mongoose.Document {
  text: string
}

const quizSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Quiz = mongoose.model<IQuiz>('Quiz', quizSchema)

export default Quiz


// Quiz är inte kopplat till en user, Däremot så kommer profile vara det.

/*

profile: {
  type: mongose.Schema.Types.ObjectId,
  required: true,
  ref: 'Profile', // name of the model.
}


*/