const express = require('express')
const router = express.Router()
// 準備引入路由模組

const home = require('./modules/home')
const todos = require('./modules/todos')
const users = require('./modules/users')

router.use('/', home)
router.use('/todos', todos)
router.use('/users', users)

module.exports = router
// 匯出路由器
