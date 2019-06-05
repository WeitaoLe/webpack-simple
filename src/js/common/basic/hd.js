import $ from 'jquery'
import cookie from '../cookie/cookie'
// import search from './search';


// $('.DemoHref a').on('click', ()=> {
// 	cookie.set('appType', 'demo', {
// 		path: '/'
// 	});

// 随机分配
function RandomNumBoth (Min, Max) {
  var Range = Max - Min
  var Rand = Math.random()
  var num = Min + Math.round(Rand * Range) // 四舍五入
  return num
}

// 随机分配一个方案，保留一周
if (!cookie.get('abtest')) {
  cookie.set('abtest', RandomNumBoth(1, 2), { path: '/', expires: 7 })
  console.log(cookie.get('abtest'))
}


let _stopPropagation = (e) => e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true
let timer, $navBg = $('[node-type="nav-bg"]')
$('.item-hover').hover(function (e) {
  timer = setTimeout(() => { $navBg.addClass('show') }, 300)
}, function (e) {
  clearTimeout(timer)
  $navBg.removeClass('show')
})

let $minNav = $('.min-nav'),
  $tab = $('[action-type="min-nav-tab"]')

$minNav.on('click', (e) => {
  _stopPropagation(e)
  let t = $(e.currentTarget)
  t.hasClass('active') ? t.removeClass('active') : t.addClass('active')
})
$('body').on('click', (e) => {
  let $t = $(e.target).closest('.min-nav')
  if (!$t.length && $minNav.hasClass('active')) {
    $minNav.removeClass('active')
  }
})

$tab.find('li.nav-li').on('click', (e) => {
  _stopPropagation(e)
  let $t = $(e.currentTarget),
    $li = $('li.nav-li'),
    $this = $t.find('.co'),
    $co = $('.co')
  if ($this.hasClass('show')) {
    for (let i = 0; i < $co.length; i++) {
      $co.eq(i).removeClass('show')
    }
    for (let j = 0; j < $li.length; j++) {
      $li.eq(j).removeClass('active')
    }
  } else {
    for (let i = 0; i < $co.length; i++) {
      $co.eq(i).removeClass('show')
    }
    for (let j = 0; j < $li.length; j++) {
      $li.eq(j).removeClass('active')
    }
    $t.addClass('active')
    $this.addClass('show')
  }
})
$('.co').on('click', (e) => {
  _stopPropagation(e)
})
