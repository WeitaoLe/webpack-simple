/**
 * @Author:      hry
 * @Description: 消息存放中心
 */

'use strict';

function events() {}

var __proto__ = events.prototype;

__proto__._listeners = {};

__proto__.on = function(type, fn) {
	if (typeof this._listeners[type] === "undefined") {
		this._listeners[type] = [];
	}
	if (typeof fn === "function") {
		this._listeners[type].push(fn);
	}
	return this;
}

__proto__.emit = function(type, obj) {
	var arrayEvent = this._listeners[type];
	if (arrayEvent instanceof Array) {
		for (var i = 0, length = arrayEvent.length; i < length; i++) {
			if (typeof arrayEvent[i] === "function") {
				arrayEvent[i](obj);
			}
		}
	}
	return this;
}

// var events = new events();

// function Data() {}

// var proto_ = Data.prototype;

// proto_.get = function(name) {
// 	return this[name];
// }

// proto_.set = function(name, obj) {
// 	this[name] = obj;
// 	events.emit(name, obj)
// }

// proto_.sub = function(name, fn) {
// 	var obj = this[name];
// 	events.on(name, function(obj) {
// 		fn(obj);
// 	})
// }

// module.exports = new Data();
module.exports = new events();