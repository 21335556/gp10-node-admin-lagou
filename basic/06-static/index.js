const fs = require('fs');
const http = require('http');
const path = require('path')
const content = require('./utils/content')
const mimes = require('./utils/mimes')

const server = http.createServer((req,res) => {
  const reqUrl = req.url;
  const public = __dirname + '/public';

  if(/favicon\.ico$/.test(reqUrl)) {
    
  } else {
    const cont = content(reqUrl, public)
    let extName = path.extname(path.join(public, reqUrl))
    let mimeValue = (extName && mimes[extName.slice(1)]) || 'text/html'

    res.setHeader('Content-Type', mimeValue)
    ;
    if(/image\//.test(mimeValue)) {
      res.write(cont, 'binary')
    } else {
      res.write(cont)
    }
  }

  res.end()
})

server.listen(4000, () => {
  console.log('localhost:4000');
})