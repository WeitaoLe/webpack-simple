// hry


'use strict';


function message() {}

var _prot_ = message.prototype;

_prot_._html = function(type, text) {

	return '<span class="' + type + ' fonticon"></span>' + text;
}

// 给message添加info error等方法

var _type_ = ['info', 'error', 'success', 'warning'];

_type_.forEach(function(v, i) {
	_prot_[v] = function(text, duration, onClose) {
		if (typeof duration === 'function') {
			onClose = duration;
			duration == undefined;
		};

		// 获取duration
		var durations = (function() {

			if (!isNaN(duration)) {
				return duration;
			}
			return 2000
		})();

		var div = document.createElement('div');

		div.setAttribute("class", 'e-message fadeInDown ' + v);

		div.innerHTML = this._html(v, text);

		document.querySelector('body').appendChild(div);

		setTimeout(function() {

			div.className = 'e-message fadeInTopOut ' + v;

			setTimeout(function() {
				div.parentNode.removeChild(div);
				onClose && onClose();
			}, 600)
		}, durations);

	}
})


module.exports = new message();