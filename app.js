const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')
// 引入路由器時，路徑設定為 /routes 就會自動去尋找目錄下叫做 index 的檔案。

const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT

// 在本地預設使用 3000 port，但上傳之後，會由 Heroku 自動分配，Heroku 會把 port 的埠號放在環境參數 process.env.PORT 裡。

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// 在 app.engine 這一行我們只是在應用程式裡新增了一個叫 hbs 的樣板引擎，但要到 app.set 這一行，這個 hbs 元件才正式掛載到我們的主程式裡，開始啟用。

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

// 在這串設定中 secret，是最必要的選項。這個參數是 session 用來驗證 session id 的字串。這組字串由伺服器設定，不會洩露給客戶端。現在我們設定為 'ThisIsMySecret'，但你可以隨機輸入一個字串。

// 其他的選項屬於應用程式的微調：
// resave：當設定為 true 時，會在每一次與使用者互動後，強制把 session 更新到 session store 裡。
// saveUninitialized：強制將未初始化的 session 存回 session store。未初始化表示這個 session 是新的而且沒有被修改過，例如未登入的使用者的 session。
// 這兩個選項其實沒有設置也能正常運行，如果你把它註解起來的話，只是會在 server 上跳出一些提示訊息，建議你把它設定起來。

// 在認證機制裡，「簽章」用來防止資訊經過篡改，這組簽章把前面的 session id 和只有伺服器知道的的密鑰 (secret) 組合起來，經過演算法加密，形成一組無法逆向解開的亂數。

// 收到客戶端傳來的資訊時，伺服器會檢查簽章是否有效，如果簽章失效，就不會讓 request 存取網站內容。

app.use(bodyParser.urlencoded({ extended: true }))
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理

app.use(methodOverride('_method'))
// 引用的套件清單習慣放在文件最上方，而用 app.use 設定的工具要放在最靠近路由清單的上方，因為有用到 app 變數，所以當然一定要放在 const app = express() 之後

// 設定時我們傳入了一個參數 _method，這個是 method-override 幫我們設計的路由覆蓋機制，只要我們在網址上使用 query string (也就是 ?) 帶入這組指定字串，就可以把路由覆蓋掉

usePassport(app)

app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// 使用 app.use 代表這組 middleware 會作用於所有的路由，裡面我們設定了兩個本地變數：

// res.locals.isAuthenticated：把 req.isAuthenticated() 回傳的布林值，交接給 res 使用
// res.locals.user：把使用者資料交接給 res 使用

// req.user 是在反序列化的時候，取出的 user 資訊，之後會放在 req.user 裡以供後續使用

// res.locals：所有樣板都可以使用的變數
// res.locals 是 Express.js 幫我們開的一條捷徑，放在 res.locals 裡的資料，所有的 view 都可以存取。

// 之前做 CRUD 時，我們會按 MVC 的分工，每個功能都撈一次資料，然後再把資料傳給 view。但因為「登入的使用者」實在太常用到，直接放進 res.locals 是比較好的選擇。

app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`)
})
