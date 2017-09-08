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
export const getUriParam = (keyWords) => {
    const queryString = window.location.search || '';
    const newQuery = queryString.replace(/^\?/, '').replace(/#.*?/, '');
    const queryArr = newQuery.split('&');
    let result = null;
    for (const key in queryArr) {
        const tmpQuery = queryArr[key];
        const tmpSearch = tmpQuery.match(/^(.*?)=(.*?)$/);
        if (tmpSearch && tmpSearch.length > 2 && keyWords.toLowerCase() === tmpSearch[1].toLowerCase()) {
            result = tmpSearch[2];
        }
    }
    return result;
};
export const getUriHash = (keyWords) => {
    const hashQuery = window.location.hash;
    const newQuery = hashQuery.replace(/^#/, '');
    const queryArr = newQuery.split('&');
    let result = null;
    for (const key in queryArr) {
        const tmpQuery = queryArr[key];
        const tmpSearch = tmpQuery.match(/^(.*?)=(.*?)$/);
        if (tmpSearch && tmpSearch.length > 2 && keyWords.toLowerCase() === tmpSearch[1].toLowerCase()) {
            result = tmpSearch[2];
        }
    }
    return result;
};

export const getDefaultValue = (value, defaultValue) => {
    if (isString(value)) {
        return value.length > 0 ? value : defaultValue;
    } else if (value === undefined || value === null) {
        return defaultValue;
    } else {
        return value;
    }
};

export const isString = (value) => {
    return getType(value) === '[object String]';
};

export const getType = (value) => {
    return Object.prototype.toString.call(value);
};
