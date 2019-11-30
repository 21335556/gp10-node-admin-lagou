const http = require('http')
const proxy = require('http-proxy-middleware')

const app = http.createServer( (req,res) => {
  // 定义网址导航及路由
  var options = {
    target: 'https://m.lagou.com',  // target host
    changeOrigin: true,             // needed for virtual hosted sites
    pathRewrite: {
      '^/api': ''                   // rewrite path
    }
  }

  var exampleProxy = proxy(options)
  // console.log(exampleProxy);
  // console.log(req.url);

  if(/^\/api/.test(req.url)) {
    exampleProxy(req,res)
  }

  // res.end('ok.')
} )

app.listen(8000, () => {
  console.log('localhost:8000')
})
