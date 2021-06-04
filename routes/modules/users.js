const express = require('express')
const router = express.Router()

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {})

// 第一次登入的時候，伺服器會建立一個 session，並且把 session id 交給客戶端，而客戶端要把這個 session id 保存到瀏覽器的 cookie 裡。

// 之後當同一個瀏覽器發送請求時，只要附上同一組 session id，伺服器就會判斷「這個 request 來自一個登入過的使用者」，因此這個瀏覽器就可以使用授權的服務內容。

// 同理，所謂的登出，就是把這個 session id 消滅掉，結束這一回合的會話 (session)。下次再進入網站時，又需要重新登入、建立新的 session。

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
