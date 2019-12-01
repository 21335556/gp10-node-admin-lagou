const userModel = require('../modules/users')

const userController = {
  async signup(req, res, next) {
    res.set( 'content-type', 'application/json;charset=utd-8');
    
    let result = await userModel.save(req.body)

    if(result) {
      res.render('succ', {
        data: JSON.stringify({
          message: '数据插入成功.'
        })
      })
    } else {
      res.render('fail', {
        data: JSON.stringify({
          message: '数据插入失败.'
        })
      })
    }
  }
}

module.exports = userController