import $ from 'jquery'
import Event from 'js/common/event'

import fisher from '../../../images/assistant/fishdoctor.png'
import assis from '../../../images/assistant/assistant.png'
import phone from '../../../images/assistant/phone.png'
require('src/sass/common/ui/_assistant.scss')

let _HTML_ = `<div class="ark-help" >
        <div class="ark-help-header">
          <div class="header-title">Hi 欢迎来到易观方舟</div>
          <div class="sub-title">有问题就找小舟助手</div>
        </div>
        <div class="ark-help-contact">
          <div class="fish-doctor">
            <img src=${fisher}>
          </div>
          <div class="content">
            <div class="title">
              <span>联系我们</span>
              <span>周一至周五 10:00 - 18:00</span>
            </div>
            <p>产品咨询：4006 - 010 - 231 转 1</p>
            <p>商务合作：4006 - 010 - 231 转 2</p>
          </div>
        </div>
        <div class="ark-help-action">
          <ul class="ark-help-tabs">
            <li class="ark-help-tab" id="notInLogin">
              <a href="${client}/view/sign/signup.html?projectType=demo" class="try-demo" >
                <div class="action-icon" >
                  <i class="iconfont icon-xiaoxixiala-xitongshengji" style="transform:rotateZ(45deg)"></i>
                </div>
                <div class="action-name">体验 Demo</div>
              </a>
            </li>
            <li class="ark-help-tab" id="inLogin" style="display:none">
              <a href="${paasServer}/dashboard?projectType=demo" class="try-demo" >
                <div class="action-icon" >
                  <i class="iconfont icon-xiaoxixiala-xitongshengji" style="transform:rotateZ(45deg)"></i>
                </div>
                <div class="action-name">体验 Demo</div>
              </a>
            </li>
            <li class="ark-help-tab">
              <a href="https://docs.analysys.cn/ark/faq/trialversion" class="hd" target="_blank">
                <div class="action-icon">
                  <i class="iconfont icon-questioncircle"></i>
                </div>
                <div class="action-name">常见问题</div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="ark-help-tip">
        <span>咨询与帮助</span>
      </div>
      <a class="ark-help-button">
        <img src=${assis}>
        <i class="iconfont icon-close close"></i>
      </a>
      <a class="ark-phone-btn" href="tel:4006-010-231">
        <img src=${phone}>
      </a>`

let _stopPropagation = (e) => e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true

// 显示小舟助手弹框
let _hideBox = (e) => {
  e && _stopPropagation(e)
  $('.ark-help').css('transform', 'translate(360px, 0)')
  $('.ark-help-button img').show()
  $('.ark-help-button i').css('display', 'none')
}

// 隐藏小舟助手弹框
let _showBox = (e) => {
  e && _stopPropagation(e)
  $('.ark-help').css('transform', 'translate(0)')
  $('.ark-help-tip').hide()
  $('.ark-help-button img').hide()
  $('.ark-help-button i').css('display', 'inline-block')
}

// 判断弹框是否在显示状态
let _isShow = () => $('.ark-help').css('transform').replace(/[^0-9\-,]/g, '').split(',')[4] === '0'

let isMobile = () => {
  var mobile_flag = false
  var userAgentInfo = navigator.userAgent
  var mobileAgents = [ 'Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod' ]

  for (var i = 0, len = mobileAgents.length; i < len; i++) {
    if (~userAgentInfo.indexOf(mobileAgents[i])) {
      mobile_flag = true
      break
    }
  }

  return mobile_flag
}

function assistant () {
  var div = document.createElement('div')
  div.innerHTML = _HTML_
  document.querySelector('body').appendChild(div)

  $('.ark-help-button').on('click', (e) => _isShow() ? _hideBox(e) : _showBox(e))
  !isMobile() && $('.ark-help-button img').hover(() => $('.ark-help-tip').show(), () => $('.ark-help-tip').hide())

  $('.ark-help a').on('click', () => _hideBox())

  $(document).bind('click', (e) => {
    !$('.ark-help').find($(e.target)).length && _hideBox()
  })

  Event.on('userInfo', function (data) {
    if (data.code == 0) {
      $('.ark-help-tabs #inLogin').show()
      $('.ark-help-tabs #notInLogin').hide()
    } else {
      $('.ark-help-tabs #inLogin').hide()
      $('.ark-help-tabs #notInLogin').show()
    }
  })
}

module.exports = new assistant()

