"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Main = _styledComponents["default"].main(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: flex;\n"])));

var Section = _styledComponents["default"].section(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  flex-grow: 1; \n"])));

var Article = _styledComponents["default"].article(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  flex-grow: 3; \n"])));

var Item = _styledComponents["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  padding: .4em;\n  border: solid 1px gray;\n"])));

var Button = _styledComponents["default"].button(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n\n"])));

var checkIfCanStartGame = function checkIfCanStartGame(_ref) {
  var players = _ref.state.players;
  return players.list.length >= players.minPlayers;
};

var PlayerList = function PlayerList(_ref2) {
  var children = _ref2.children,
      players = _ref2.players;
  return /*#__PURE__*/_react["default"].createElement(Main, null, /*#__PURE__*/_react["default"].createElement(Section, null, players.map(function (_ref3, index) {
    var name = _ref3.name,
        emoji = _ref3.emoji;
    return /*#__PURE__*/_react["default"].createElement(Item, {
      key: index
    }, name);
  })), /*#__PURE__*/_react["default"].createElement(Article, null, children));
};

var HowToJoin = function HowToJoin(_ref4) {
  var roomId = _ref4.roomId;
  return /*#__PURE__*/_react["default"].createElement("h1", null, "Join: ", roomId);
};

var Host = function Host(_ref5) {
  var state = _ref5.state,
      roomId = _ref5.roomId,
      moves = _ref5.moves,
      connections = _ref5.connections,
      children = _ref5.children;
  (0, _react.useEffect)(function () {
    return (moves === null || moves === void 0 ? void 0 : moves.initPlayers) && moves.initPlayers();
  }, [moves]);
  if (!state.players) return null;
  if (state.players.everyonesIn) return children;
  var canStartGame = checkIfCanStartGame({
    state: state
  });
  return /*#__PURE__*/_react["default"].createElement(PlayerList, {
    players: state.players.list
  }, /*#__PURE__*/_react["default"].createElement(HowToJoin, {
    roomId: roomId
  }), canStartGame && /*#__PURE__*/_react["default"].createElement(Button, {
    onClick: function onClick() {
      return moves.startGame();
    },
    onKeyPress: function onKeyPress() {
      return moves.startGame();
    }
  }, "Start Game"));
};

var _default = Host;
exports["default"] = _default;