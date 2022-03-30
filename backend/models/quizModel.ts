import mongoose from "mongoose";

export interface IQuiz extends mongoose.Document {
  description: string;
  difficulty: number,
  questions: any,
}

const quizSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: Number,
      required: true,
    },
    questions: [
      {
        title: String,
        answer: String,
        options: [String],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model<IQuiz>("Quiz", quizSchema);

export default Quiz;

// Quiz är inte kopplat till en user, Däremot så kommer profile vara det.

/*

profile: {
  type: mongose.Schema.Types.ObjectId,
  required: true,
  ref: 'Profile', // name of the model.
}


*/
