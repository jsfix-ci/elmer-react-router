import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'colors';
import {
    getDefaultValue,
    getUriHash,
    getUriParam,
    isString,
    isArray,
    isFunction,
    isObject
} from './function';

class ElmerReactRouter extends Component {
    constructor (props) {
        super(props);
        this.route = this.getRoute();
        this.getUrlRoute = this.getUrlRoute.bind(this);
        this.getPageKey = this.getPageKey.bind(this);
        this.setConfig('redirectRouter', props.redirectRouter);
        this.isMobile = this.isMobile.bind(this);
        this.getCurrentPageKey = this.getCurrentPageKey.bind(this);
        this.extendProps = (() => {
            const lang = getDefaultValue(getUriParam('lang'), 'zh');
            const PageID = this.getPageKey();
            const properties = {
                ...this.props,
                lang,
                PageID,
                route: this.route
            };
            return properties;
        })();
        this.Container = this.props.setPageContainer && this.props.setPageContainer(this.extendProps);
        if (props.debug) {
            const keys = isObject(props.pages) ? Object.keys(props.pages) : props.pages;
            const cKeys = isObject(props.statePages) ? Object.keys(props.statePages) : props.statePages;
            console.log('Router------>AllPageList'.red);
            keys.map((Pagekey) => {
                console.log(`Router------>Page:${Pagekey}`.red);
            });
            console.log('Router------>AllStatePageList'.red);
            cKeys.map((cPagekey) => {
                console.log(`Router------>Page:${cPagekey}`.red);
            });
        }
    }
    isMobile (value) {
        const userAgent = value || window.navigator.userAgent.toString();
        return /(iPhone|Android)/.test(userAgent);
    }
    setConfig (key, value) {
        window.elmer = window.elmer || {};
        const routerConfig = window.elmer.router || {};
        routerConfig[key] = value;
        window.elmer.router = routerConfig;
    }
    getOverrideUri () {
        const app = getUriHash('app');
        const mod = getUriHash('mod');
        const page = getUriHash('page');
        if (app && app.length > 0) {
            const appStr = getDefaultValue(app, 'Index');
            const modStr = getDefaultValue(mod, 'Index');
            const pageStr = getDefaultValue(page, 'Index');
            return {
                app: ['App', appStr.substr(0, 1).toUpperCase(), appStr.substr(1)].join(''),
                mod: ['Mod', modStr.substr(0, 1).toUpperCase(), modStr.substr(1)].join(''),
                page: ['Page', pageStr.substr(0, 1).toUpperCase(), pageStr.substr(1)].join('')
            };
        } else {
            return null;
        }
    }
    getUrlRoute () {
        const app = getUriParam('app');
        const mod = getUriParam('mod');
        const page = getUriParam('page');
        let result = {};
        if (app !== undefined && app !== null && isString(app) && app.length > 0) {
            result = {
                app,
                mod: isString(mod) && mod.length > 0 ? mod : 'Index',
                page: isString(page) && page.length > 0 ? page : 'Index'
            };
            result.app = ['App', result.app.substr(0, 1).toUpperCase(), result.app.substr(1)].join('');
            result.mod = ['Mod', result.mod.substr(0, 1).toUpperCase(), result.mod.substr(1)].join('');
            result.page = ['Page', result.page.substr(0, 1).toUpperCase(), result.page.substr(1)].join('');
        } else {
            result = null;
        }
        return result;
    }
    getPathRoute () {
        const curPath = window.location.pathname;
        const arrStr = /^\//.test(curPath) ? curPath.substr(1) : curPath;
        const curArr = arrStr.length > 0 ? arrStr.split('/') : [];
        let routeResult = {
            app: '',
            mod: '',
            page: ''
        };
        if (this.props.redirectRouter) {
            const defaultAppRoute = this.isMobile() ? 'AppMobile' : 'AppIndex';
            routeResult.app = isString(curArr[0]) && curArr[0].length > 0 ? ['App', curArr[0].substr(0, 1).toUpperCase(), curArr[0].substr(1)].join('') : defaultAppRoute;
            routeResult.mod = isString(curArr[1]) && curArr[1].length > 0 ? ['Mod', curArr[1].substr(0, 1).toUpperCase(), curArr[1].substr(1)].join('') : 'ModIndex';
            routeResult.page = isString(curArr[2]) && curArr[2].length > 0 ? ['Page', curArr[2].substr(0, 1).toUpperCase(), curArr[2].substr(1)].join('') : 'PageIndex';
        } else {
            routeResult = null;
        }
        return routeResult;
    }
    getRoute () {
        const routeResult = this.getPathRoute();
        const overrideResult = this.getOverrideUri();
        const urlResult = this.getUrlRoute();
        const result = overrideResult || routeResult || urlResult;
        const routeData = result || {
            app: this.isMobile() ? 'AppMobile' : 'AppIndex',
            mod: 'ModIndex',
            page: 'PageIndex'
        };
        this.props.debug && console.log(`Router:------>route.app:${routeData.app} route.mod:${routeData.mod} route.page:${routeData.page}`.red);
        return routeData;
    }
    getPageKey () {
        const { pages } = this.props;
        const { app, mod, page } = this.route;
        const pageKey = [app, mod, page].join('');
        const page404Key = [app, mod, 'Page404'].join('');
        let currentPageKey = this.getCurrentPageKey(pageKey);
        let result = pageKey;
        this.props.debug && console.log(`Router:------>Page Key:${pageKey}`.red);
        if (currentPageKey === undefined || currentPageKey === null) {
            result = isArray(pages) ? (pages.indexOf(page404Key) >= 0 ? page404Key : null) : (isObject(pages[page404Key]) ? page404Key : null);
            this.props.debug && console.log(`Router:------>error page key:${page404Key}`.red);
        }
        return result;
    }
    getCurrentPageKey (pageKey) {
        const { pages, statePages } = this.props;
        const statePageKey = [pageKey, 'Container'].join('');
        let currentPageKey = null;
        const stateExists = isArray(statePages) ? statePages.indexOf(statePageKey) >= 0 : isObject(statePages[statePageKey]);
        if (!stateExists) {
            const pageExists = isArray(pages) ? pages.indexOf(pageKey) >= 0 : isObject(pages[pageKey]);
            currentPageKey = pageExists ? pageKey : null;
        } else {
            currentPageKey = statePageKey;
        }
        return currentPageKey;
    }
    getChildrenContext (nextProps) {
        const { children } = this.props;
        const ChildrenElement = (() => {
            let resultElement = '';
            if (isArray(children)) {
                resultElement = [];
                children && children.map((item, index) => {
                    let result = null;
                    if (React.isValidElement(item) && isFunction(item.type)) {
                        result = React.cloneElement(item, {
                            key: index,
                            ...nextProps
                        });
                    } else {
                        result = item;
                    }
                    resultElement.push(result);
                });
            } else if (isObject(children) && (isString(children.type) || isFunction(children.type))) {
                if (isFunction(children.type)) {
                    if (React.isValidElement(children)) {
                        resultElement = React.cloneElement(children, { ...nextProps });
                    } else {
                        resultElement = '';
                    }
                } else if (isString(children.type)) {
                    resultElement = children;
                }
            } else if (isString(children)) {
                resultElement = children;
            }
            return resultElement;
        })();
        return ChildrenElement;
    }
    render () {
        return this.Container || (<span>You should be set page container by Router setPageContainer property</span>);
    }
}

ElmerReactRouter.propTypes = {
    pages: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]).isRequired,
    redirectRouter: PropTypes.bool.isRequired,
    statePages: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]).isRequired,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.node
    ]),
    debug: PropTypes.bool,
    setPageContainer: PropTypes.func
};

ElmerReactRouter.defaultProps = {
    redirectRouter: true,
    debug: true
};

export default ElmerReactRouter;
