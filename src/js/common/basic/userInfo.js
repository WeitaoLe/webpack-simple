import $ from 'jquery';
import io from 'js/common/request';
import Event from 'js/common/event';
import cookie from 'js/common/cookie/cookie';
import formatDate from 'js/common/tool/formatDate';

let getUserInfo = () => {
  io.get('/fangzhou/usercenter/center/getuserinfo', (data) => {
    $('#notLoggedIn').hide();
    $('#loggedIn').show();
    localStorage.setItem('logined', true)

    $('#loginName').text(data.datas.baseUserInfo.name || data.datas.baseUserInfo.email || data.datas.baseUserInfo.phone);
    if (data.datas.baseUserInfo.avatar) {
      $('#loginImg').attr('src', data.datas.baseUserInfo.avatar)
    };
    Event.emit('userInfo', data);

    // sdk埋点
    var info = data.datas.baseUserInfo;
    var date = new Date(info.createdDate).format('YYYY-MM-DD hh:mm:ss')
    var sourceType = info.sourceType === null ? "" : info.sourceType.toString()
    var userType = info.userType === null ? "" : info.userType.toString()
    var xsyFollowStatus = info.xsyFollowStatus === null ? "" : info.xsyFollowStatus.toString()
    var properties = {
      '$email': info.email, // 邮箱
      'phone': info.phone.toString(), // 手机号
      'name': info.name, // 姓名
      'showname': info.showName, // 用户名
      'userType_new': userType,
      "$signup_time" : date,
      'sourcetype_new': sourceType,
      'xsyFollowStatus_new': xsyFollowStatus,
      'company': info.entName,
      'companyScale': info.companySize,
      'department': info.department
    }
    console.log('userId=' + info.userId.toString())
    AnalysysAgent.alias(info.userId.toString(), '');
    AnalysysAgent.profileSet(properties);

  }, (data) => {
    if (data.code == 301) {
      $('#notLoggedIn').show();
      localStorage.setItem('logined', false)
    };
    Event.emit('userInfo', data);
  })

  function href() {
    cookie.set('appInfo', null, {path: '/'});
    window.location.href = '/view/app/addlist.html';
  }

  $('#myAppHref').click(() => {
    cookie.set('appType', null, {
      path: '/'
    })
    href();
  })
}

$(function() {
  var loginOut = $('#loginOut');
  var loginOutUrl = loginOut.attr('href');

  loginOut.attr('href', 'javascript:;');

// 退出登录
  loginOut.click(() => {
    $('#logoutiframe').attr('src',  window.paasService + '/ark/logout')

    var targetUrl = window.location.host.indexOf('argo') === -1 ? sassWebsiteClient : 'https://argo.analysys.cn/'
    io.get('/fangzhou/auth/logout', {
      service: targetUrl
    }, () => {
      window.location.href = targetUrl
    }, () => {
      window.location.href = targetUrl
    })

    // $.ajax({
    //   url: "/fangzhou/auth/logout",
    //   error: function(e){
    //     if (e.status === 302) {
    //       window.location.href = sassWebsiteClient
    //     }
    //   },
    //   success: function(data){
    //     window.location.href = sassWebsiteClient
    //   }
    // });

    // let $iframe2 = $('<iframe style="display: none" src="/portal/view/demo/validate_login2.html?t=' + timestamp + '"></iframe>')
    // let $iframe = $('<iframe style="display: none" src="/portal/view/demo/validate_login.html?t=' + timestamp + '"></iframe>')
    // $iframe2.appendTo($('body'))
    // $iframe.appendTo($('body'))
    // $iframe2.on('load', function () {})
    // $iframe.on('load', function () {
    //   window.location.href = sassWebsiteClient // eslint-disable-line
    // })
  })
})

export default getUserInfo
