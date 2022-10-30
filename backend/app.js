const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const ThoughtRoute = require('./routes/ThoughtRoute')

const app = express()

//middlewares
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

app.use(express.urlencoded({
  extended: true
}))

app.use(express.json())

//routes
app.use('/thoughts', ThoughtRoute)

//connect database
mongoose
  .connect('mongodb://localhost:27017/thoughts')
  .then(() => {
    app.listen(9000)
    console.log('Conectou ao banco!')
  })
  .catch((err) => {
    console.log(err)
  })

