const express = require('express')
const router = express.Router()

// 2、路由中间件
// 路由定义
// get: 从服务器端取数据,请求body在地址栏上
router.get('/r1', (req,res) => {
  // res.send('page1')
  res.render('index',{ msg:'<b>ok.</b>' })
})
// post: 往服务器端提交数据，请求数据在报文body里
// 发送一个修改数据的请求，要求数据要重新创建
router.post('/r2', (req,res) => {
  res.send('page2')
})
// put: 往服务器端提交数据，请求数据在报文body里
// 发送一个修改数据的请求，要求数据部分更新
router.put('/r3', (req,res) => {
  res.send('page3')
})
// patch: 往服务器端提交数据，请求数据在报文body里
// 修改数据的请求
router.patch('/r4', (req,res) => {
  res.send('page4')
})
// delete: 往服务器端提交数据，请求数据在报文body里
// 发送一个删除数据的请求
router.delete('/r5', (req,res) => {
  res.send('page5')
})

module.exports = router