const jwt = require('jsonwebtoken')

const key = 'i love u'

const token = jwt.sign({username: 'zhaoqian'}, key)

console.log(token);

