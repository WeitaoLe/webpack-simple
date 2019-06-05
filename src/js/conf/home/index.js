import $ from 'jquery'
import basic from 'js/common/basic/basic'
import Event from 'js/common/event'
import cookie from 'js/common/cookie/cookie'
import tween from 'js/common/tool/TweenMax.min.js'
import io from 'js/common/request'
import demoFt from 'js/common/basic/demo-ft.js'
import arrow from '../../../images/index/new/arrow.png'
import arrowRight from '../../../images/index/new/arrow-right.png'

require('src/sass/conf/home/index.scss')
require('src/sass/common/ui/_demo.scss')

var portaltabhd = $('#portal-tab-hd li')
var portaltabbd = $('#portal-tab-bd li')

portaltabhd.on('click', function () {
  var index = portaltabhd.index(this)
	portaltabhd.removeClass('act')
	portaltabhd.eq(index).addClass('act')

	portaltabbd.hide()
	portaltabbd.eq(index).show()
})

// 体验demo
$('#jDemoBtn').mousedown(() => {
  // cookie.set('appType', 'demo', {
  // 	path: '/'
  // });
  cookie.set('appInfo', null, { path: '/' })
})

// 埋点
$('#jReg').click(() => {
  // fz.event({EI: 'bannerEntrence',EPD: {'entrenceName': 'gotoAppList'}})
  // AnalysysAgent.track('bannerRegClick')
})
$('#jDemoBtn').click(() => {
  // fz.event({EI: 'bannerEntrence',EPD: {'entrenceName': 'gotoDemo'}})
  // AnalysysAgent.track('bannerDemoClick')
})

Event.on('userInfo', function (data) {
  if (data.code == 0) {
    $('#jReg,#freeTrial').attr('href', '/view/app/addlist.html').text('进入我的应用').on('mousedown', () => {
      cookie.set('appType', null, { path: '/' })
			cookie.set('appInfo', null, { path: '/' })
		})
		$('.banner-left #inLogined').show()
		$('.banner-left #notLoined').hide()
	} else {
    $('.banner-left #inLogined').hide()
    $('.banner-left #notLoined').show()
  }
})


// 立即体验Tab
$('#portal-tab-bd .btn').on('click', function (e) {
  // cookie.set('appType', 'demo', {
  // 	path: '/'
  // });
  cookie.set('appInfo', null, { path: '/' })
})

// 观看视频
let videoUrl = ''
$('.watchVedio').on('click', watchVedio)

$('#closeVedio').on('click', closeVedio)

function watchVedio () {
  let dom = document.getElementById('myVideo')
  $('.vedio-wrapper').show()
  if (videoUrl === '') {
    io.post('/fangzhou/api/aliyun/vod/getPlayInfo', {
      videoId: '240c57880a584de6966c9d3ebe052193'
    }, data => {
      if (data.code === 0) {
        videoUrl = data.datas[0].PlayURL
        $(dom).prop('src', videoUrl)
        dom.play()
      }
    }, err => {
      alert(err.msg)
    })
  } else {
    dom.play()
  }
}

function closeVedio () {
  $('.vedio-wrapper').hide()
  document.getElementById('myVideo').pause()
}

bannerAnimation()

function bannerAnimation () {
  var anime = new TimelineMax()
  anime.to('.anime01', 1, { 'opacity': '1', 'top': '125' })
  anime.to('.anime02', 1, { 'opacity': '1', 'top': '25' }), '-=0.5';
  anime.to('.anime03', 1, { 'opacity': '1', 'top': '180' }, '-=0.5')
  anime.to('.anime04', 1, { 'opacity': '1', 'top': '365' }, '-=0.5')
  anime.to('.anime05', 1, { 'opacity': '1', 'top': '192' }, '-=0.5')
  anime.to('.anime06-decr1', 0.5, { 'opacity': '1', 'top': '55' }, '-=0.2')
  anime.to('.anime06-decr2', 0.5, { 'opacity': '1', 'top': '165' }, '-=0.4')
  anime.to('.anime06-squqre', 1, { 'opacity': '1', 
'top': '88', 
onComplete: function () {
    var aDeco = new TimelineMax({ repeat: -1 })
    aDeco.to('.anime06-decr1', 2, { 'top': '70', ease: 'linear' })
    aDeco.to('.anime06-decr2', 2, { 'top': '180', ease: 'linear' }, '-=3')
    aDeco.to('.anime06-decr1', 2, { 'top': '55', ease: 'linear' })
    aDeco.to('.anime06-decr2', 2, { 'top': '165', ease: 'linear' }, '-=3')
    var aSquare = new TimelineMax({ repeat: -1 })
    aSquare.to('.anime07', 2, { 'opacity': '1', 'left': '435', 'top': '159', ease: 'linear' })
    aSquare.to('.anime07', 2, { 'opacity': '0', 'left': '563', 'top': '242', ease: 'linear' })//2
    aSquare.to('.anime07', 2, { 'opacity': '1', 'left': '442', 'top': '332', ease: 'linear' })
    aSquare.to('.anime07', 2, { 'opacity': '0', 'left': '287', 'top': '421', ease: 'linear' })//3
    aSquare.to('.anime07', 2, { 'opacity': '1', 'left': '152', 'top': '331', ease: 'linear' })
    aSquare.to('.anime07', 2, { 'opacity': '0', 'left': '7', 'top': '241', ease: 'linear' })//4
    aSquare.to('.anime07', 2, { 'opacity': '1', 'left': '152', 'top': '158', ease: 'linear' })
    aSquare.to('.anime07', 2, { 'opacity': '0', 'left': '287', 'top': '75', ease: 'linear' })//1
  } }, '-=0.4')
}

