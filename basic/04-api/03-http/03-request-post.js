const https = require('https')
const querystring = require('querystring')


// 提交数据的封装
const postData = querystring.stringify({
  address: '北京',
  latitude: '34.55555',
  longitude: '160.444444',
  message: '求购一条金鱼',
  contact: '北京沙河老牛湾',
  type: 'buy'
})


// http.request 参数， 部分可省略。 host,path,method(post),header(content-type) 必填
const options = {
  host: 'ik9hkddr.qcloud.la',
  path:'/index.php/trade/add_item',
  port:443,
  method:'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
}


// 发出request请求
const req = https.request(options, (res) => {
  console.log(res.statuCode);
  console.log(res.headers);

  res.setEncoding('utf-8')
  let data = ''
  res.on('data', (chunk) => {
    data += chunk
  })
  res.on('end', () =>{
    console.log(data);
  })
})

req.on('error', (err) => {
  console.log(err.message);
})

req.write(postData)

req.end()