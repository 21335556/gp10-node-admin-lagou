const http = require('http')
const https = require('https')

const server = http.createServer((req,res) => {
  https.get('https://m.lagou.com/listmore.json?pageNo=2&pageSize=15',(request) => {
    let data = ''
    request.setEncoding('utf-8')
    request.on('data', (chunk) => {
      data += chunk
    })
    request.on('end', () => {
      res.setHeader('Content-Type','application/json;charset=utf8')
      res.write(JSON.stringify({
        ret:true,
        data
      }))
      res.end()
    })
  })
})

server.listen(8000, () => {
  console.log('localhost:8000');
})