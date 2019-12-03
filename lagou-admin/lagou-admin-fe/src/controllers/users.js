import userTpl from '../views/user.html'

class Users {
  constructor() {
    this._renderUerTpl({ isSignin: false })
    this._user()

  }

  _renderUerTpl({ isSignin = false }) {
    let template = Handlebars.compile(userTpl)
    let renderedUserTpl = template({
      isSignin
    })
    $('.user-menu').html(renderedUserTpl)
  }

  // 渲染user模板，绑定登录注册事件
  _user(res) {
    let that = this
    this._renderUerTpl({})
    // 标签默认事件
    $('#user').on('click', 'span', function (e) {
      // e.stopPropagation()
      if ($(this).attr('id') === 'user-signin') {
        $('.box-title').html('登录')
        that._doSign('/api/users/signin')
        // alert(result.data.message)
      } else {
        $('.box-title').html('注册')
        that._doSign('/api/users/signup')
        // alert(result.data.message)
      }
    })
  }

  // 登录注册ajax
  _doSign(url) {
    $('#confirm').off('click').on('click', async () => {
      return $.ajax({
        url,
        type: 'POST',
        // "content-type": 'application/x-www-from-urlencoded',
        data: $('#user-from').serialize(),
        success(result) {
          alert(result.data.message)
        }
      })
    })
  }
}

export default Users