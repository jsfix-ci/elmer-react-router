import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getDefaultValue, getUriHash, getUriParam, isString } from './function';

class ElmerReactRouter extends Component {
    constructor (props) {
        super(props);
        this.route = this.getRoute();
        this.getUrlRoute = this.getUrlRoute.bind(this);
        this.getPage = this.getPage.bind(this);
        this.setConfig('redirectRouter', props.redirectRouter);
        this.isMobile = this.isMobile.bind(this);
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
        return result || {
            app: this.isMobile() ? 'AppMobile' : 'AppIndex',
            mod: 'ModIndex',
            page: 'PageIndex'
        };
    }
    getPage () {
        const { pages, statePages } = this.props;
        const { app, mod, page } = this.route;
        const pageKey = [app, mod, page].join('');
        const page404Key = [app, mod, 'Page404'].join('');
        let result = statePages[pageKey] || pages[pageKey];
        if (!result && pages[page404Key]) {
            result = pages[page404Key];
        } else {
            result = (<div><span>404</span><i>Page Not Found</i></div>);
        }
        return result;
    }
    render () {
        const lang = getDefaultValue(getUriParam('lang'), 'zh');
        const PageData = this.getPage;
        const properties = {
            ...this.props,
            lang,
            route: this.route
        };
        return (<PageData {...properties} />);
    }
}

ElmerReactRouter.propTypes = {
    pages: PropTypes.object.isRequired,
    redirectRouter: PropTypes.bool.isRequired,
    statePages: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.node
    ])
};

ElmerReactRouter.defaultProps = {
    redirectRouter: true
};

export default ElmerReactRouter;
