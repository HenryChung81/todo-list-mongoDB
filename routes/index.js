const express = require('express')
const router = express.Router()
// 準備引入路由模組

const home = require('./modules/home')
const todos = require('./modules/todos')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')

router.use('/todos', authenticator, todos)
router.use('/users', users)
router.use('/', authenticator, home)

module.exports = router
// 匯出路由器
