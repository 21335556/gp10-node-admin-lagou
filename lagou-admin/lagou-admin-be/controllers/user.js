const userModel = require('../modules/users')
// bcryptjs等同于bcrypt
const bcrypt = require('bcryptjs')

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
  
  async signup(req, res, next) {
    let user = await userModel.select(req.body)
    if(!user) {
      res.render('fail', {
        data: JSON.stringify({
          message: '用户名已经存在.'
        })
      })
      return 
    }

    res.set( 'Content-Type', 'application/json;charset=utd-8');
    
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
      if(await userController._comparePassword(req.body.password, result['password'])) {
        res.render('succ', {
          data: JSON.stringify({
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
}

userController = new UserController

module.exports = userController