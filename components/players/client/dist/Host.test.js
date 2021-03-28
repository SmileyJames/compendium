"use strict";

var _react = _interopRequireDefault(require("react"));

require("@testing-library/jest-dom");

var _react2 = require("@testing-library/react");

var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));

var _Host = _interopRequireDefault(require("./Host"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe("Players Host component", function () {
  test("Initialises state on mount", function () {
    var moves = {
      initPlayers: jest.fn()
    };
    (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Host["default"], {
      moves: moves,
      state: {}
    }));
    expect(moves.initPlayers).toHaveBeenCalled();
  });
  test("Start game when there is enough players", function () {
    var state = {
      players: {
        minPlayers: 2,
        maxPlayers: 2,
        list: [{}, {}],
        everyoneIsIn: false
      }
    };
    var moves = {
      initPlayers: jest.fn(),
      startGame: jest.fn()
    };

    var _render = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Host["default"], {
      moves: moves,
      state: state
    })),
        getByText = _render.getByText;

    _userEvent["default"].click(getByText("Start Game"));

    expect(moves.startGame).toHaveBeenCalled();
  });
  test("Cannot start game if not enough players", function () {
    var state = {
      players: {
        minPlayers: 2,
        maxPlayers: 2,
        list: [{}],
        everyoneIsIn: false
      }
    };
    var moves = {
      initPlayers: jest.fn(),
      startGame: jest.fn()
    };

    var _render2 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Host["default"], {
      moves: moves,
      state: state
    })),
        queryByText = _render2.queryByText;

    expect(queryByText("Start Game")).not.toBeInTheDocument();
  });
});