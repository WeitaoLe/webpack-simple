import Vue from 'vue';
import formatDate from 'js/common/tool/formatDate';

/**
 * @param {String} fmt 可选，定义格式化格式
 */
Vue.filter('formatDate',formatDate);

// {{value | formatDate('yy/MM/dd hh:mm:ss')}}
