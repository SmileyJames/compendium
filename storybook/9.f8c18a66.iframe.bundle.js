(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{1054:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var _home_runner_work_compendium_compendium_yarn_cache_babel_runtime_npm_7_12_1_b069f70b16_979d1c099c_zip_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(3),_Client__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__(0),__webpack_require__(966)),rebass_styled_components__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(10),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(2),Host=function Host(props){return props.connections.length<1?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(rebass_styled_components__WEBPACK_IMPORTED_MODULE_3__.Flex,{justifyContent:"center",p:4,children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(rebass_styled_components__WEBPACK_IMPORTED_MODULE_3__.Text,{fontSize:4,children:["Join: ",Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span",{children:props.roomId})]})}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_Client__WEBPACK_IMPORTED_MODULE_2__.a,Object(_home_runner_work_compendium_compendium_yarn_cache_babel_runtime_npm_7_12_1_b069f70b16_979d1c099c_zip_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a)({orientation:"black"},props))};Host.__docgenInfo={description:"",methods:[],displayName:"Host"},__webpack_exports__.default=Host,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/games/chess/client/Host.js"]={name:"Host",docgenInfo:Host.__docgenInfo,path:"src/games/chess/client/Host.js"})},966:function(module,__webpack_exports__,__webpack_require__){"use strict";var _home_runner_work_compendium_compendium_yarn_cache_babel_runtime_npm_7_12_1_b069f70b16_979d1c099c_zip_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(58),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(0),chessboardjsx__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(978),chessboardjsx__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(chessboardjsx__WEBPACK_IMPORTED_MODULE_2__),chess_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(343),chess_js__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(chess_js__WEBPACK_IMPORTED_MODULE_3__),rebass_styled_components__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(10),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(2),Container=function Container(_ref){var children=_ref.children;return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(rebass_styled_components__WEBPACK_IMPORTED_MODULE_4__.Flex,{flexDirection:"column",alignItems:"center",pt:"1",children:children})},EndGame=function EndGame(_ref2){var game=_ref2.game,isMyTurn=_ref2.isMyTurn,text="";return game.in_stalemate()&&(text="Stalemate"),game.in_threefold_repetition()&&(text="Three-fold repetition"),game.insufficient_material()&&(text="Infufficient Material"),game.in_checkmate()&&(text=isMyTurn?"Win":"Lose"),game.in_draw()&&(text="Draw"),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(rebass_styled_components__WEBPACK_IMPORTED_MODULE_4__.Text,{fontSize:5,mt:2,mb:3,children:text})},Client=function Client(_ref3){var _state$board,orientation=_ref3.orientation,state=_ref3.state,moves=_ref3.moves,_useState=Object(react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),_useState2=Object(_home_runner_work_compendium_compendium_yarn_cache_babel_runtime_npm_7_12_1_b069f70b16_979d1c099c_zip_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.a)(_useState,2),validMoves=_useState2[0],setValidMoves=_useState2[1],game=new chess_js__WEBPACK_IMPORTED_MODULE_3___default.a(state.board),isGameOver=game.game_over(),isMyTurn=game.turn()[0]===orientation[0],squareStyles=validMoves.reduce((function(o,validMove){return o[validMove.slice(-2)]={boxShadow:"yellow 0 0 1px 4px inset"},o}),{});return Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(Container,{children:[isGameOver&&Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(EndGame,{isMyTurn:isMyTurn,game:game}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(chessboardjsx__WEBPACK_IMPORTED_MODULE_2___default.a,{draggable:!isGameOver&&isMyTurn,calcWidth:function calcWidth(_ref5){var screenWidth=_ref5.screenWidth,screenHeight=_ref5.screenHeight;return Math.min(.9*screenWidth,.9*screenHeight)},orientation:orientation,onDrop:function onDrop(_ref4){var sourceSquare=_ref4.sourceSquare,targetSquare=_ref4.targetSquare,piece=_ref4.piece;setValidMoves([]);var isMyPeice=piece[0]===orientation[0];if(!isGameOver&&isMyPeice&&isMyTurn){var move=game.move({from:sourceSquare,to:targetSquare,promotion:"q"});null!==move&&moves.chessMove({chessMove:move})}},onDragOverSquare:function onDragOverSquare(){return setValidMoves([])},position:null!==(_state$board=state.board)&&void 0!==_state$board?_state$board:"start",onSquareClick:function onSquareClick(square){if(!isGameOver&&isMyTurn){var move=validMoves.find((function(validMove){return validMove.slice(-2)===square}));if(move)moves.chessMove({chessMove:move}),setValidMoves([]);else{var _moves=game.moves({square:square});setValidMoves(_moves)}}},squareStyles:squareStyles})]})};Client.__docgenInfo={description:"",methods:[],displayName:"Client"},__webpack_exports__.a=Client,"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/games/chess/client/Client.js"]={name:"Client",docgenInfo:Client.__docgenInfo,path:"src/games/chess/client/Client.js"})}}]);