const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb://localhost/todo-list3', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const port = 3000

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  res.send(`Hello Express!`)
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
