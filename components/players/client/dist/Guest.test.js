"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@testing-library/react");

var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));

var _Guest = _interopRequireDefault(require("./Guest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

jest.mock("@compendium/emoji", function () {
  return jest.fn(function () {
    return null;
  });
});
var moves = {
  joinAsAPlayer: jest.fn()
};
describe("Players Guest component", function () {
  test("Join game", function () {
    var state = {
      players: {
        maxPlayers: 4,
        minPlayers: 4,
        everyonesIn: false,
        list: []
      }
    };

    var _render = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Guest["default"], {
      roomId: "xxx",
      connectionId: "aaa",
      state: state,
      moves: moves
    }, /*#__PURE__*/_react["default"].createElement("h1", null, "Hello world"))),
        getByText = _render.getByText,
        getByLabelText = _render.getByLabelText,
        fireEvent = _render.fireEvent;

    _userEvent["default"].type(getByLabelText("Nickname"), "Matt");

    _userEvent["default"].click(getByText("Sit down to Play"));

    expect(moves.joinAsAPlayer).toHaveBeenCalledWith({
      name: "Matt",
      emoji: '😎'
    });
  });
});