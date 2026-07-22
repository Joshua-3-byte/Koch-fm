import cors from "cors";
import dotenv from 'dotenv'
dotenv.config()
import path from 'path'

import express from 'express'
import connectDB from './config/db.js'
import authRoute from './routes/authRoute.js'
import cookieParser from 'cookie-parser'
import newsRoute from './routes/newsRoute.js'
import presentersRoute from './routes/presentersRoute.js'
import shows from './routes/showsRoute.js'

const app = express()

// ✅ Correct way to increase payload limit
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cookieParser())

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://koch-fm-2.onrender.com",
    ],
    credentials: true,
  })
);

app.use('/api/auth/admin', authRoute)
app.use('/api/news', newsRoute)
app.use('/api/presenters', presentersRoute)
app.use('/api/shows', shows)

const PORT = process.env.PORT || 5001

const __dirname = path.resolve()



connectDB().then(() => {
app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`)
})
})