const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo') // 載入 Todo model

router.get('/', (req, res) => {
  Todo.find() // 取出 Todo model 裡的所有資料，現在沒有傳入任何參數，所以會撈出整份資料。
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'asc' })
    // sort() 是 Mongoose 提供的排序方法，裡面的參數 { _id: 'asc' } 代表「根據 _id 用升冪 (ascending) 排序」，反之，如果要降冪 (desscending) 排序，可以寫 'desc'。
    .then((todos) => res.render('index', { todos })) // 將資料傳給 index 樣板
    .catch((error) => console.error(error)) // 錯誤處理
})

module.exports = router

// 客戶端發出請求，例如：網址列輸入 http://localhost:3000 並按下 Enter；
// 伺服器收到請求，到路由清單裡查找與 GET / 對應的路由，執行該路由內的 controller 程式碼；
// 請求 Todo model 找出「所有資料」；
// Todo model 在 mongoose 的幫助下，向 MongoDB 資料庫發出 query 請求；
// MongoDB 資料庫回傳資料；
// Todo model 把資料送回給 controller；
// controller 把資料轉發給 View 引擎 (Handlebars)，要求渲染 index 頁面，並置入指定資料；
// View 引擎工作完成後，交回完整的 HTML 樣板；
// controller 把完整 HTML 樣板回傳給客戶端；

// 客戶端收到回應，瀏覽器刷新，輸出畫面！
