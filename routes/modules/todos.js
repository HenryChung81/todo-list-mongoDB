const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const name = req.body.name // 從 req.body 拿出表裡單的 name 資料
  return Todo.create({ name }) // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch((error) => console.error(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch((error) => console.error(error))
})

// :id
// 在路由網址如果用了冒號 :，表示這是一個動態參數，可以用 req.params 取出，這裡我們設定 :id，所以就用 req.params.id 拿到資料。

// 這裡因為每一筆 todo 的識別碼都是不一樣的，所以伺服器需要在瀏覽器發送請求時，把 id 從請求網址上截取下來，知道了每筆資料的 id 以後，伺服器才能拿著這個 id 去資料庫裡找資料。

// Todo.findById
// 這次我們要查詢特定一筆 todo 資料，所以我們的 controller 不是用 Todo.find，而是用 Todo.findById——findById 的直接翻譯就是「以 id 去尋找」。

// .lean()
// 這裡撈出來的資料也需要傳給樣板使用，所以要用 lean() 把資料整理乾淨。別忘了我們的口訣：「撈資料以後想用 res.render()，就要先用 .lean()」。

// .then()
// 到 .then() 這段拿到資料了，資料會被存在 todo 變數裡，傳給樣板引擎，請 Handlebars 幫忙組裝 detail 頁面。

module.exports = router