function isMobile () {
  var mobile_flag = false
  var userAgentInfo = navigator.userAgent
  var mobileAgents = [ 'Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod' ]

  for (var i = 0, len = mobileAgents.length; i < len; i++) {
    if (~userAgentInfo.indexOf(mobileAgents[i])) {
      mobile_flag = true
      break;
    }
  }

  return mobile_flag
}


let formatDate = (da) => {
  let addZero = (value) => value < 10 ? '0' + value : value
  var year = da.getFullYear()
  var month = addZero(da.getMonth() + 1)
  var date = addZero(da.getDate())

  return [year, month, date].join('-')
}


let isEmpty = (str) => !str || str === ''
let defaultImg = 'https://ark.analysys.cn/portal/images/pub/img-error.png'

let getData = (param) => {
  io.post('/fangzhou/cms/article/getArticleByCate', param, (data) => {
    let result = data.datas
    let img = isEmpty(result.guid) ? defaultImg : result.guid

    $('.detail-box').click(() => {
      window.location.href = `/blog?p=${result.postId}`
    })

    $('.img-area img').attr('src', img)
    $('.box-header p').html(formatDate(new Date(result.postDate)))
    $('.box-header span').html(result.postTitle)
  })
}

$(function () {
  if (!isMobile()) {
    $('#pro-check').attr('href', '/view/home/index.html')
  }
  var scrollBefore = $(window).scrollTop()
  //底部暴光埋点
  $(window).scroll(function () {
    var scrollAfter = $(window).scrollTop()
    if (scrollBefore < scrollAfter) {
      var h = $(document).height() - $(window).height()
      if (scrollAfter > h - 150) {
        // fz.event({EI: 'scrollToFooter'})
      }
    }
    scrollBefore = scrollAfter
  })
})

// 获取博客文章列表
var blogMap = [{
  type: 6,
  selector: '.khzl'
}, {
  type: 4,
  selector: '.fxzd'
}]

function queryBlogList (obj) {
  var parent = $(obj.selector)
  io.get('/blog/api/post/list', {
    pageSize: 3,
    dictId: obj.type
  }, (data) => {
    if (data.code == 0) {
      var list = data.datas.posts
      list.forEach(v => {
        var dom = $(`<p><a href=${'/blog/' + v.postName}>${v.postTitle}</a></p>`)
        parent.append(dom)
      })
    }
  })
}

blogMap.forEach(v => { queryBlogList(v) })

// var carouseIndex = 0
// var img = $('#peer img'),
//   len = img.length

// var oldIndex = 0

// function carousel () {
//   var prevIndex = (carouseIndex == 0 ? len - 1 : (carouseIndex - 1))
// 	var nextIndex = (carouseIndex == len - 1 ? 0 : (carouseIndex + 1))

// 	var prevZ = 10
// 	var nextZ = 10

// 	if ((carouseIndex > oldIndex && oldIndex == 0 && carouseIndex == len - 1) || (carouseIndex < oldIndex && !(carouseIndex == 0 && oldIndex == len - 1))) {
//     nextZ = 11
// 	} else {
//     prevZ = 11
// 	}

//   oldIndex = carouseIndex

// 	for (var i = 0; i < len; i++) {
//     if (i !== prevIndex && i !== nextIndex && i !== carouseIndex) {
//       img.eq(i).removeClass().addClass('other')
//     }
//   }

//   img.eq(prevIndex).removeClass()
//     .addClass('prev').css({ zIndex: prevZ })

//   img.eq(nextIndex).removeClass()
//     .addClass('next').css({ zIndex: nextZ })

//   img.eq(carouseIndex).removeClass().addClass('current')
// }

