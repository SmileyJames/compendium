(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{1061:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),components_playing_card__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(34),rebass_styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(9),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(2),DealControls=function DealControls(_ref){var moves=_ref.moves;return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(rebass_styled_components__WEBPACK_IMPORTED_MODULE_2__.Button,{onClick:function onClick(){return moves.deal()},children:"Deal"})},CardTable=function CardTable(_ref2){var state=_ref2.state;return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(components_playing_card__WEBPACK_IMPORTED_MODULE_1__.b,{children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(components_playing_card__WEBPACK_IMPORTED_MODULE_1__.e,{colour:"R"}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(components_playing_card__WEBPACK_IMPORTED_MODULE_1__.c,{children:state.discard&&state.discard.map((function(_ref3){var suit=_ref3.suit,value=_ref3.value;return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(components_playing_card__WEBPACK_IMPORTED_MODULE_1__.h,{suit:suit,value:value})}))})]})},Host=function Host(_ref5){var _state$deck,state=_ref5.state,moves=_ref5.moves;return function useStartGame(_ref4){var moves=_ref4.moves,state=_ref4.state;Object(react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){null==state.deck&&moves.startGame()}),[state,moves])}({moves:moves,state:state}),(null===(_state$deck=state.deck)||void 0===_state$deck?void 0:_state$deck.length)?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(DealControls,{moves:moves}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(CardTable,{state:state})};Host.__docgenInfo={description:"",methods:[],displayName:"Host"},__webpack_exports__.default=Host,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/games/whist/client/Host.js"]={name:"Host",docgenInfo:Host.__docgenInfo,path:"src/games/whist/client/Host.js"})}}]);