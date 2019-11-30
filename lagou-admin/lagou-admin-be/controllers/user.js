const userController = {
  signup(req, res, next) {
    res.set( 'content-type', 'application/json;charset=utd-8');
    res.render('succ', {
      data: JSON.stringify(req.body)
    })
  }
}

module.exports = userController