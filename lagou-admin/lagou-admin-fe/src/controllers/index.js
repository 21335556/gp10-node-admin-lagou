import menuTpl from '../views/menu.html'
import userTpl from '../views/user.html'
import homeTpl from '../views/home.hbs'

function _renderUerTpl({isSignin=false}) {
  let template = Handlebars.compile(userTpl)
    let renderedUserTpl = template({
      isSignin
  })
  $('.user-menu').html(renderedUserTpl)
}

// 渲染user模板，绑定登录注册事件
function _user(res) {
  _renderUerTpl({})
  // 标签默认事件
  $('#user').on('click', 'span', function(e) {
    // e.stopPropagation()
    // console.log($(this).attr('id'));
    if ($(this).attr('id') === 'user-signin' ){
      $('.box-title').html('登录')
    } else {
      $('.box-title').html('注册')
    }
  })
}

// 用户注册
function _signup() {
  $('#confirm').on('click', () => {
    // console.log($('#user-from').serialize());
    $.ajax({
      url: '/api/users/signup',
      type: 'POST',
      "content-type": 'application/x-www-from-urlencoded',
      data: $('#user-from').serialize()
    })
  })
}

export const render =  (req, res, next) => {
  $('.sidebar-menu').html(menuTpl)
  _renderUerTpl({isSignin: false})
  _user(res)

  _signup()

  // 返回路由的home页
  res.render(homeTpl({}))
}