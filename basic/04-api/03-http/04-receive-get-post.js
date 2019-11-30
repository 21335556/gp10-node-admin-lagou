const http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer();
server.on('request', (req,res) => {
  if(req.method === "GET") {
    // get 数据请求获取
    res.setHeader('content-Type', 'application/json;charset=utf8');
    const urlObj = url.parse(req.url, true)
    switch(req.url) {
      case '/api/users/sign':
        // res.write(JSON.stringify(urlObj.query))
        res.write(JSON.stringify({"ret":true,"message":'登录成功'}))
        break
      case '/api/users/signout':
        res.write(JSON.stringify({"ret":true,"message":'登出成功'}))
        break
    }
    res.end()
  } else {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
    })
    req.on('end', () => {
      console.log(querystring.parse(data));
      res.write('ok')
      res.end()
    })
  }
})
server.listen(8000, () => {
  console.log('localhost:8000');
})