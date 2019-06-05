import $ from 'jquery';
import basic from 'js/common/basic/basic';
import Event from 'js/common/event';
import io from 'js/common/request';
import getUrl from 'js/common/tool/getUrlParam'
import 'js/common/tool/formatDate';
require('src/sass/conf/blog/index.scss');

var host = $('body').attr('data-host')

// 轮播图接口
io.get('/fangzhou/cms/blog/listBanner', (data) => {
	var list = data.datas.bannerList;

	var html = '', dot = '';

	list.forEach((item, i)=> {
		var act = i == 0 ? 'act' : '';
		var display = i==0 ? 'block' : 'none'
		html += `<div class="img-box" style='background:url("${item.bannerImage}") center center no-repeat;display:${display}'><a href="${item.link}" target="_blank"></a></div>`;
		dot += `<span class='img-o ${act} bannerDot'></span>`;
	})
	bannerLen = list.length;

	var banner = $(".banner-images");

	banner.html(html);

	if (list.length <= 1) return;

	$(".banner .img-c").html(dot);
	var bannerDot = $(".bannerDot");
	timeInit();
	bannerDot.on('click', function() {
		var index = bannerDot.index($(this));
		imgIndex = index;
		slide(index)
	})

})


//热门文章
io.get('/fangzhou/cms/blog/listHotArticle', (data) => {
	var hotArticleList = data.datas.hotList;
	var html = '';
  if(hotArticleList.length === 0){
    html = `<p class='nodata hotarts'>暂无热门文章</p>`
  }else{
    hotArticleList.forEach((item) => {
      html += `<li class='art-list link-hot'><a class="clip" href="${host}/view/blog/article.html?id=${item.id}&columnId=${item.columnId}&pageSize=5">${item.title}</a></li>`;
    })
  }
	$(".article ul").html(html);
})

var columnId = getUrl.getVal('columnid') || 0;
var page = 1;
var pageSize = 5;
var articleList = [];


// 相关文字
function getText(val) {
	if (val && val.length > 0) {
		var str = '';
		val.forEach((item, i) => {
			if (item) {
				str += "<span class='keyword'>" + item + "</span>";
			}
		})
		return str ? '<i class="iconfont"></i>' + str : '';
	}
	return "";
}


var count = {
      '2001': 'productCount',
      '2003': 'caseCount',
      '2004': 'analysisCount',
      '2005': 'activityCount',
      '2006': 'mediaCount',
      '0': 'totalCount'
    }

//文章公用函数
function getArticle(isPage = false) {
	io.get('/fangzhou/cms/blog/list', {
		columnId: columnId,
		page: page,
		pageSize: pageSize
	}, (data) => {

		var res = data.datas.articleList;

		// 如果返回的数据条数小于pageSize的长度，则隐藏“加载更多”
		page*pageSize >= data.datas.count[count[columnId]] ? $(".getMore").hide() : $(".getMore").show();
    // if()
    var blogList = $("#blog-list");
		var str = '';
    if(res.length === 0 && !isPage){
      str = `<p class='nodata'>小舟正在补充中</p>`
    }else{
      res.forEach((item) => {
        str += `<li class='item'>
              <div class='item-hd link-article'>
                <a href="${host}/view/blog/article.html?id=${item.id}&columnId=${columnId}&pageSize=${pageSize}"><img src="${item.articleImage || '../../images/pub/img-error.png'}" alt='' onerror="this.src = '../../images/pub/img-error.png', this.onerror=null"/></a>
              </div>
              <div class='item-bd'>
                <div class='item-bd-cen'>
                  <div class='hd link-article-hd'><a href="${host}/view/blog/article.html?id=${item.id}&columnId=${columnId}&pageSize=${pageSize}">${item.title}</a></div>
                  <div class='bd'>${item.summary || ''}</div>
                  <div class='ft'>
                    ${item.author ? "<img src='../../images/blog/author.png' class='icon-img'>"+ item.author +"<span>" : ''}
                    <span>${new Date(item.articleDate).format('YYYY-MM-DD hh:mm')}</span>
                    <div class='tag'>${getText(item.label)}</div>
                  </div>
                </div>
              </div>
            </li>`;
      })
    }
    isPage ? blogList.append(str) : blogList.html(str);
    blogList.find('.keyword').unbind('click').on("click", function() {
      Event.emit("blog/search", $(this).html())
    })
	})
}
getArticle();

$('[data-columnId=' + columnId + ']').addClass('act')

$(".blogTab li").on("click", function() {
	$(".blogTab li").removeClass("act");
	$(this).addClass("act");
	columnId = $(this).attr('data-columnId');
	page = 1;
	getArticle();
	history.pushState({}, document.title, `?columnid=${columnId}`);
})

$(".getMore").on("click", function() {
	page++;
	getArticle(true);
})



var imgIndex = 0;
var time = null;
var bannerLen = 0;

function timeInit() {
	time = setInterval(()=> {
		if (imgIndex == bannerLen) imgIndex = 0;
		slide(imgIndex);
		imgIndex++;
	}, 4000)
}

$('.banner-images').hover(() => clearInterval(time), () => timeInit());

// 轮播图左右滑动
function slide(index) {
	var banne = $('.banner-images');
	$(".bannerDot").removeClass('act').eq(index).addClass('act');
	banne.find('.img-box').hide().eq(index).show();
}



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
  	getHeight();
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
