const express = require('express')
const router = express.Router()

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  // 檢查使用者是否已經註冊
  User.findOne({ email }).then((user) => {
    // 如果已經註冊：退回原本畫面
    // 用 email 參數查資料，所以要用 findOne 方法，而 findOne 方法指定的參數格式是物件，因此要寫成 User.findOne({ email })。
    if (user) {
      console.log('User already exists.')
      res.render('register', {
        name,
        email,
        password,
        confirmPassword,
      })
    } else {
      // 如果還沒註冊：寫入資料庫
      return User.create({
        name,
        email,
        password,
      })
        .then(() => res.redirect('/'))
        .catch((error) => console.error(error))
    }
  })
})

module.exports = router
