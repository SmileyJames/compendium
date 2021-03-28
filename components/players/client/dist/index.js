"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Host", {
  enumerable: true,
  get: function get() {
    return _Host["default"];
  }
});
Object.defineProperty(exports, "Guest", {
  enumerable: true,
  get: function get() {
    return _Guest["default"];
  }
});
exports.withHostPlayers = exports.withGuestPlayers = void 0;

var _react = _interopRequireDefault(require("react"));

var _Host = _interopRequireDefault(require("./Host"));

var _Guest = _interopRequireDefault(require("./Guest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var withGuestPlayers = function withGuestPlayers(Component) {
  return function (_ref) {
    var children = _ref.children,
        props = _objectWithoutProperties(_ref, ["children"]);

    return /*#__PURE__*/_react["default"].createElement(_Guest["default"], props, /*#__PURE__*/_react["default"].createElement(Component, props, children));
  };
};

exports.withGuestPlayers = withGuestPlayers;

var withHostPlayers = function withHostPlayers(Component) {
  return function (_ref2) {
    var children = _ref2.children,
        props = _objectWithoutProperties(_ref2, ["children"]);

    return /*#__PURE__*/_react["default"].createElement(_Host["default"], props, /*#__PURE__*/_react["default"].createElement(Component, props, children));
  };
};

exports.withHostPlayers = withHostPlayers;