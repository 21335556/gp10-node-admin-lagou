const http = require('http');
const fs = require('fs')

const server = http.createServer((req,res) => {
  let url = req.url
  switch(url) {
    case '/home':
      let html = fs.readFileSync('./index.html','utf-8')
      res.write(html)
      break;
    case '/index.css':
      let css = fs.readFileSync('./index.css','utf-8')
      res.write(css)
      break;
    case '/index.js':
      let js = fs.readFileSync('./index.js','utf-8')
      res.write(js)
      break;
    case '/pic.jpg':
      let pic = fs.readFileSync('./pic.jpg','binary')
      res.write(pic,'binary')
      break;
    default :
      res.write('aoh. ')
      res.write('page not found.')
  }

  res.end()
})

server.listen(8000, () => {
  console.log('localhost:8000');
})