import mongoose from 'mongoose'

const mongoUri = 'mongodb+srv://martin123:martin123@cluster0.hbbdu.mongodb.net/devapp?retryWrites=true&w=majority'
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI || mongoUri)

    console.log(`MongoDB Connect to: ${connect.connection.host}`)
  } catch (error) {
    console.log(error)

    process.exit(1)
  }
}


export { connectDB }