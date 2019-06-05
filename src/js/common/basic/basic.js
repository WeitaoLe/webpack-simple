import $ from 'jquery'
import cookie from 'js/common/cookie/cookie'
import getUserInfo from 'js/common/basic/userInfo'
import getLicense from 'js/common/basic/license'
import hd from 'js/common/basic/hd'
import Event from 'js/common/event'
// import assistant from 'js/common/assistant/assistant.js';
import order from 'js/common/basic/order.js'

getUserInfo()
Event.on('userInfo', (data) => {
  // window.userInfo = data
  let loginUrl = client + '/view/sign/signup.html'
  let baseUrl = paasServer + '/dashboard'
  let $link = $('[data-action="toLogin"]')

  for (let i = 0; i < $link.length; i++) {
    let type = $link.eq(i).attr('data-type'), url
    // 埋点
    let pos = $link.eq(i).attr('data-pos')
    if (pos) {
      $link.eq(i).on('click', function () {
        AnalysysAgent.track('experience_demo', {
          'referrer_demo': pos
        })
      })
    }

    if (data.code !== 0) {
      url = type ? `${loginUrl}?projectType=${type}` : loginUrl
    } else {
      url = type ? `${baseUrl}?projectType=${type}` : `${baseUrl}?projectType=demo`
    }
    $link.eq(i).attr('href', url)
  }

  if (data.code === 0) {
    getLicense() // 获取license
  }

  if (data.code !== 0) {
    $('.DemoHref a, #ftDemoHref a').on('click', () => {
      // cookie.set('appType', 'demo', { path: '/' });
      cookie.set('appInfo', null, { path: '/' })
    })
  }

  // 底部footer 下载PDF的显示与隐藏
  if (data.code === 0) {
    $('.m-portal-ft .ft-logined').show()
    $('.m-portal-ft .ft-nologin').hide()
  } else {
    $('.m-portal-ft .ft-logined').hide()
    $('.m-portal-ft .ft-nologin').show()
  }
})

$(function () {
  $('[node-type="toOrderDemo"]').on('click', () => {
    Event.emit('order/demo')
  })
})

// function demo () {
//   cookie.set('appType', 'demo', {
//     path: '/'
//   });
//   cookie.set('appInfo', null, {path: '/'});
// }


// $('.DemoHref a').on('click', demo)

// $('#ftDemoHref a').on('click', demo)
