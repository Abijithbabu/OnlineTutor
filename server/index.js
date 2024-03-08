const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const socket = require("socket.io");
const authRouter = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
dotenv.config()
const app = express()
app.use(cors({
  credentials: true,
  origin: [process.env.BASE_URL],
}));
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, ('./public'))))
app.use(express.urlencoded({ extended: false }))

app.use('/auth', authRouter)

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("DB Connetion Successfull")
}).catch((err) => console.log(err))