// var time

// var timeInit = () => {
//   time = setInterval(() => {
//     if (carouseIndex == len) {
//       carouseIndex = 0
// 		}
//     carousel()
// 		carouseIndex++
// 	}, 3000)
// }

// timeInit()

// $('#peer').hover(() => clearInterval(time), () => timeInit())

// img.on('click', function () {
//   var index = img.index(this)
// 	carouseIndex = index
// 	carousel()
// })

// function initPortalNews () {
//   $('.content-title').on('click', function (e) {
//     $('.news-menu li').removeClass('menu-active')
//     $(this).parent('li').addClass('menu-active')

//     let type = $(this).parent('li').attr('data-menu-type')
//     getData({ cate: type })
//   })

//   getData({ cate: 4 })

//   $('.img-area img').on('error', function () {
//     $(this).attr('src', defaultImg)
//   })
// }

// initPortalNews()

// $(function () {
//   var circle_x = 0//圆心的X坐标
//   var circle_y = 0//圆心的Y坐标
//   var circle_a = 570//椭圆长轴
//   var circle_b = 20//椭圆短轴
//   var plane = {}
//   var angle_change = 1//角度变化
//   var canvas//画布
//   var context//画布环境

//   function draw () {
//     var $canvas = $('canvas')
//     var canvasContainer = document.getElementById('canvas-container')

//     canvas = $canvas[0]
//     context = canvas.getContext('2d')
//     context.canvas.width = canvasContainer.offsetWidth - 10
//     context.canvas.height = canvasContainer.offsetHeight - 2

//     circle_x = $canvas.width() / 2
//     circle_y = $canvas.height() / 2
//     circle_a = context.canvas.width / 2
//   }

//   function init () {
//     draw()
//     loadImg()

//     $(window).on('resize', function (event) { draw() })
//   }

//   function route (context, x, y, a, b) {
//     var step = (a > b) ? 1 / a : 1 / b
//     context.setLineDash([5, 15])
//     context.strokeStyle = '#8CA4D4';
//     context.beginPath()
//     context.moveTo(x + a, y) //从椭圆的左端点开始绘制
//     for (var i = 0; i < 2 * Math.PI; i += step) {
//       context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i))
//     }
//     context.closePath()
//     context.stroke()
//   }

//   function imgMove () {
//     context.clearRect(0, 0, canvas.width, canvas.height)//清空画布内容
//     route(context, circle_x, circle_y, circle_a, circle_b)

//     if (plane.angle == 360) {
//       plane.angle = 0
//     }
//     plane.angle = plane.angle + angle_change//角度
//     var radian = plane.angle * (Math.PI / 180)//弧度
//     var num = setProp(plane, 0.5, 1)
//     plane.x = (circle_x + circle_a * Math.cos(radian)) - plane.w * num / 2
//     plane.y = (circle_y + circle_b * Math.sin(radian)) - plane.h * num / 2

//     context.globalAlpha = num
//     if (plane.angle >= 180 && plane.angle <= 360) {
//       context.globalAlpha = 0.5
//       context.drawImage(plane.image2, plane.x, plane.y, plane.w * num, plane.h * num)
//     } else {
//       context.drawImage(plane.image, plane.x, plane.y, plane.w * num, plane.h * num)
//     }

//     context.globalAlpha = 1
//   }
//   function loadImg () {
//     var angle = 360//角度
//     var radian = 2 * Math.PI//弧度
//     //初始化图片
//     var img = new Image()
//     img.id = 1
//     img.src = arrow
//     var img2 = new Image()
//     img2.id = 2
//     img2.src = arrowRight

//     plane.id = img.id
//     plane.w = 32
//     plane.h = 26
//     plane.x = (circle_x + circle_a * Math.cos(radian)) - plane.w / 2
//     plane.y = (circle_y + circle_b * Math.sin(radian)) - plane.h / 2
//     plane.angle = angle
//     plane.image = img
//     plane.image2 = img2

//     img.onload = function () {
//       var num = setProp(plane, 0.5, 1)
//       context.globalAlpha = num//设置图片的透明度
//       context.drawImage(img, plane.x, plane.y, plane.w * num, plane.h * num)
//       context.globalAlpha = 1

//       setInterval(imgMove, 60)//60ms移动plane
//     }
//     img.onerror = function () {
//       console.warn('图片加载失败！')
//     }
//   }

//   // 把Y坐标转化为透明度和尺寸属性，范围在n1到n2之间;
//   function setProp (plane, n1, n2) {
//     return (((plane.y + plane.h / 2 - circle_y) + 2 * circle_b) / circle_b - 1) / 2 * (n2 - n1) + n1
//   }

//   init()
// })

