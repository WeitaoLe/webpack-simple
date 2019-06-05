import Vue from 'vue';
import Event from 'js/common/event';
import io from 'js/common/request';
import 'js/common/tool/formatDate';

var app = new Vue({
	el: '#searchBlog',
	data: {

		// 显示与隐藏
		show: false,

		// 文本框vaule
		inputVal: '',

		// list data
		list: [],

		listHot: [],

		// loading
		loading: false,

		// data none
		datenone: false,

		hotDisply: true,

		columnId: 0,

		page: 1,

		pageSize: 5,

		selCount: 'totalCount',

		// 数量
		count: {
			productCount: 0,
            caseCount: 0,
            analysisCount: 0,
            activityCount: 0,
            mediaCount: 0,
            totalCount: 0
		}
	},
	watch: {
		inputVal(v) {
			if (v) {
				this.page = 1;
				this.searchValue(false);
			} else {
				this.hotDisply = true;
				this.start();
			}
		}
	},
	mounted() {
		Event.on('blog/search', (name = '') => {
			this.display();
			this.inputVal = name;
		})

		io.get('/fangzhou/cms/blog/listHotSearch', (data)=> {
			this.listHot = data.datas.keyList
		})
	},
	methods: {

		// 展开/收起help
		display() {
			var body = document.querySelector('body');
			var className = body.className;
			if (this.show) {
				this.show = false;
				body.className = className.replace(/ body-search/, '');
				this.inputVal = '';
			} else {
				this.show = true;
				body.className = className + ' body-search';
			}
		},

		start() {
			this.selCount = 'totalCount';
			this.columnId = 0;
			this.list = [];
		},

		// 搜索
		searchValue(isPage) {
			if (!this.inputVal) return;
			this.hotDisply = false;
			io.get('/fangzhou/cms/blog/list', {
				columnId: this.columnId,
				search: this.inputVal,
				page: this.page,
				pageSize: this.pageSize
			}, (data) => {
				var list = data.datas.articleList;
				for (var i = 0, len = list.length; i < len; i++) {
					list[i].title = list[i].title.replace(new RegExp(this.inputVal, 'g'), '<b style="color:#0098e1">'+ this.inputVal +'</b>');
					list[i].summary = list[i].summary ? list[i].summary.replace(new RegExp(this.inputVal, 'g'), '<b style="color:#0098e1">'+ this.inputVal +'</b>') : '';
					list[i].label = (function() {
						var val = list[i].label;
						if (val && val.length > 0) {
							var str = [];
							val.forEach((item, i) => {
								if (item) {
									//str += "<span class='keyword'>" + item + "</span>";
									str.push(item);
								}
							})
							return str.length > 0 ? str : null;
						}
						return null;
					})()

					if (isPage) {
						this.list.push(list[i]);
					}
				}

				if (!isPage) {
					this.list = list;
				};

				this.count = data.datas.count;
				list.length == 0 ? this.datenone = true : this.datenone = false;
			})

			// sdk埋点
			// fz.event({
		 //      EI: 'Search',   
		 //      EPD: {Keyword: this.inputVal, columnId: this.columnId}
		 //   })
		},

		// 切换
		countTab(name, id) {
			this.selCount = name;
			this.columnId = id;
			this.page = 1;
			this.searchValue(false)
		},

		// 分页
		loadingMore() {
			this.page++;
			this.searchValue(true);
		},

		inputKeyup() {
			console.log(this.inputVal)
		}
	}
})