import positionTpl from '../views/position-list.html'
import positionAddTpl from '../views/position-add.hbs'
import positionUpdateTpl from '../views/position-update.hbs'
import oAuth from '../utils/oAuth'
import randomString from 'randomstring'
import _ from 'lodash'

export const render = async (req, res, next) => {
  let result = await oAuth()
  if (result.data.isSignin) {
    // console.log(req.query)
    let page = req.query && req.query.page || 0
    let pagesize = req.query && req.query.pagesize || 5
    let keywords = req.query && req.query.keywords || ''
    // let { page = 0, pagesize = 5, keywords = '' } = req.query || {}

    $.ajax({
      url: '/api/position/find',
      headers: {
        'X-Access-Token': localStorage.getItem('token')
      },
      data: {
        page,
        pagesize,
        keywords
      },
      success(result) {
        // res.render(positionTpl({
          // data: result.data.result,
          // hasResult: result.data.result.length > 0,
          // url: location.hash.split('?')[0],
          // page,
          // pagecount: _.range(1, Math.ceil(result.data.total / ~~pagesize))
        // }))
        let list = template.render(positionTpl, {
          data: result.data.result,
          hasResult: result.data.result.length > 0,
          url: location.hash.split('?')[0],
          total: result.data.total,
          page:  ~~page,
          pagesize,
          keywords,
          pagecount: _.range(1, Math.ceil(result.data.total / ~~pagesize) + 1)
        })
        
        res.render(list)
      }
    })
    bindPositionListEvent(req, res)
  } else {
    res.go('/')
  }
}

export const add = (rea, res, next) => {
  res.render(positionAddTpl({}))
  bindPositionAddEvent(res)
}

export const update = (req, res, next) => {
  $.ajax({
    url: '/api/position/one',
    data: {
      id: req.params.id
    },
    type: 'GET',
    headers: {
      'X-Access-Token': localStorage.getItem('token')
    },
    success(result) {
      if (result.ret) {
        res.render(positionUpdateTpl({
          ...result.data,
        }))
      } else {
        alert(result.data)
      }
    }
  })

  bindPositionUpdateEvent(req, res)
}

function bindPositionListEvent(req, res) {
  $('#router-view').off('click', '#addbtn').on('click', '#addbtn', (e) => {
    res.go('/position_add')
  })

  $('#router-view').off('click', '.btn-delete').on('click', '.btn-delete', function (e) {
    $.ajax({
      url: '/api/position',
      type: 'DELETE',
      data: {
        id: $(this).closest('tr').attr('data-id')
      },
      headers: {
        'X-Access-Token': localStorage.getItem('token')
      },
      success: (result) => {
        let { page = 0, pagesize = 5, keywords = '' } = req.query || {}
        let total = ~~$(this).closest('tr').attr('data-total')
        
        // 最后一页内容删除完毕后，需要跳转上一页
        page = (page * pagesize === total -1) && (page > 0) ? page -1 : page
        
        if (result.ret) { 
          res.go('/position/' + randomString.generate(7) + `?page=${page}&pagesize=${pagesize}&keywords=${keywords || ''}`)
        } else {
          alert(result.data)
        }
      }
    })
  })

  $('#router-view').off('click', '.btn-update').on('click', '.btn-update', function (e) {
    res.go('/position_update/' + $(this).closest('tr').attr('data-id'))
  })

  $('#router-view').off('click', '#possearch').on('click', '#possearch', function (e) {
    res.go('/position/1/' + `?keywords=${$('#keywords').val()}`)
  })
}

function bindPositionUpdateEvent(req, res) {
  $('#router-view').off('click', '#posback').on('click', '#posback', (e) => {
    res.back()
  })

  $('#router-view').off('click', '#possubmit').on('click', '#possubmit', (e) => {
  // $('#possubmit').off('click').on('click', (e) => {
    $('#posupdate').ajaxSubmit({
      resetForm: true,
      headers: {
        'X-Access-Token': localStorage.getItem('token')
      },
      success(result) {
        if (result.ret) {
          res.back()
        } else {
          alert(result.data)
        }
      }
    })
  })
}

function bindPositionAddEvent(res) {
  $('#posback').off('click').on('click', (e) => {
    res.back()
  })

  $('#possubmit').off('click').on('click', (e) => {
    $('#possave').ajaxSubmit({
      resetForm: true,
      headers: {
        'X-Access-Token': localStorage.getItem('token')
      },
      success(result) {
        if (result.ret) {
          res.back()
        } else {
          alert(result.data)
        }
      }
    })
  })
}
