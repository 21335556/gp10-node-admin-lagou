const http = require('http');
const server = http.createServer((reqest,response) => {
  response.write('hello')
  response.end(' world.')
})

server.listen(8080,'localhost', () =>{
  console.log('server is running at localhost:8080.');
})