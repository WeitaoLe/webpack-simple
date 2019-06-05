/* 
* @Author: Marte
* @Date:   2017-09-14 14:11:41
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-26 17:38:03
*/
import Vue from 'vue';
import basic from 'js/common/basic/basic';
import Url from 'js/common/tool/getUrlParam';
import Event from 'js/common/event';
import io from 'js/common/request';
import 'js/common/filter/formatDate';
require('src/sass/conf/blog/article.scss');

import $ from 'jquery';

var article = new Vue({
  el: '#article',
  data: {
    article: {},
    relateList: [],
    last: {},
    next: {},
    paramstr: {},
    param: {},
    sinaHref: '',
    qqHref: ''
  },
  created() {
    var self = this;
    self.param.id = Url.getVal('id');
    self.param.columnId = Url.getVal('columnId');
    self.param.search = Url.getVal('search');
    self.param.pageSize = Url.getVal('pageSize');
    for(var key in self.param){
      if(!self.param[key]){
        delete self.param[key];
        self.paramstr[key] = '';
      }else{
        self.paramstr[key] = '&' + key + '=' + self.param[key];
      }
    }
    io.get('/fangzhou/cms/blog/show', self.param, function(data) {
      self.article = data.datas.entity;
      self.sinaHref = 'http://service.weibo.com/share/share.php?url='+escape(location.href)+'&title='+self.article.title+'&appkey=1343713053&searchPic=true';
      self.qqHref = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+escape(location.href)+'&title='+self.article.title+'&desc=&summary=&site=';
      self.relateList = data.datas.relatedList;
      self.last = data.datas.last || {};
      self.next = data.datas.next || {};

    })
  },
  methods: {
    searchTag (item){
      Event.emit("blog/search",item);
    }
  }
});

var _wh,_bh;

getHeight();

$(window).bind('resize', function(){
  getHeight();
  calHeight();
})

$(function(){

  var jiathis_config={
    summary:"",
    shortUrl:false,
    hideMore:false
  }

  $(window).bind('scroll', function(){
    calHeight();
  })

  $('.gotop').bind('click', function(){
    $(document).scrollTop(0)
  })
  
})

function getHeight() {
  _wh = $(window).height();
  _bh = $(document).height() - $('.m-portal-ft').outerHeight() - _wh;
}

function calHeight() {
  var iScrollTop = $(document).scrollTop();
  if(iScrollTop > _wh) {
    $('.gotop').show();
  }else{
    $('.gotop').hide();
  }
  if(iScrollTop > _bh) {
    $('.gotop').css('bottom', 70 + iScrollTop - _bh)
  }else{
    $('.gotop').css('bottom', 70)
  }
}