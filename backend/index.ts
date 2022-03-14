import express, { Application, Request, Response } from "express"
import quiz from "./routes/quizRoutes"
import user from './routes/userRoutes'
import profile from './routes/profileRoutes'
import { errorHandler } from './middleware/errorMiddleware'

import { connectDB } from './config/db'
// eslint-disable-next-line @typescript-eslint/no-var-requires
import 'dotenv/config'

connectDB()

const app: Application = express()
const port = process.env.PORT || 5000

// Body parsing Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/quiz', quiz)
app.use('/api/users', user)
app.use('/api/profiles', profile)


app.use(errorHandler)

app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: "Hello World!",
  })
})


try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`)
  })
} catch (error: any) {
  console.error(`Error occured: ${error.message}`)
}
