'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('colors');

var _function = require('./function');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import { connect } from 'react-redux';


var ElmerReactRouter = function (_Component) {
    _inherits(ElmerReactRouter, _Component);

    function ElmerReactRouter(props) {
        _classCallCheck(this, ElmerReactRouter);

        var _this = _possibleConstructorReturn(this, (ElmerReactRouter.__proto__ || Object.getPrototypeOf(ElmerReactRouter)).call(this, props));

        _this.route = _this.getRoute();
        _this.getUrlRoute = _this.getUrlRoute.bind(_this);
        _this.getPageKey = _this.getPageKey.bind(_this);
        _this.setConfig('redirectRouter', props.redirectRouter);
        _this.isMobile = _this.isMobile.bind(_this);
        _this.getCurrentPageKey = _this.getCurrentPageKey.bind(_this);
        _this.extendProps = function () {
            var lang = (0, _function.getDefaultValue)((0, _function.getUriParam)('lang'), 'zh');
            var PageID = _this.getPageKey();
            var properties = _extends({}, _this.props, {
                lang: lang,
                PageID: PageID,
                route: _this.route
            });
            return properties;
        }();
        _this.Container = _this.props.setPageContainer && _this.props.setPageContainer(_this.extendProps);
        if (props.debug) {
            var keys = (0, _function.isObject)(props.pages) ? Object.keys(props.pages) : props.pages;
            var cKeys = (0, _function.isObject)(props.statePages) ? Object.keys(props.statePages) : props.statePages;
            console.log('Router------>AllPageList'.red);
            keys.map(function (Pagekey) {
                console.log(('Router------>Page:' + Pagekey).red);
            });
            console.log('Router------>AllStatePageList'.red);
            cKeys.map(function (cPagekey) {
                console.log(('Router------>Page:' + cPagekey).red);
            });
        }
        return _this;
    }

    _createClass(ElmerReactRouter, [{
        key: 'isMobile',
        value: function isMobile(value) {
            var userAgent = value || window.navigator.userAgent.toString();
            return (/(iPhone|Android)/.test(userAgent)
            );
        }
    }, {
        key: 'setConfig',
        value: function setConfig(key, value) {
            window.elmer = window.elmer || {};
            var routerConfig = window.elmer.router || {};
            routerConfig[key] = value;
            window.elmer.router = routerConfig;
        }
    }, {
        key: 'getOverrideUri',
        value: function getOverrideUri() {
            var app = (0, _function.getUriHash)('app');
            var mod = (0, _function.getUriHash)('mod');
            var page = (0, _function.getUriHash)('page');
            if (app && app.length > 0) {
                var appStr = (0, _function.getDefaultValue)(app, 'Index');
                var modStr = (0, _function.getDefaultValue)(mod, 'Index');
                var pageStr = (0, _function.getDefaultValue)(page, 'Index');
                return {
                    app: ['App', appStr.substr(0, 1).toUpperCase(), appStr.substr(1)].join(''),
                    mod: ['Mod', modStr.substr(0, 1).toUpperCase(), modStr.substr(1)].join(''),
                    page: ['Page', pageStr.substr(0, 1).toUpperCase(), pageStr.substr(1)].join('')
                };
            } else {
                return null;
            }
        }
    }, {
        key: 'getUrlRoute',
        value: function getUrlRoute() {
            var app = (0, _function.getUriParam)('app');
            var mod = (0, _function.getUriParam)('mod');
            var page = (0, _function.getUriParam)('page');
            var result = {};
            if (app !== undefined && app !== null && (0, _function.isString)(app) && app.length > 0) {
                result = {
                    app: app,
                    mod: (0, _function.isString)(mod) && mod.length > 0 ? mod : 'Index',
                    page: (0, _function.isString)(page) && page.length > 0 ? page : 'Index'
                };
                result.app = ['App', result.app.substr(0, 1).toUpperCase(), result.app.substr(1)].join('');
                result.mod = ['Mod', result.mod.substr(0, 1).toUpperCase(), result.mod.substr(1)].join('');
                result.page = ['Page', result.page.substr(0, 1).toUpperCase(), result.page.substr(1)].join('');
            } else {
                result = null;
            }
            return result;
        }
    }, {
        key: 'getPathRoute',
        value: function getPathRoute() {
            var curPath = window.location.pathname;
            var arrStr = /^\//.test(curPath) ? curPath.substr(1) : curPath;
            var curArr = arrStr.length > 0 ? arrStr.split('/') : [];
            var routeResult = {
                app: '',
                mod: '',
                page: ''
            };
            if (this.props.redirectRouter) {
                var defaultAppRoute = this.isMobile() ? 'AppMobile' : 'AppIndex';
                routeResult.app = (0, _function.isString)(curArr[0]) && curArr[0].length > 0 ? ['App', curArr[0].substr(0, 1).toUpperCase(), curArr[0].substr(1)].join('') : defaultAppRoute;
                routeResult.mod = (0, _function.isString)(curArr[1]) && curArr[1].length > 0 ? ['Mod', curArr[1].substr(0, 1).toUpperCase(), curArr[1].substr(1)].join('') : 'ModIndex';
                routeResult.page = (0, _function.isString)(curArr[2]) && curArr[2].length > 0 ? ['Page', curArr[2].substr(0, 1).toUpperCase(), curArr[2].substr(1)].join('') : 'PageIndex';
            } else {
                routeResult = null;
            }
            return routeResult;
        }
    }, {
        key: 'getRoute',
        value: function getRoute() {
            var routeResult = this.getPathRoute();
            var overrideResult = this.getOverrideUri();
            var urlResult = this.getUrlRoute();
            var result = overrideResult || routeResult || urlResult;
            var routeData = result || {
                app: this.isMobile() ? 'AppMobile' : 'AppIndex',
                mod: 'ModIndex',
                page: 'PageIndex'
            };
            this.props.debug && console.log(('Router:------>route.app:' + routeData.app + ' route.mod:' + routeData.mod + ' route.page:' + routeData.page).red);
            return routeData;
        }
    }, {
        key: 'getPageKey',
        value: function getPageKey() {
            var pages = this.props.pages;
            var _route = this.route,
                app = _route.app,
                mod = _route.mod,
                page = _route.page;

            var pageKey = [app, mod, page].join('');
            var page404Key = [app, mod, 'Page404'].join('');
            var currentPageKey = this.getCurrentPageKey(pageKey);
            var result = pageKey;
            this.props.debug && console.log(('Router:------>Page Key:' + pageKey).red);
            if (currentPageKey === undefined || currentPageKey === null) {
                result = (0, _function.isArray)(pages) ? pages.indexOf(page404Key) >= 0 ? page404Key : null : (0, _function.isObject)(pages[page404Key]) ? page404Key : null;
                this.props.debug && console.log(('Router:------>error page key:' + page404Key).red);
            }
            return result;
        }
    }, {
        key: 'getCurrentPageKey',
        value: function getCurrentPageKey(pageKey) {
            var _props = this.props,
                pages = _props.pages,
                statePages = _props.statePages;

            var statePageKey = [pageKey, 'Container'].join('');
            var currentPageKey = null;
            var stateExists = (0, _function.isArray)(statePages) ? statePages.indexOf(statePageKey) >= 0 : (0, _function.isObject)(statePages[statePageKey]);
            if (!stateExists) {
                var pageExists = (0, _function.isArray)(pages) ? pages.indexOf(pageKey) >= 0 : (0, _function.isObject)(pages[pageKey]);
                currentPageKey = pageExists ? pageKey : null;
            } else {
                currentPageKey = statePageKey;
            }
            return currentPageKey;
        }
    }, {
        key: 'getChildrenContext',
        value: function getChildrenContext(nextProps) {
            var children = this.props.children;

            var ChildrenElement = function () {
                var resultElement = '';
                if ((0, _function.isArray)(children)) {
                    resultElement = [];
                    children && children.map(function (item, index) {
                        var result = null;
                        if (_react2.default.isValidElement(item) && (0, _function.isFunction)(item.type)) {
                            result = _react2.default.cloneElement(item, _extends({
                                key: index
                            }, nextProps));
                        } else {
                            result = item;
                        }
                        resultElement.push(result);
                    });
                } else if ((0, _function.isObject)(children) && ((0, _function.isString)(children.type) || (0, _function.isFunction)(children.type))) {
                    if ((0, _function.isFunction)(children.type)) {
                        if (_react2.default.isValidElement(children)) {
                            resultElement = _react2.default.cloneElement(children, _extends({}, nextProps));
                        } else {
                            resultElement = '';
                        }
                    } else if ((0, _function.isString)(children.type)) {
                        resultElement = children;
                    }
                } else if ((0, _function.isString)(children)) {
                    resultElement = children;
                }
                return resultElement;
            }();
            return ChildrenElement;
        }
    }, {
        key: 'render',
        value: function render() {
            return this.Container || _react2.default.createElement(
                'span',
                null,
                'You should be set page container by Router setPageContainer property'
            );
        }
    }]);

    return ElmerReactRouter;
}(_react.Component);

ElmerReactRouter.propTypes = {
    pages: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]).isRequired,
    redirectRouter: _propTypes2.default.bool.isRequired,
    statePages: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]).isRequired,
    children: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.node]),
    debug: _propTypes2.default.bool,
    setPageContainer: _propTypes2.default.func
};

ElmerReactRouter.defaultProps = {
    redirectRouter: true,
    debug: true
};

exports.default = ElmerReactRouter;