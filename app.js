const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')
// 引入路由器時，路徑設定為 /routes 就會自動去尋找目錄下叫做 index 的檔案。
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000

// 在本地預設使用 3000 port，但上傳之後，會由 Heroku 自動分配，Heroku 會把 port 的埠號放在環境參數 process.env.PORT 裡。

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// 在 app.engine 這一行我們只是在應用程式裡新增了一個叫 hbs 的樣板引擎，但要到 app.set 這一行，這個 hbs 元件才正式掛載到我們的主程式裡，開始啟用。

app.use(bodyParser.urlencoded({ extended: true }))
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理

app.use(methodOverride('_method'))
// 引用的套件清單習慣放在文件最上方，而用 app.use 設定的工具要放在最靠近路由清單的上方，因為有用到 app 變數，所以當然一定要放在 const app = express() 之後

// 設定時我們傳入了一個參數 _method，這個是 method-override 幫我們設計的路由覆蓋機制，只要我們在網址上使用 query string (也就是 ?) 帶入這組指定字串，就可以把路由覆蓋掉
app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`)
})
