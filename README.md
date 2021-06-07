# TodoList

一個使用 Node.js + Express 打造的 todo list，並透過 mongodb 資料庫取得資料。
可以註冊帳號，並使用帳號登入。
可以在首頁看到所有 todo list 的簡單資料，可以點擊觀看 todo list 的詳細資訊。可以自行 todo，或是修改 todo 內容。

## 專案畫面

首頁
![image](https://henryawsbucket881.s3-ap-northeast-1.amazonaws.com/%E6%88%AA%E5%9C%96+2021-06-07+08.39.46.png)

登入頁
![image](https://henryawsbucket881.s3-ap-northeast-1.amazonaws.com/%E6%88%AA%E5%9C%96+2021-06-07+08.31.23.png)

註冊頁
![image](https://henryawsbucket881.s3-ap-northeast-1.amazonaws.com/%E6%88%AA%E5%9C%96+2021-06-07+08.30.20.png)

編輯特定 todo
![image](https://henryawsbucket881.s3-ap-northeast-1.amazonaws.com/%E6%88%AA%E5%9C%96+2021-06-07+09.06.26.png)

查看詳細 todo 資訊
![image](https://henryawsbucket881.s3-ap-northeast-1.amazonaws.com/%E6%88%AA%E5%9C%96+2021-06-07+09.07.04.png)

## Features - 產品功能

1. 使用者可以點擊任一 todo，查看更多 todo 資訊。
2. 使用者可以瀏覽一筆 todo 的詳細資訊。
3. 使用者可以修改一筆 todo 的詳細資訊。
4. 使用者可以新增一筆 todo。
5. 使用者可以註冊新帳號。
6. 使用者可以透過註冊的帳號密碼登入。
7. 使用者可以透過 Facebook 登入。

## Environment SetUp - 環境建置

1. [MongoDB v4.0 以上](https://www.mongodb.com/download-center/community)
2. [Node.js](https://nodejs.org/en/)

## Installing - 專案安裝流程

1. 打開你的 terminal，Clone 此專案至本機電腦

```
git clone https://github.com/HenryChung81/todo-list-mongoDB.git
```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
cd
```

3. 安裝 npm 套件

```
在 Terminal 輸入 npm install 指令
```

4. 安裝 nodemon 套件

```
在 Terminal 輸入 nodemon app.js 指令
```

5. 匯入種子檔案

```
在 Terminal 輸入 npm run seed 指令

```

當 terminal 出現以下字樣，即表示種子資料已新增至資料庫。

```
mongodb is connected!
```

6. 啟動伺服器，執行 app.js 檔案

```
nodemon app.js
```

7. 當 terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結

```
Express is running on http://localhost:3000
```

8. 可使用種子資料的帳號密碼登入

```
信箱：root@email.com
密碼：12345678
```

## Contributor - 專案開發人員

> [Henry Chung](https://github.com/HenryChung81)
