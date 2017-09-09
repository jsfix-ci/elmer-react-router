'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ElmerRouter = exports.ERFN = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ElmerReactRouter = require('./core/ElmerReactRouter');

var _ElmerReactRouter2 = _interopRequireDefault(_ElmerReactRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commonFunction = require('./core/function');

var ERFN = exports.ERFN = _extends({}, commonFunction);
var ElmerRouter = exports.ElmerRouter = _ElmerReactRouter2.default;
exports.default = ElmerRouter;