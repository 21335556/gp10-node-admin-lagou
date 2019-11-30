const url = require('url');
const reqUrl = 'http://www.abc.com:8000/api/adduser.php?id=3&name=xiaolei#tag=z'

const objUrl = url.parse(reqUrl,true,true)

const strUrl = url.format({
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'www.abc.com:8000',
  port: '8000',
  hostname: 'www.abc.com',
  hash: '#tag=z',
  search: '?id=3&name=xiaolei',
  query: { id: '3', name: 'xiaolei' },
  pathname: '/api/adduser.php',
  path: '/api/adduser.php?id=3&name=xiaolei',
  href:
  'http://www.abc.com:8000/api/adduser.php?id=3&name=xiaolei#tag=z' 
})
// console.log(objUrl);
// console.log(strUrl);

const strUrl2 = url.resolve('http://www.abc.com/api/','../abc')
console.log(strUrl2);

