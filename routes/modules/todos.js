const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

// 新增一筆 To-do
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const name = req.body.name // 從 req.body 拿出表裡單的 name 資料
  return Todo.create({ name }) // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch((error) => console.error(error))
})

// 瀏覽特定 To-do
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

// 修改特定 To-do
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch((error) => console.error(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  return Todo.findById(id)
    .then((todo) => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch((error) => console.error(error))
})

// Todo.create() v.s. todo.save()
// 之前在「新增資料」時，我們比較過 Todo.create() 和 todo.save()，前者是操作整份資料，後者是針對單一資料。

// 在「新增資料」時兩種作法都可以，而這次因為搭配的資料操作是 Todo.findById，這個方法只會返回一筆資料，所以後面需要接 todo.save() 針對這一筆資料進行儲存，而非操作整份資料。

// isDone === 'on'
// checkbox 的回傳值是由 HTML 規定的，在之前的「密碼產生器」專案裡，我們有講解過 checkbox 的使用方法，再提醒一下這裡和直覺想像的 true/false 不太一樣，：

// 如果 checkbox 有被打勾，它會被設定為 on。
// 如果 checkbox 沒有被「打勾」，則它不會帶任何值。

// 這裡看過去很直覺，裡面有一個關於運算子優先序的小知識，就像在數學的四則運算裡有先乘除後加減，JavaScript 裡邏輯運算子也會比普通的 = 優先執行。

// 刪除特定 To-do
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then((todo) => todo.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error))
})

module.exports = router
