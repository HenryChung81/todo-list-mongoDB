const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

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

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 在 app.engine 這一行我們只是在應用程式裡新增了一個叫 hbs 的樣板引擎，但要到 app.set 這一行，這個 hbs 元件才正式掛載到我們的主程式裡，開始啟用。

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
