const jwt = require('jsonwebtoken')
const fs = require('fs')

// const key = 'i love u'

// const token = jwt.sign({username: 'zhaoqian'}, key)

// console.log(token);

// 非对称加密
// 用私钥加密，用公钥解密

// 生成私钥
// ssh-keygen -t rsa -b 2048 -f private.key
// ssh-keygen -t rsa -b 2048 -f rsa_private_key.pem

// 生成公钥
// openssl rsa -in private.key -pubout -outform PEM -out public.key
// openssl rsa -in rsa_private_key.pem -pubout -out rsa_public_key.pem

var privateKey = fs.readFileSync('./keys/private.key');
var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256'});
console.log(token)