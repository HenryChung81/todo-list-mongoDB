const express = require('express')
const router = express.Router()

const passport = require('passport')

router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['email', 'public_profile'],
  })
)

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })
)

// GET /auth/facebook 是向 Facebook 發出請求，帶入的參數 scope: ['email', 'public_profile'] 是我們向 Facebook 要求的資料。

// 而 GET /auth/facebook/callback 是 Facebook 把資料發回來的地方，這條路由其實和 POST /users/login 差不多，如果能用傳回來的資料順利登入，就放 request 進場，如果登入失敗，就再導向登入頁。

module.exports = router
