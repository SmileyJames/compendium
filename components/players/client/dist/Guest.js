"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _emoji = _interopRequireWildcard(require("@compendium/emoji"));

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Row = _styledComponents["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  text-align: center;\n"])));

var Main = _styledComponents["default"].main(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;d\n"])));

var Input = _styledComponents["default"].input(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  border-radius: 0.2em;\n  border: solid 1px grey;\n  padding: 0.3em 0.6em;\n  margin: 0.6em\n"])));

var Button = _styledComponents["default"].button(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  border-radius: 0.2em;\n  background-color: rgb(10, 50, 200);\n  color: white;\n  border: solid 1px grey;\n  padding: 0.3em 0.6em;\n  margin: 0.6em\n"])));

var SmallSquare = _styledComponents["default"].div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  width: 10em;\n  height: 10em;\n  margin: 0 auto;\n"])));

var JoinScreen = function JoinScreen(_ref) {
  var moves = _ref.moves;

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      name = _useState2[0],
      setName = _useState2[1];

  var _useState3 = (0, _react.useState)('😎'),
      _useState4 = _slicedToArray(_useState3, 2),
      emoji = _useState4[0],
      setEmoji = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      pickerIsShown = _useState6[0],
      setPickerIsShown = _useState6[1];

  var showPicker = function showPicker() {
    return setPickerIsShown(true);
  };

  var hidePicker = function hidePicker() {
    return setPickerIsShown(false);
  };

  var join = function join() {
    moves.joinAsAPlayer({
      name: name,
      emoji: emoji
    });
  };

  var onSelectEmoji = function onSelectEmoji(emoji) {
    setEmoji(emoji);
    hidePicker();
  };

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, pickerIsShown && /*#__PURE__*/_react["default"].createElement(_emoji.EmojiPicker, {
    onHide: hidePicker,
    onSelectEmoji: onSelectEmoji
  }), /*#__PURE__*/_react["default"].createElement(Main, null, /*#__PURE__*/_react["default"].createElement(SmallSquare, {
    tabindex: true,
    onKeyPress: showPicker,
    onClick: showPicker
  }, /*#__PURE__*/_react["default"].createElement(_emoji["default"], {
    emoji: emoji
  })), /*#__PURE__*/_react["default"].createElement(Row, null, /*#__PURE__*/_react["default"].createElement("h1", null, name)), /*#__PURE__*/_react["default"].createElement(Row, null, /*#__PURE__*/_react["default"].createElement("label", null, "Nickname", /*#__PURE__*/_react["default"].createElement(Input, {
    onChange: function onChange(e) {
      return setName(e.target.value);
    },
    value: name
  }))), /*#__PURE__*/_react["default"].createElement(Row, null, /*#__PURE__*/_react["default"].createElement(Button, {
    onKeyPress: join,
    onClick: join
  }, "Sit down to Play"))));
};

var Spectator = function Spectator() {
  return /*#__PURE__*/_react["default"].createElement("h1", null, "You are a Spectator");
};

var Waiting = function Waiting() {
  return /*#__PURE__*/_react["default"].createElement("h1", null, "Be patient, the host is setting up your game.");
};

var findConnectionIsPlayer = function findConnectionIsPlayer(_ref2) {
  var players = _ref2.players,
      connectionId = _ref2.connectionId;
  return players.findIndex(function (player) {
    return player.connectionId === connectionId;
  }) > -1;
};

var checkIfGameIsFull = function checkIfGameIsFull(_ref3) {
  var players = _ref3.state.players;
  return players.list.length > players.maxPlayers;
};

var Guest = function Guest(_ref4) {
  var children = _ref4.children,
      state = _ref4.state,
      roomId = _ref4.roomId,
      moves = _ref4.moves,
      connectionId = _ref4.connectionId;

  if (!state.players) {
    return /*#__PURE__*/_react["default"].createElement(Waiting, null);
  }

  var isPlayer = findConnectionIsPlayer({
    players: state.players.list,
    connectionId: connectionId
  });

  if (state.players.everyonesIn) {
    return isPlayer ? children : /*#__PURE__*/_react["default"].createElement(Spectator, null);
  } else {
    var gameIsFull = checkIfGameIsFull({
      state: state
    });
    return isPlayer || gameIsFull ? /*#__PURE__*/_react["default"].createElement(Waiting, null) : /*#__PURE__*/_react["default"].createElement(JoinScreen, {
      moves: moves
    });
  }
};

var _default = Guest;
exports["default"] = _default;