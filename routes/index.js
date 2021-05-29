const express = require('express')
const router = express.Router()
// 準備引入路由模組

const home = require('./modules/home')
// 將網址結構符合 / 字串的 request 導向 home 模組

router.use('/', home)

module.exports = router
// 匯出路由器
