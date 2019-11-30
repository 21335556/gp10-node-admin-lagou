const express = require('express')
const proxy = require('http-proxy-middleware')
const bodyParser = require('body-parser')
const router = require('./router/user')

const app = express()

// 静态资源服务
app.use(express.static('./public'))

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.set('views','./views')
app.set('view engine','ejs')

// 中间件
// app.use('/users',(req,res,next) => {
//   res.set('Content-Type','text/plain')
//   // const data = req.query
//   const data = req.body
//   // res.send(data)
//   // console.log(data.name);
//   console.log(data);
//   res.send(data)
// })

// 2、路由中间件
// router文件夹 

// 路由中间件引用
app.use('/pass',router)
// app.use('/pass',(req,res,next) => {
//   throw Error('error')
//   next()
// })

// 3、错误处理中间件
// app.use(function (err,req,res,next) {
//   console.error(err.stack);
//   res.status(500).send('Someing broke!')
// })

// 4、内置中间件
// 5、 第三方中间件


// http server 端口监听
app.listen(8080, () => {
  console.log('localhost:8080');
})