const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
// 注意第二行設定和一般的引用不太一樣，需要再多傳入一個 Strategy 物件
const User = require('../models/user')

module.exports = (app) => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: 'That email is not registered!',
            })
          }
          if (user.password !== password) {
            return done(null, false, {
              message: 'Email or Password incorrect.',
            })
          }
          return done(null, user)
        })
        .catch((error) => done(error, false))
    })
  )
  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((error) => done(error, null))
  })
}
