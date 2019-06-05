/**
 * jquery reqiest
 * Date: 2016-03-05
 */

import $ from 'jquery';

var io = {};

$.each(['get', 'post', 'jsonp'], function(i, v) {
    io[v] = function(url, datas, success, fail) {
        if (typeof datas == 'function') {
            fail = success;
            success = datas;
            datas = undefined;
        }

        // 如果是jsonp请求url自动带上callback
        if (v == 'jsonp') {
            v = 'getJSON';
            url = url + '?callback=?'
        }

        $[v](url, datas, function(data) {
            data.code == 0 ? success && success(data) : fail && fail(data);
        })
    }
})

io['json'] = function (url, datas, success, fail) {
    if (typeof datas == 'function') {
        fail = success;
        success = datas;
        datas = undefined;
    }

    $.ajax({
        url: url,
        data: datas ? JSON.stringify(datas) : undefined,
        type: 'POST',
        contentType: 'application/json',
        success: data => {
            data.code == 0 ? success && success(data) : fail && fail(data)
        }
    })
}

module.exports = io;