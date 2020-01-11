import store from 'store'
import userTpl from '../views/user.html'
import oAuth from '../utils/oAuth'

// class Users {
//   constructor() {
//     this.render()
//     this.type = ''
//     this.isSignin = false
//     this.username = ''
//   }

//   async render() {
//     // 如果调用了一个async 方法，方法里如果有await
//     // 在调用的时候必须await
//     await this.auth()

//     let that = this

//     let html = userTpl({
//       isSignin: this.isSignin,
//       username: this.username
//     })
//     $('#nav').html(html)

//     // 注册登录按钮点击
//     $('#btn-signin, #btn-signup').on('click', function() {
//       that.type = $(this).attr('id')
//     })

//     // 提交
//     $('#btn-submit').on('click', this.handleSubmit.bind(this))

//     // 注销
//     $('body').off('click').on('click', '#btn-signout', async () => {
//       let result = await oAuth.get({
//         url: '/api/users/signout'
//       })
//       if (result.ret) {
//         location.reload()
//       }

//       store.remove('token')
//       location.reload()
//     })
//   }

//   async auth() {
//     let result = await oAuth.get({
//       url: '/api/users/isSignin'
//     })

//     let username = result.data.username
//     this.isSignin = username ? true : false
//     this.username = username
//   }

//   async handleSubmit() {
//     let data = $('.form-horizontal').serialize()

//     let result = await oAuth.get({
//       // this.type 存储了用户点了“登录”或“注册”按钮
//       url: '/api/users/' + (this.type === 'btn-signin' ? 'signin' : 'signup'),
//       data,
//       type: 'POST'
//     })

//     this.handleSubmitSucc(result)
//   }

//   handleSubmitSucc(result) {
//     $('.form-horizontal')[0].reset()

//     if (result.ret) {
//       let html = userTpl({
//         isSignin: true,
//         username: result.data.username
//       })

//       if (this.type === 'btn-signin') {
//         $('#nav').html(html)
//       } else {
//         alert(result.data.message)
//       }
//     } else {
//       alert(result.data.message)
//     }

//   }
// }

// export default new Users()

class Users {
  constructor() {
    // this._renderUerTpl({ isSignin: false })
    this._init()
  }
  
  async _init() {
    let result = await oAuth()
    if (result) {
      this._renderUerTpl({...result.data})
    } else {
      this._renderUerTpl({isSignin:false})
    }
  }

  _renderUerTpl({ isSignin = false, username = '' }) {
    let template = Handlebars.compile(userTpl)
    let renderedUserTpl = template({
      isSignin,
      username
    })
    $('.user-menu').html(renderedUserTpl)
    this._user()
  }

  // 渲染user模板，绑定登录注册事件
  _user() {
    let that = this
    // 标签默认事件

    $('.user-menu').on('click', '#signout', () => {
      // localStorage.removeItem('token')
      // location.reload()
      store.remove('token')
      location.reload()
    })

    $('#user').on('click', 'span', function (e) {
      // e.stopPropagation()
      if ($(this).attr('id') === 'user-signin') {
        $('.box-title').html('登录')
        that._doSign('/api/users/signin', 'signin')
      } else {
        $('.box-title').html('注册')
        that._doSign('/api/users/signup', 'signup')
      }
    })
  }

  // 登录注册ajax
  _doSign(url, type) {
    $('#confirm').off('click').on('click', async () => {
      return $.ajax({
        url,
        type: 'POST',
        // "content-type": 'application/x-www-from-urlencoded',
        data: $('#user-from').serialize(),
        success: (result, statesCode, jqXHR) => {
          if (type === 'signin') {
            this._signinSucc(result, jqXHR)
          } else {
            alert(result.data.message)
          }
        }
      })
    })
  }

  _signinSucc(result, jqXHR) {
    if (result.ret) {
      this._renderUerTpl({
        isSignin: true,
        username: result.data.username
      })
    }

    // 存储token
    localStorage.setItem('token', jqXHR.getResponseHeader('X-Access-Token'))
  }
}

export default Users