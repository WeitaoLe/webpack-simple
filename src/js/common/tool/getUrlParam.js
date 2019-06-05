/**
 * 获得浏览器参数值
 * 
 */
var URL = {
	getVal:function(key) {
	    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
 	    var result = window.location.search.substr(1).match(reg);
 	    return result ? decodeURIComponent(result[2]) : null;
	}	
}

module.exports = URL;

 // self.activityId = URL.getVal('activityId');