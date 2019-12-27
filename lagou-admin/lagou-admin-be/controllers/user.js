const userModel = require('../modules/users')
// bcryptjs等同于bcrypt
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

class UserController {
  _hashPassword(pwd, cb) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(pwd, 10, (err, hash) => {
        resolve(hash)
      })
    })
  }
  
  _comparePassword(pwd, hash) {
    return new Promise((resolve) => {
      bcrypt.compare(pwd, hash, function (err, res) {
        resolve(res)
      })
    })
  } 

  genToken(username) {
    let cert = fs.readFileSync(path.resolve(__dirname, '../keys/rsa_private_key.pem'))
    // let cert = 'i love u'
    return jwt.sign({username}, cert, {algorithm:'RS256'})
  }
  
  async signup(req, res, next) {
    res.set( 'Content-Type', 'application/json;charset=utd-8');
    
    let user = await userModel.select(req.body)
    console.log(user);
    if(user) {
      res.render('succ', {
        data: JSON.stringify({
          message: '用户名已经存在.'
        })
      })
      return 
    }

    
    // 密码加密
    let password = req.body.password
    let hash = await userController._hashPassword(password)
    let result = await userModel.insert({...req.body, password:hash})
  
    // 给前端构建json接口
    if(result) {
      res.render('succ', {
        data: JSON.stringify({
          message: '用户注册成功.'
        })
      })
    } else {
      res.render('fail', {
        data: JSON.stringify({
          message: '用户注册失败.'
        })
      })
    }
  }

  async signin(req, res ,next) {
    res.set( 'Content-Type', 'application/json;charset=utd-8');

    let result = await userModel.select(req.body)
    // 给前端构建json接口
    if(result) {
      // 创建session,保存用户名
      // req.session.username = result['username']
      // res.cookie('name', 'tobi')

      if(await userController._comparePassword(req.body.password, result['password'])) {
        // 生成token
        res.header('X-Access-Token', userController.genToken(result.username))
        
        res.render('succ', {
          data: JSON.stringify({
            username: result['username'],
            message: '登录成功.'
          })
        })
      } else {
        res.render('fail', {
          data: JSON.stringify({
            message: '密码错误.'
          })
        })
      }
    } else {
      res.render('fail', {
        data: JSON.stringify({
          message: '用户不存在.'
        })
      })
    }
  }

  issignin(req, res, next) {
    res.set( 'Content-Type', 'application/json;charset=utd-8');
    if(req.session.username) {
      res.render('succ', {
        data: JSON.stringify({
          username: req.session.username,
          isSignin: true
        })
      })
    } else {
      res.render('succ', {
        data: JSON.stringify({
          isSignin:false
        })
      })
    }
  }

  // signout(req, res, next) {
  //   req.session = null
  //   res.render('succ', {
  //     data: JSON.stringify({
  //       isSignin:false
  //     })
  //   })
  // }
}

userController = new UserController

module.exports = userController