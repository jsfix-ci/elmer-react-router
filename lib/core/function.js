'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// -------------------------------
//                               |
//   此模块参数只可在web前端使用   |
//                               |
// -------------------------------

/**
 * 获取浏览器地址参数
 * @param {string} keyWords 关键词
 * @return {string} 返回参数值
 */
var getUriParam = exports.getUriParam = function getUriParam(keyWords) {
    var queryString = window.location.search || '';
    var newQuery = queryString.replace(/^\?/, '').replace(/#.*?/, '');
    var queryArr = newQuery.split('&');
    var result = null;
    for (var key in queryArr) {
        var tmpQuery = queryArr[key];
        var tmpSearch = tmpQuery.match(/^(.*?)=(.*?)$/);
        if (tmpSearch && tmpSearch.length > 2 && keyWords.toLowerCase() === tmpSearch[1].toLowerCase()) {
            result = tmpSearch[2];
        }
    }
    return result;
};
var getUriHash = exports.getUriHash = function getUriHash(keyWords) {
    var hashQuery = window.location.hash;
    var newQuery = hashQuery.replace(/^#/, '');
    var queryArr = newQuery.split('&');
    var result = null;
    for (var key in queryArr) {
        var tmpQuery = queryArr[key];
        var tmpSearch = tmpQuery.match(/^(.*?)=(.*?)$/);
        if (tmpSearch && tmpSearch.length > 2 && keyWords.toLowerCase() === tmpSearch[1].toLowerCase()) {
            result = tmpSearch[2];
        }
    }
    return result;
};

var getDefaultValue = exports.getDefaultValue = function getDefaultValue(value, defaultValue) {
    if (isString(value)) {
        return value.length > 0 ? value : defaultValue;
    } else if (value === undefined || value === null) {
        return defaultValue;
    } else {
        return value;
    }
};

var isString = exports.isString = function isString(value) {
    return getType(value) === '[object String]';
};

var getType = exports.getType = function getType(value) {
    return Object.prototype.toString.call(value);
};

var isArray = exports.isArray = function isArray(value) {
    return getType(value) === '[object Array]';
};

var isNumber = exports.isNumber = function isNumber(value) {
    return getType(value) === '[object Number]';
};

var isObject = exports.isObject = function isObject(value) {
    return getType(value) === '[object Object]';
};

var isDomElement = exports.isDomElement = function isDomElement(value) {
    return (/^(\[object)\s{1}(HTML)[a-zA-Z]*(Element\])$/.test(getType(value))
    );
};

var isNodeList = exports.isNodeList = function isNodeList(value) {
    return getType(value) === '[object NodeList]';
};

var isFunction = exports.isFunction = function isFunction(value) {
    return getType(value) === '[object Function]';
};