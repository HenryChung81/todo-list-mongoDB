const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// 直接呼叫 Date.now()，會回傳一組時間戳記 (timestamp)，所謂的時間戳記是從標準時間 1970 年 1 月 1 日開始累積的秒數。電腦只需要一串數字就好了，如果要轉換成人類看得懂的格式，則可以使用 Date()

// Date.now() v.s.Date.now
// 沒加括號時，代表你傳入的是函式本身，而加了括號的話，代表你直接呼叫了這個函式，並傳入函式的回傳值。

module.exports = mongoose.model('User', userSchema)
