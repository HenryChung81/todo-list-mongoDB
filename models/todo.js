const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  userId: {
    // 加入關聯設定
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true,
  },
})

// type 和 ref 這兩個設定是一起的：
// type：定義 userId 這個項目是一個 ObjectId，也就是它會連向另一個資料物件
// ref：定義參考對象是 User model
// 說的白話一點，這組設定代表「去參照 User 的 ObjectId」。這是Mongoose 提供的 Populate 功能，讓我們能建立不同 collections 之間的關聯。

// 資料索引 index
// 這裡可以用 index: true 把 userId 設定成「索引」，當我們常常用某個欄位來查找資料時，可以考慮把欄位設成索引，使用索引來查詢資料能夠增加讀取效能。

module.exports = mongoose.model('Todo', todoSchema)
