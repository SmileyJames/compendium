(this["webpackJsonp@compendium/app"]=this["webpackJsonp@compendium/app"]||[]).push([[0],{135:function(e,t){},148:function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=148},192:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),c=n(78),a=n.n(c),i=n(6),s=n(79),u=n.n(s),l=n(58),d=n(47),f=n.n(d),m=n(80),v=n.n(m),j=n(48),b=n(81),g=n.n(b),h=n(194);function O(){return(O=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}function x(e,t){var n;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"===typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var o=0;return function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(n=e[Symbol.iterator]()).next.bind(n)}function S(e,t,n){var r=Object(o.useState)((function(){var o=e.getItem(t);return o?JSON.parse(null!=o?o:""):n instanceof Function?n():n})),c=r[0],a=r[1];return Object(o.useEffect)((function(){e.setItem(t,JSON.stringify(c))}),[t,c,e]),[c,a]}function I(e){return e._isRandom=!0,e}var y=function(e){return e._isRandom};function C(e){var t=e.connectionId,n=e.roomId,o=e.game;return t===n?o.hostMoves:o.guestMoves}function H(e){var t=e.connectionId,n=e.roomId,o=e.game,r=e.move;return C({connectionId:t,roomId:n,game:o})[r]}function w(e){var t=e.game,n=e.connectionId,o=e.roomId,r=e.handleMove;return new Proxy({},{get:function(e,c,a){var i=C({connectionId:n,roomId:o,game:t});return v()(i,c)?function(e){return r({move:c.toString(),args:e})}:c===Symbol.iterator&&i?Object.keys(i)[Symbol.iterator].bind(e):Reflect.get(e,c,a)}})}function P(e){return e._isSecret=!0,e}var D=function(e){return e._isSecret};function E(e){var t=e.actions,n=e.contextId,o=e.controller,r=e.initialState,c=void 0===r?{}:r;return t.reduce((function(e,t){try{var r=function(e){var t,n=e.state,o=e.contextId,r=e.action,c=e.controller,a=H({move:r.move,connectionId:r.connectionId,roomId:c.roomId,game:c.game}),i=O({index:null},r),s=y(a),u=D(a);s&&(i.seed=(0,c.random)().toString());var d={state:n,roomId:c.roomId,connectionId:r.connectionId,args:r.args},m=s?{random:f()(i.seed)}:null,v=u?{contextId:o,revealSecret:c.revealSecret}:null;if(m&&!u)return{state:t=a(O({},d,m)),event:i};if(v)return s||(t=a(O({},d,v))),m&&(t=a(O({},d,v,m))),i.patch=Object(l.diff)(n,t),{state:t,event:i};return{state:t=a(d),event:i}}({state:e.state,contextId:n,action:t,controller:o}),c=r.state,a=r.event;return{state:c,eventLog:[].concat(e.eventLog,[a])}}catch(i){return console.error("Invalid Event",i),e}}),{state:c,eventLog:[]})}function k(e){var t=e.roomId,n=e.game,r=e.random,c=e.connectionIds,a=e.eventLogs,i=e.logEvent,s=function(e){var t=S(window.localStorage,"hostState-"+e,{}),n=t[0],r=t[1];return{states:n,setState:Object(o.useCallback)((function(e){var t=e.contextId,n=e.state;r((function(e){var o;return O({},e,((o={})[t]=n,o))}))}),[r])}}(t),u=s.states,l=s.setState,d=Object(o.useMemo)((function(){return{logEvent:i,setState:l,connectionIds:c,controller:{roomId:t,game:n,random:r,revealSecret:function(e,t){return t(u[e])}},states:u,eventLogs:a}}),[u,a,t,n,r,i,l,c]);!function(e){Object(o.useEffect)((function(){var t,n=e.connectionIds.filter((function(t){var n;return!e.states[t]&&!(null!==(n=e.eventLogs[t])&&void 0!==n&&n.length)}))[0];if(n){var o=E({actions:null!=(t=e.eventLogs[e.controller.roomId])?t:[],controller:e.controller,contextId:n});o.eventLog.forEach((function(t){return e.logEvent({connectionId:n,event:t})})),e.setState({contextId:n,state:o.state})}}),[e])}(d);var f=function(e){return Object(o.useCallback)((function(t){for(var n,o=function(){var o=n.value,r=E({initialState:e.states[o],actions:[t],controller:e.controller,contextId:o});r.eventLog.forEach((function(t){return e.logEvent({connectionId:o,event:t})})),e.setState({contextId:o,state:r.state})},r=x([].concat(e.connectionIds,[e.controller.roomId]));!(n=r()).done;)o()}),[e])}(d);return{state:Object(o.useMemo)((function(){return u[t]||{}}),[t,u]),input:f}}var T=function(e){var t=e.peer,n=e.setPeer;t&&t.destroy(),n(null)},M={host:"signalling.compendium.games",secure:!0};function z(e){var t=Object(o.useState)(null),n=t[0],r=t[1],c=Object(o.useState)(!1),a=c[0],i=c[1],s=Object(o.useReducer)((function(e){return e+1}),0),u=s[0],l=s[1];return Object(o.useEffect)((function(){if(!a){var t=new g.a(e,M);r(t);var n=function(){i(!1),T({peer:t,setPeer:r}),l()},o=setTimeout(n,1e3);t.on("open",(function(){clearTimeout(o),i(!0)}));var c=function(){clearTimeout(o),o=setTimeout(n,1e3)};return t.on("close",c),t.on("disconnected",c),t.on("error",c),function(){T({peer:t,setPeer:r}),clearTimeout(o)}}}),[u,e]),{open:a,peer:n}}function L(e){var t=e.game,n=e.roomId,r=z(n).peer,c=Object(o.useState)([]),a=c[0],i=c[1],s=Object(o.useRef)({}),u=Object(o.useReducer)((function(e,t){return[].concat(e,[t])}),[]),l=u[0],d=u[1],f=Object(o.useState)((function(){return function(){}})),m=f[0],v=f[1];return Object(o.useEffect)((function(){r&&m&&r.on("connection",(function(e){e.on("open",(function(){!function(e){var t=e.setConnections,n=e.conn;t((function(e){return[].concat(e,[n])}))}({setConnections:i,conn:e}),d(e.peer)})),e.on("data",(function(n){var o=void 0===n?{}:n,r=o.index,c=function(e,t){if(null==e)return{};var n,o,r={},c=Object.keys(e);for(o=0;o<c.length;o++)n=c[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(o,["index"]);Object(j.isInteger)(r)&&function(e){var t=e.conn,n=e.connectionLogSizeMap,o=e.size,r=void 0===o?0:o;n.current[t.peer]=r}({conn:e,connectionLogSizeMap:s,size:r+1}),(Object(j.isInteger)(r)||null===r)&&function(e,t){return e&&Object(j.isString)(e.move)&&t.findIndex((function(t){return t===e.move}))>-1}(c,Object.keys(t.guestMoves))&&m(O({},c,{connectionId:e.peer}))})),e.on("close",(function(){!function(e){var t=e.setConnections,n=e.conn;t((function(e){return e.filter((function(e){return e!==n}))}))}({setConnections:i,conn:e})})),e.on("error",(function(t){console.error(e.peer,t)}))}))}),[r,t,n,m]),{connections:a,connectionIds:l,connectionLogSizeMap:s,setOnGuestEvent:v}}function B(e){var t=e.roomId,n=e.game,r=function(e){var t=e.secret,n=e.roomId;return Object(o.useMemo)((function(){return f()(t||n)}),[t,n])}({secret:e.secret,roomId:t}),c=function(e){var t=S(window.localStorage,"eventLog-"+e,{}),n=t[0],r=t[1];return{eventLogs:n,logEvent:Object(o.useCallback)((function(e){var t=e.connectionId,n=e.event;r((function(e){var o,r=e[t]||[];return O({},e,((o={})[t]=[].concat(r,[n]),o))}))}),[r])}}(t),a=c.eventLogs,i=c.logEvent,s=L({game:n,roomId:t}),l=s.setOnGuestEvent,d=s.connections,m=s.connectionIds,v=s.connectionLogSizeMap,j=function(e){var t=e.roomId,n=e.game,r=Object(o.useState)((function(){return function(){return null}})),c=r[0],a=r[1],i=Object(o.useCallback)((function(e){c(O({},e,{connectionId:t}))}),[t,c]);return{moves:Object(o.useMemo)((function(){return i&&t&&n?w({game:n,connectionId:t,roomId:t,handleMove:i}):{}}),[t,n,i]),setOnHostEvent:a}}({roomId:t,game:n}),b=j.setOnHostEvent,g=j.moves,h=k({roomId:t,game:n,logEvent:i,random:r,connectionIds:m,eventLogs:a}),p=h.state;return function(e){var t=e.setOnGuestEvent,n=e.setOnHostEvent,r=e.input,c=Object(o.useState)([]),a=c[0],i=c[1];Object(o.useEffect)((function(){var e=function(e){i((function(t){return[].concat(t,[e])}))};t((function(){return e})),n((function(){return e}))}),[t,n,i]),Object(o.useEffect)((function(){a.length&&r&&i((function(e){var t=e[0],n=e.slice(1);return r(t),console.info("INPUT ACTION",t),n}))}),[a,r,i])}({setOnHostEvent:b,setOnGuestEvent:l,input:h.input}),function(e){var t=e.connections,n=e.connectionLogSizeMap,r=e.eventLogs;Object(o.useEffect)((function(){if(null!=r)for(var e,o=function(){var t=e.value,o=r[t.peer]||[],c=n.current[t.peer]||0;if(o.length>c){var a=o.slice(c).map((function(e,t){return O({},e,{index:c+t})}));t.send(a)}},c=x(t);!(e=c()).done;)o()}),[t,n,r])}({connections:d,connectionLogSizeMap:v,eventLogs:a}),{state:p,moves:g,connections:Object(o.useMemo)((function(){return u()(d.map((function(e){return e.peer}))).sort()}),[d])}}function F(e){var t=e-1;return t<0?null:t}var G=function(e){var t=e.game,n=e.events,o=e.roomId;return function(e){try{return n.reduce((function(e,n){var r=H({connectionId:n.connectionId,roomId:o,game:t,move:n.move});if(D(r))return null!=n.patch&&Object(l.patch)(e,n.patch),e;var c={state:e,roomId:o,connectionId:n.connectionId,args:n.args};if(y(r)){if(null==n.seed)throw new Error("Random moves require a seed from the host");return r(O({},c,{random:f()(n.seed)}))}return r(c)}),e)}catch(r){return console.error(r),e}}};function A(e){var t=e.data,n=e.clearData,r=e.game,c=e.roomId,a=e.setState,i=e.setLogSize;Object(o.useEffect)((function(){if(t&&t.length){var e=[].concat(t);n(),function(e){var t,n=e.setLogSize,o=e.events;n((null!=(t=o[o.length-1].index)?t:0)+1)}({setLogSize:i,events:e}),function(e){var t=e.setState,n=e.roomId,o=e.game,r=e.events,c=G({game:o,roomId:n,events:r});t((function(e){var t=e.state,n=c(t);return{state:n,cache:n}}))}({setState:a,roomId:c,game:r,events:e})}}),[t,n,r,c,i,a])}function J(e){var t=e.conn,n=e.connectionId,o=e.setMoves,r=e.setState,c=e.game,a=e.logSize,i=e.roomId,s=function(e){var o=e.move,s=e.args,u=H({connectionId:n,roomId:i,game:c,move:o});y(u)||D(u)||function(e){var t=e.setState,n=e.game,o=e.move,r=e.args,c=e.connectionId,a=e.roomId,i=G({game:n,roomId:a,events:[{index:null,move:o,args:r,connectionId:c}]});t((function(e){var t=e.state,n=e.cache;return{cache:i(n),state:t}}))}({setState:r,game:c,move:o,args:s,roomId:i,connectionId:n});var l=F(a);!function(e){var t,n=e.conn,o=e.emit;console.info("EMIT",o),null===(t=n.current)||void 0===t||t.send(o)}({conn:t,emit:{move:o,args:s,index:l}})};o((function(){return w({game:c,connectionId:n,roomId:i,handleMove:s})}))}function K(e){var t=e.roomId,n=e.game,r=function(e){return{id:S(window.localStorage,"id-"+e,h.a)[0]}}(t).id,c=function(e){var t=S(window.localStorage,"guestState-"+e,{state:{},cache:{}});return{cache:t[0].cache,setState:t[1]}}(t),a=c.cache,i=c.setState,s=function(e){var t=S(window.localStorage,"logSize-"+e,0);return{logSize:t[0],setLogSize:t[1]}}(t),u=s.logSize,l=s.setLogSize,d=function(e){var t=e.id,n=e.roomId,r=Object(o.useRef)(null),c=z(t),a=c.open,i=c.peer,s=Object(o.useState)([]),u=s[0],l=s[1],d=Object(o.useState)(!1),f=d[0],m=d[1],v=Object(o.useReducer)((function(e){return e+1}),0),j=v[0],b=v[1];return Object(o.useEffect)((function(){if(i&&a&&!f){r.current=function(e){var t=e.roomId;return e.peer.connect(t,{serialization:"json"})}({peer:i,roomId:n});var e=function(){r.current=null,m(!1),b()},t=setTimeout(e,1e3);r.current.on("open",(function(){clearTimeout(t),m(!0)})),r.current.on("data",(function(e){l((function(t){return[].concat(t,e)}))})),r.current.on("close",(function(){clearTimeout(t),e()})),r.current.on("error",(function(e){console.error(e)}))}}),[j,a,f,n,i]),{connected:a&&f,conn:r,data:u,clearData:function(){l([])}}}({id:r,roomId:t}),f=d.connected,m=d.conn,v=d.data,j=d.clearData;return function(e){var t=e.connected,n=e.conn,r=e.logSize;Object(o.useEffect)((function(){if(n.current&&t){var e=F(r);!function(e){var t,n=e.conn,o=e.index;null===(t=n.current)||void 0===t||t.send({index:o})}({conn:n,index:e})}}),[t,n,r])}({connected:f,conn:m,logSize:u}),A({data:v,clearData:j,game:n,roomId:t,setState:i,setLogSize:l}),{connectionId:r,connected:f,state:a,moves:function(e){var t=e.connected,n=e.conn,r=e.id,c=e.setState,a=e.roomId,i=e.game,s=e.logSize,u=Object(o.useState)(null),l=u[0],d=u[1];return Object(o.useEffect)((function(){t&&J({conn:n,connectionId:r,setMoves:d,setState:c,roomId:a,game:i,logSize:s})}),[t,n,r,d,c,a,i,s]),{moves:l}}({connected:f,conn:m,id:r,setState:i,roomId:t,game:n,logSize:u}).moves}}var N,R,_,Q,W,U,q,X,Y,$,V,Z,ee,te,ne=n(9),oe=n(37),re=n(22),ce=n(3),ae=n(33),ie={guestMoves:{fillSquare:function(e){var t=e.state,n=e.connectionId,o=e.args,r=null;if(n===t.crossesPlayer)r=2;else{if(n!==t.noughtsPlayer)throw new Error("Connection is not a player");r=1}if(null!==t.board[o.position])throw new Error("Position filled");var c=Object(ae.a)(t.board);return c.splice(o.position,1,r),Object(ce.a)(Object(ce.a)({},t),{},{board:c})}},hostMoves:{startGame:function(e){e.state,e.connectionId;var t=e.args;return{crossesPlayer:t.crossesConnId,noughtsPlayer:t.noughtsConnId,board:Array(9).fill(null)}}}},se=ie,ue=n(13),le=n(1),de=i.default.button(N||(N=Object(ue.a)(["\n  width: 33.333%;\n  height: 33.333%;\n  background-color: white;\n  border: 2px solid red;\n  color: black;\n  text-align: center;\n  float: left;\n  box-sizing: border-box;\n"]))),fe=i.default.div(R||(R=Object(ue.a)(["\n  width: 33.333%;\n  height: 33.333%;\n  background-color: white;\n  border: 2px solid red;\n  color: black;\n  text-align: center;\n  float: left;\n  box-sizing: border-box;\n"]))),me=i.default.div(_||(_=Object(ue.a)(["\n  width: 30em;\n  height: 30em;\n"]))),ve=function(e){var t=e.value,n=e.onClick;return null===t?Object(le.jsx)(de,{onClick:n}):Object(le.jsxs)(fe,{children:[1===t?"O":null,2===t?"X":null]})},je=function(e){var t=e.connected,n=e.state,o=e.moves;return Object(le.jsxs)(le.Fragment,{children:[t?null:Object(le.jsx)("p",{children:"Disconnected.."}),Object(le.jsx)(me,{children:n.board&&n.board.map((function(e,n){return Object(le.jsx)(ve,{value:e,onClick:function(){return t&&o.fillSquare({position:n})}},n)}))})]})},be=i.default.div(Q||(Q=Object(ue.a)(["\n  width: 33.333%;\n  height: 33.333%;\n  background-color: cyan;\n  border: 2px solid yellow;\n  color: black;\n  text-align: center;\n  float: left;\n  box-sizing: border-box;\n"]))),ge=i.default.div(W||(W=Object(ue.a)(["\n  width: 30em;\n  height: 30em;\n"]))),he={name:"Tic Tac Toe",Host:function(e){var t=e.state,n=e.roomId,r=e.moves,c=e.connections;return Object(o.useEffect)((function(){if(!t.board&&c.length>=2){var e=Object(re.a)(c,2),n=e[0],o=e[1];r.startGame({crossesConnId:n,noughtsConnId:o})}}),[c]),Object(le.jsxs)(le.Fragment,{children:[c.length<2&&Object(le.jsxs)(oe.b,{to:"/guest/".concat(n),children:[window.location.host,"#/guest/",n]}),Object(le.jsx)(ge,{children:t.board&&t.board.map((function(e,t){return Object(le.jsxs)(be,{children:[1===e?"O":null,2===e?"X":null]},t)}))})]})},Guest:je,game:se},Oe={guestMoves:{joinAsAPlayer:function(e){var t=e.state,n=e.connectionId,o=e.args;if(t.players.list.length>=t.players.maxPlayers)throw new Error("The number of players has reached it's maximum");var r={connectionId:n,name:o.name,emoji:o.emoji},c=[].concat(Object(ae.a)(t.players.list),[r]),a=Object(ce.a)(Object(ce.a)({},t.players),{},{list:c});return Object(ce.a)(Object(ce.a)({},t),{},{players:a})}},hostMoves:{initPlayers:function(e){var t=e.state,n=e.args,o={maxPlayers:n.maxPlayers,minPlayers:n.minPlayers,everyoneIsIn:!1,list:[]};return Object(ce.a)(Object(ce.a)({},t),{},{players:o})},everyoneIsIn:function(e){var t=e.state;if(t.players.list.length>t.players.maxPlayers)throw new Error("Too many players");if(t.players.list.length<t.players.minPlayers)throw new Error("Not enough players");return Object(ce.a)(Object(ce.a)({},t),{},{players:Object(ce.a)(Object(ce.a)({},t.players),{},{everyoneIsIn:!0})})}}},pe=n.p+"static/media/AH.1a5ea790.svg",xe=n.p+"static/media/AC.0e3c2151.svg",Se=n.p+"static/media/AD.5c4da062.svg",Ie=n.p+"static/media/AS.0beacefa.svg",ye=n.p+"static/media/2H.cb701b97.svg",Ce=n.p+"static/media/2C.276c3f69.svg",He=n.p+"static/media/2D.bc21ec2a.svg",we=n.p+"static/media/2S.ec187ad2.svg",Pe=n.p+"static/media/3H.cba17cfa.svg",De=n.p+"static/media/3C.4defbcf5.svg",Ee=n.p+"static/media/3D.8d12a3fc.svg",ke=n.p+"static/media/3S.ed80cdda.svg",Te=n.p+"static/media/4H.8924ea52.svg",Me=n.p+"static/media/4C.3ebe0e73.svg",ze=n.p+"static/media/4D.433a1ecc.svg",Le=n.p+"static/media/4S.7e474260.svg",Be=n.p+"static/media/5H.04a38bb9.svg",Fe=n.p+"static/media/5C.809e552d.svg",Ge=n.p+"static/media/5D.03b1a4af.svg",Ae=n.p+"static/media/5S.f4e082a6.svg",Je=n.p+"static/media/6H.5380d254.svg",Ke=n.p+"static/media/6C.1f69ca79.svg",Ne=n.p+"static/media/6D.8c9d26ce.svg",Re=n.p+"static/media/6S.33eb8c1b.svg",_e=n.p+"static/media/7H.156a2f08.svg",Qe=n.p+"static/media/7C.cb6a5b5c.svg",We=n.p+"static/media/7D.bc93fd45.svg",Ue=n.p+"static/media/7S.f91490c5.svg",qe=n.p+"static/media/8H.878dbca5.svg",Xe=n.p+"static/media/8C.e91af699.svg",Ye=n.p+"static/media/8D.ca4420e9.svg",$e=n.p+"static/media/8S.fd5cd6f8.svg",Ve=n.p+"static/media/9H.57bfd8e3.svg",Ze=n.p+"static/media/9C.c6a841cc.svg",et=n.p+"static/media/9D.3d612a15.svg",tt=n.p+"static/media/9S.6c7e4615.svg",nt=n.p+"static/media/10H.c8c8e4de.svg",ot=n.p+"static/media/10C.0cc64a48.svg",rt=n.p+"static/media/10D.956683a1.svg",ct=n.p+"static/media/10S.99cb26ab.svg",at=n.p+"static/media/JH.86f58f4f.svg",it=n.p+"static/media/JC.b801c5a7.svg",st=n.p+"static/media/JD.a0e75607.svg",ut=n.p+"static/media/JS.1a6f34e2.svg",lt=n.p+"static/media/QH.f56614ef.svg",dt=n.p+"static/media/QC.3eb5bae0.svg",ft=n.p+"static/media/QD.c20eb8d2.svg",mt=n.p+"static/media/QS.cc68ac97.svg",vt=n.p+"static/media/KH.3d6b1be6.svg",jt=n.p+"static/media/KC.ca193598.svg",bt=n.p+"static/media/KD.32d1a9f8.svg",gt=n.p+"static/media/KS.b54b6bba.svg",ht=n.p+"static/media/JOKER.96be08d3.svg",Ot=n(61),pt=["H","D","S","C"],xt=11,St=12,It=13,yt=[1,2,3,4,5,6,7,8,9,10,xt,St,It],Ct=function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.jokers,o=void 0===n?0:n,r=[],c=Object(Ot.a)(pt);try{for(c.s();!(e=c.n()).done;){var a,i=e.value,s=Object(Ot.a)(yt);try{for(s.s();!(a=s.n()).done;){var u=a.value;r.push({suit:i,value:u})}}catch(d){s.e(d)}finally{s.f()}}}catch(d){c.e(d)}finally{c.f()}for(var l=0;l<o;l++)r.push({suit:null,value:0});return r},Ht=i.default.div(U||(U=Object(ue.a)(["\n  margin-bottom: -9em;\n  margin-right: -3em;\n\n  ","\n"])),(function(e){var t=e.order;return t&&"order: ".concat(t,";")})),wt=i.default.div(q||(q=Object(ue.a)(["\n  position: relative;\n  margin-top: 2em;\n"]))),Pt=Object(i.default)(wt)(X||(X=Object(ue.a)(["\n  &:hover {\n    margin-top: 1em;\n    margin-bottom: 1em;\n    cursor: pointer;\n  }\n\n  ","\n"])),(function(e){return e.isSelected&&"\n    margin-top: 0em;\n    margin-bottom: 2em;\n\n    &:hover {\n      margin-top: 0em;\n      margin-bottom: 2em;\n    }\n  "})),Dt=i.default.div(Y||(Y=Object(ue.a)(["\n  opacity: 0.4;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  border-radius: 0.5em;\n\n  ","\n"])),(function(e){var t=e.isSelected,n=e.selectColor;return t&&n&&"\n    background-color: ".concat(n,";\n  ")})),Et=i.default.img($||($=Object(ue.a)(["\n  width: 9em;\n  display: block;\n"]))),kt=function(e){var t=e.isSelected,n=e.selectColor,o=e.faceImage,r=e.altText,c=e.onClick;return Object(le.jsxs)(Pt,{isSelected:t,children:[Object(le.jsx)(Et,{src:o,alt:r}),Object(le.jsx)(Dt,{isSelected:t,selectColor:n,onClick:c})]})},Tt=function(e){var t=e.faceImage,n=e.altText;return Object(le.jsx)(wt,{children:Object(le.jsx)(Et,{src:t,alt:n})})},Mt=function(e){var t=e.order,n=e.canBeSelected,o=e.isSelected,r=e.selectColor,c=e.faceImage,a=e.altText,i=e.onClick,s=n?kt:Tt;return Object(le.jsx)(Ht,{order:t,children:Object(le.jsx)(s,{isSelected:o,selectColor:r,faceImage:c,altText:a,onClick:i})})},zt=function(e){var t=e.value,n=e.suit,o=e.canBeSelected,r=void 0!==o&&o,c=e.isSelected,a=void 0!==c&&c,i=e.selectColor,s=void 0===i?null:i;console.log("select",s);var u=function(e){var t=e.suit,n=e.value;return 0===n?ht:1===n&&"H"===t?pe:1===n&&"D"===t?Se:1===n&&"S"===t?Ie:1===n&&"C"===t?xe:2===n&&"H"===t?ye:2===n&&"D"===t?He:2===n&&"S"===t?we:2===n&&"C"===t?Ce:3===n&&"H"===t?Pe:3===n&&"D"===t?Ee:3===n&&"S"===t?ke:3===n&&"C"===t?De:4===n&&"H"===t?Te:4===n&&"D"===t?ze:4===n&&"S"===t?Le:4===n&&"C"===t?Me:5===n&&"H"===t?Be:5===n&&"D"===t?Ge:5===n&&"S"===t?Ae:5===n&&"C"===t?Fe:6===n&&"H"===t?Je:6===n&&"D"===t?Ne:6===n&&"S"===t?Re:6===n&&"C"===t?Ke:7===n&&"H"===t?_e:7===n&&"D"===t?We:7===n&&"S"===t?Ue:7===n&&"C"===t?Qe:8===n&&"H"===t?qe:8===n&&"D"===t?Ye:8===n&&"S"===t?$e:8===n&&"C"===t?Xe:9===n&&"H"===t?Ve:9===n&&"D"===t?et:9===n&&"S"===t?tt:9===n&&"C"===t?Ze:10===n&&"H"===t?nt:10===n&&"D"===t?rt:10===n&&"S"===t?ct:10===n&&"C"===t?ot:n===xt&&"H"===t?at:n===xt&&"D"===t?st:n===xt&&"S"===t?ut:n===xt&&"C"===t?it:n===St&&"H"===t?lt:n===St&&"D"===t?ft:n===St&&"S"===t?mt:n===St&&"C"===t?dt:n===It&&"H"===t?vt:n===It&&"D"===t?bt:n===It&&"S"===t?gt:n===It&&"C"===t?jt:void 0}({value:t,suit:n}),l=function(e){var t=e.value,n=e.suit;return 0===t?"\ud83c\udccf Joker":1===t&&"H"===n?"\ud83c\udcb1 Ace of Hearts":1===t&&"D"===n?"\ud83c\udcc1 Ace of Diamonds":1===t&&"S"===n?"\ud83c\udca1 Ace of Spaces":1===t&&"C"===n?"\ud83c\udcd1 Ace of Clubs":2===t&&"H"===n?"\ud83c\udcb2 Two of Hearts":2===t&&"D"===n?"\ud83c\udcc2 Two of Diamonds":2===t&&"S"===n?"\ud83c\udca2 Two of Spades":2===t&&"C"===n?"\ud83c\udcd2 Two of Clubs":3===t&&"H"===n?"\ud83c\udcb3 Three of Hearts":3===t&&"D"===n?"\ud83c\udcc3 Three of Diamonds":3===t&&"S"===n?"\ud83c\udca3 Three of Spades":3===t&&"C"===n?"\ud83c\udcd3 Three of Clubs":4===t&&"H"===n?"\ud83c\udcb4 Four of Hearts":4===t&&"D"===n?"\ud83c\udcc4 Four of Diamonds":4===t&&"S"===n?"\ud83c\udca4 Four of Spades":4===t&&"C"===n?"\ud83c\udcd4 Four of Clubs":5===t&&"H"===n?"\ud83c\udcb5 Five of Hearts":5===t&&"D"===n?"\ud83c\udcc5 Five of Diamonds":5===t&&"S"===n?"\ud83c\udca5 Five of Spades":5===t&&"C"===n?"\ud83c\udcd5 Five of Clubs":6===t&&"H"===n?"\ud83c\udcb6 Six of Hearts":6===t&&"D"===n?"\ud83c\udcc6 Six of Diamomnds":6===t&&"S"===n?"\ud83c\udca6 Six of Spades":6===t&&"C"===n?"\ud83c\udcd6 Six of Clubs":7===t&&"H"===n?"\ud83c\udcb7 Seven of Hearts":7===t&&"D"===n?"\ud83c\udcc7 Seven of Diamonds":7===t&&"S"===n?"\ud83c\udca7 Seven of Spades":7===t&&"C"===n?"\ud83c\udcd7 Seven of Clubs":8===t&&"H"===n?"\ud83c\udcb8 Eight of Hearts":8===t&&"D"===n?"\ud83c\udcc8 Eight of Diamonds":8===t&&"S"===n?"\ud83c\udca8 Eight of Spades":8===t&&"C"===n?"\ud83c\udcd8 Eight of Clubs":9===t&&"H"===n?"\ud83c\udcb9 Nine of Hearts":9===t&&"D"===n?"\ud83c\udcc9 Nine of Diamonds":9===t&&"S"===n?"\ud83c\udca9 Nine of Spades":9===t&&"C"===n?"\ud83c\udcd9 Nine of Clubs":10===t&&"H"===n?"\ud83c\udcba Ten of Hearts":10===t&&"D"===n?"\ud83c\udcca Ten of Diamonds":10===t&&"S"===n?"\ud83c\udcaa Ten of Spades":10===t&&"C"===n?"\ud83c\udcda Ten of Clubs":t===xt&&"H"===n?"\ud83c\udcbb Jack of Hearts":t===xt&&"D"===n?"\ud83c\udccb Jack of Diamonds":t===xt&&"S"===n?"\ud83c\udcab Jack of Spades":t===xt&&"C"===n?"\ud83c\udcdb Jack of Clubs":t===St&&"H"===n?"\ud83c\udcbd Queen of Hearts":t===St&&"D"===n?"\ud83c\udccd Queen of Diamonds":t===St&&"S"===n?"\ud83c\udcad Queen of Spades":t===St&&"C"===n?"\ud83c\udcdd Queen of Clubs":t===It&&"H"===n?"\ud83c\udcbe King of Hearts":t===It&&"D"===n?"\ud83c\udcde King of Diamonds":t===It&&"S"===n?"\ud83c\udcae King of Spades":t===It&&"C"===n?"\ud83c\udcde King of Clubs":void 0}({value:t,suit:n});return Object(le.jsx)(Mt,{faceImage:u,altText:l,isSelected:a,canBeSelected:r,selectColor:s})},Lt=n.p+"static/media/RED_BACK.eea8c6b0.svg",Bt=n.p+"static/media/BLUE_BACK.d7aabd90.svg",Ft=function(e){var t=e.colour,n=e.isSelected,o=void 0!==n&&n,r=e.canBeSelected,c=void 0!==r&&r,a=e.selectColor,i=void 0===a?null:a,s=function(e){var t=e.colour;return"R"===t?Lt:"B"===t?Bt:void 0}({colour:t});return Object(le.jsx)(Mt,{faceImage:s,altText:"\ud83c\udca0 Card Back",isSelected:o,canBeSelected:c,selectColor:i})},Gt=n.p+"static/media/felt.5b148bae.png",At=i.default.div(V||(V=Object(ue.a)(["\n  background-color: rgb(10, 80, 20);\n  background-image: url(",");\n  height: 100%;\n  padding: 5%;\n"])),Gt),Jt=i.default.section(Z||(Z=Object(ue.a)(["\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-evenly;\n  max-height: 50%;\n\n  padding-right: 3em;\n  padding-bottom: 9em;\n"]))),Kt=zt,Nt={guestMoves:Object(ce.a)({},Oe.guestMoves),hostMoves:Object(ce.a)(Object(ce.a)({},Oe.hostMoves),{},{startGame:function(e){var t,n=e.state,o=e.roomId,r=e.connectionId,c=Object(ce.a)(Object(ce.a)({},n),{},{discard:[]});return(t={roomId:o,connectionId:r}).roomId===t.connectionId?c.deck=Ct():c.hand=[],c},deal:function(){}})},Rt=n(62),_t=n(85),Qt=Object(o.memo)((function(e){var t=e.emoji;return Object(le.jsx)("span",{dangerouslySetInnerHTML:{__html:_t.a.parse(t,{folder:"svg",ext:".svg"})}})})),Wt=n(88),Ut=(n(156),i.default.div(ee||(ee=Object(ue.a)(["\n  background-color: rgba(0, 0, 0, 0.8);\n  position: fixed;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"])))),qt=i.default.div(te||(te=Object(ue.a)(["\n  display: inline-block;\n"]))),Xt=function(e){var t=e.onSelectEmoji,n=e.onHide;return Object(le.jsx)(Ut,{tabIndex:!0,onKeyPress:n,onClick:n,children:Object(le.jsx)(qt,{onClick:function(e){return e.stopPropagation()},children:Object(le.jsx)(Wt.a,{onSelect:function(e){t(e.native)},set:"twitter"})})})},Yt=Qt,$t=n(4),Vt=function(e){var t=e.children,n=e.players;return Object(le.jsxs)($t.Flex,{children:[Object(le.jsx)($t.Box,{flexGrow:1,children:n.map((function(e,t){var n=e.name,o=e.emoji;return Object(le.jsxs)($t.Flex,{alignItems:"center",children:[Object(le.jsx)($t.Box,{width:"2em",height:"2em",my:2,mx:3,children:o&&Object(le.jsx)(Yt,{emoji:o})}),n]},t)}))}),Object(le.jsx)($t.Box,{flexGrow:3,children:t})]})},Zt=function(e){var t=e.roomId;return Object(le.jsxs)($t.Text,{fontSize:[3,4,5],fontWeight:"bold",color:"secondary",children:["Join: ",t]})},en=function(e){var t=e.state,n=e.roomId,r=e.moves,c=(e.connections,e.maxPlayers),a=e.minPlayers,i=e.children;if(Object(o.useEffect)((function(){!t.players&&(null===r||void 0===r?void 0:r.initPlayers)&&r.initPlayers({maxPlayers:c,minPlayers:a})}),[t.players,r]),!t.players)return null;if(t.players.everyoneIsIn)return i;var s=function(e){var t=e.state.players;return t.list.length>=t.minPlayers}({state:t});return Object(le.jsx)(Vt,{players:t.players.list,children:Object(le.jsxs)($t.Flex,{height:"100%",flexDirection:"column",alignItems:"center",justifyContent:"space-around",children:[Object(le.jsx)(Zt,{roomId:n}),s&&Object(le.jsx)($t.Button,{my:2,onClick:function(){return r.everyoneIsIn()},onKeyPress:function(){return r.everyoneIsIn()},children:"Start Game"})]})})},tn=n(28),nn=function(e){var t=e.onJoin,n=Object(o.useState)(""),r=Object(re.a)(n,2),c=r[0],a=r[1],i=Object(o.useState)("\ud83d\ude0e"),s=Object(re.a)(i,2),u=s[0],l=s[1],d=Object(o.useState)(!1),f=Object(re.a)(d,2),m=f[0],v=f[1],j=function(){return v(!0)},b=function(){return v(!1)},g=function(){(null===c||void 0===c?void 0:c.length)&&t({name:c,emoji:u})};return Object(le.jsxs)(le.Fragment,{children:[m&&Object(le.jsx)(Xt,{onHide:b,onSelectEmoji:function(e){l(e),b()}}),Object(le.jsxs)($t.Flex,{my:5,alignItems:"center",flexDirection:"column",children:[Object(le.jsx)($t.Box,{width:"10em",height:"10em",onKeyPress:j,onClick:j,children:Object(le.jsx)(Yt,{emoji:u})}),Object(le.jsx)($t.Box,{my:2,children:Object(le.jsx)($t.Text,{fontSize:[3,4,5],fontWeight:"bold",color:"primary",children:c})}),Object(le.jsxs)($t.Box,{children:[Object(le.jsx)(tn.Label,{htmlFor:"nickname",children:"Nickname"}),Object(le.jsx)(tn.Input,{id:"nickname",onChange:function(e){return a(e.target.value)},value:c})]}),Object(le.jsx)($t.Box,{my:3,children:Object(le.jsx)($t.Button,{variant:"primary",onKeyPress:g,onClick:g,children:"Sit down to Play"})})]})]})},on=function(){return Object(le.jsx)($t.Flex,{height:"100vh",justifyContent:"center",alignItems:"center",children:Object(le.jsx)($t.Text,{fontSize:[3,4,5],fontWeight:"bold",color:"primary",children:"You are a Spectator"})})},rn=function(){return Object(le.jsx)($t.Flex,{height:"100vh",justifyContent:"center",alignItems:"center",children:Object(le.jsx)($t.Text,{fontSize:[3,4,5],fontWeight:"bold",color:"primary",children:"Be patient, the host is setting up your game."})})},cn=function(e){var t=e.children,n=e.state,o=(e.roomId,e.moves),r=e.connectionId;if(!n.players)return Object(le.jsx)(rn,{});var c=function(e){var t=e.players,n=e.connectionId;return t.findIndex((function(e){return e.connectionId===n}))>-1}({players:n.players.list,connectionId:r});if(n.players.everyoneIsIn)return c?t:Object(le.jsx)(on,{});var a=function(e){var t=e.state.players;return t.list.length>t.maxPlayers}({state:n});return c||a?Object(le.jsx)(rn,{}):Object(le.jsx)(nn,{onJoin:function(e){var t=e.name,n=e.emoji;o.joinAsAPlayer({name:t,emoji:n})}})},an=function(e){return function(t){var n=t.children,o=Object(Rt.a)(t,["children"]);return Object(le.jsx)(cn,Object(ce.a)(Object(ce.a)({},o),{},{children:Object(le.jsx)(e,Object(ce.a)(Object(ce.a)({},o),{},{children:n}))}))}},sn=function(e,t){return function(n){var o=n.children,r=Object(Rt.a)(n,["children"]);return Object(le.jsx)(en,Object(ce.a)(Object(ce.a)(Object(ce.a)({},e),r),{},{children:Object(le.jsx)(t,Object(ce.a)(Object(ce.a)({},r),{},{children:o}))}))}},un={name:"Whist",Host:sn({maxPlayers:4,minPlayers:4},(function(e){var t=e.state;e.roomId,e.moves,e.connections;return Object(le.jsxs)(At,{children:[Object(le.jsx)(Ft,{colour:"R"}),Object(le.jsx)(Jt,{children:t.discard&&t.discard.map((function(e){var t=e.suit,n=e.value;return Object(le.jsx)(Kt,{suit:t,value:n})}))})]})})),Guest:an((function(e){var t=e.state;e.roomId,e.moves,e.connectionId;return Object(le.jsx)(At,{children:Object(le.jsx)(Jt,{children:t.hand&&t.hand.map((function(e){var t=e.suit,n=e.value;return Object(le.jsx)(Kt,{suit:t,value:n})}))})})})),game:Nt},ln={guestMoves:{passPotato:I(P((function(e){var t=e.connectionId,n=e.revealSecret,o=e.state,r=e.random,c=e.contextId;if(!n(t,(function(e){return e.hotPotato})))throw new Error("Must have potato to throw it");var a=o.players.list.length,i=Math.floor(r()*a);return o.players.list[i].connectionId===c?Object(ce.a)(Object(ce.a)({},o),{},{hotPotato:!0}):Object(ce.a)(Object(ce.a)({},o),{},{hotPotato:!1})})))},hostMoves:{setBackgroundColour:function(e){var t=e.state,n=e.args;return Object(ce.a)(Object(ce.a)({},t),{},{backgroundColour:n.backgroundColour})},throwPotato:I(P((function(e){var t=e.state,n=e.random,o=e.contextId,r=t.players.list.length,c=Math.floor(n()*r);return t.players.list[c].connectionId===o?Object(ce.a)(Object(ce.a)({},t),{},{hotPotato:!0}):Object(ce.a)(Object(ce.a)({},t),{},{hotPotato:!1})}))),stopMusic:P((function(e){var t=e.state,n=e.revealSecret,o=t.players.list.find((function(e){var t=e.connectionId;return n(t,(function(e){return e.hotPotato}))}));return Object(ce.a)(Object(ce.a)({},t),{},{loser:o.connectionId})}))}},dn=function(e){var t=e.moves,n=function(){return t.throwPotato()};return Object(le.jsx)($t.Flex,{children:Object(le.jsx)($t.Button,{onClick:n,onKeyPress:n,variant:"primary",mr:2,children:"Throw the Hot Potato, to your Guests!"})})},fn=$t.Box,mn=function(e){var t=e.emoji,n=void 0===t?"\u2665":t;return Object(le.jsx)($t.Flex,{children:Object(le.jsx)($t.Box,{width:"20vh",height:"20vh",children:Object(le.jsx)(Yt,{emoji:n})})})},vn=function(){return Object(le.jsx)(fn,{children:Object(le.jsx)($t.Text,{fontSize:[3,4,5],fontWeight:"bold",color:"primary",children:"Not Connected to the Host!"})})},jn=function(){return Object(le.jsxs)(fn,{children:[Object(le.jsx)(mn,{emoji:"\ud83d\udc50"}),Object(le.jsx)($t.Text,{fontSize:[3,4,5],fontWeight:"bold",color:"primary",children:"Phew, no hot potato!"})]})},bn=function(e){var t=e.onPassPotato,n=void 0===t?function(){}:t;return Object(le.jsxs)(fn,{children:[Object(le.jsx)(mn,{emoji:"\ud83e\udd54"}),Object(le.jsx)($t.Text,{fontSize:[3,4,5],fontWeight:"bold",color:"primary",children:"Oww! Hot potato!"}),Object(le.jsx)($t.Button,{onClick:n,onKeyPress:n,variant:"primary",mr:2,children:"Pass the Potato"})]})},gn=function(e){var t=e.state,n=(e.roomId,e.moves);e.connectionId;return e.connected?t.hotPotato?Object(le.jsx)(bn,{onPassPotato:function(){return n.passPotato()}}):Object(le.jsx)(jn,{}):Object(le.jsx)(vn,{})},hn=n(46),On=n.n(hn),pn={Host:en,Guest:cn,game:Oe},xn=[he,un,{name:"Hot Potato",theme:On.a,Host:sn({maxPlayers:16,minPlayers:2},dn),Guest:an(gn),game:{hostMoves:Object(ce.a)(Object(ce.a)({},pn.game.hostMoves),ln.hostMoves),guestMoves:Object(ce.a)(Object(ce.a)({},pn.game.guestMoves),ln.guestMoves)}}],Sn=n(86),In=n.n(Sn),yn=n(87),Cn=n.n(yn),Hn=[[0,1,2],[0,2,1],[1,0,2],[2,0,1],[2,1,0],[1,2,0]],wn=function(e){var t=function(e){var t=e.split("-"),n=Object(ae.a)(t).sort(),o=t.map((function(e){return n.findIndex((function(t){return e===t}))}));return Hn.findIndex((function(e){return Cn()(e,o)}))}(e);return xn[t]},Pn=function(e){var t=Object(o.useState)({name:null,Host:null,Guest:null,game:null}),n=Object(re.a)(t,2),r=n[0],c=n[1];return Object(o.useEffect)((function(){return c(wn(e))}),[]),r},Dn=function(e){var t=e.onNewGame,n=Object(o.useState)(0),r=Object(re.a)(n,2),c=r[0],a=r[1],i=function(){return t(c)};return Object(le.jsxs)($t.Box,{my:4,width:["100%","80%","35em"],children:[Object(le.jsx)(tn.Select,{m:1,onChange:function(e){a(e.target.value),e.preventDefault()},value:c,children:xn.map((function(e,t){var n=e.name;return Object(le.jsx)("option",{value:t,children:n},t)}))}),Object(le.jsx)($t.Button,{m:1,onClick:i,onKeyPress:i,children:"Host New Game"})]})},En=function(e){var t=e.onJoinGame,n=Object(o.useState)(),r=Object(re.a)(n,2),c=r[0],a=r[1],i=function(){return t(c)};return Object(le.jsxs)($t.Box,{my:4,width:["100%","80%","35em"],children:[Object(le.jsxs)($t.Box,{children:[Object(le.jsx)(tn.Label,{children:"Room Password"}),Object(le.jsx)(tn.Input,{onChange:function(e){a(e.target.value),e.preventDefault()},value:c})]}),Object(le.jsx)($t.Button,{m:1,onClick:i,onKeyPress:i,children:"Join Game"})]})},kn=function(){var e=Object(ne.f)().push;return Object(le.jsxs)($t.Flex,{mx:["2em","15%","20%"],flexDirection:"column",children:[Object(le.jsx)($t.Heading,{mt:4,fontSize:[5,6],color:"primary",children:"Compendium Games"}),Object(le.jsx)(Dn,{onNewGame:function(t){var n=function(e){var t=Hn[e],n=In()({exactly:3}).sort();return t.map((function(e){return n[e]})).join("-")}(t);e("/host/".concat(n))}}),Object(le.jsx)(En,{onJoinGame:function(t){e("/guest/".concat(t))}})]})},Tn=On.a,Mn=function(){var e=Object(ne.g)().roomId,t=Pn(e),n=t.theme,o=t.Host,r=B({roomId:e,game:t.game}),c=r.state,a=r.moves,s=r.connections;return Object(le.jsx)(i.ThemeProvider,{theme:n||Tn,children:o&&Object(le.jsx)(o,{roomId:e,state:c,moves:a,connections:s})})},zn=function(){var e=Object(ne.g)().roomId,t=Pn(e),n=t.theme,o=t.Guest,r=K({roomId:e,game:t.game}),c=r.connectionId,a=r.connected,s=r.state,u=r.moves;return Object(le.jsx)(i.ThemeProvider,{theme:n||Tn,children:o&&Object(le.jsx)(o,{connectionId:c,roomId:e,connected:a,state:s,moves:u})})},Ln=function(){return Object(le.jsx)(oe.a,{children:Object(le.jsxs)(ne.c,{children:[Object(le.jsx)(ne.a,{path:"/host/:roomId",children:Object(le.jsx)(Mn,{})}),Object(le.jsx)(ne.a,{path:"/guest/:roomId",children:Object(le.jsx)(zn,{})}),Object(le.jsx)(ne.a,{exact:!0,path:"/",children:Object(le.jsx)(i.ThemeProvider,{theme:Tn,children:Object(le.jsx)(kn,{})})})]})})},Bn=function(){return Object(le.jsx)(Ln,{})},Fn=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,195)).then((function(t){var n=t.getCLS,o=t.getFID,r=t.getFCP,c=t.getLCP,a=t.getTTFB;n(e),o(e),r(e),c(e),a(e)}))};a.a.render(Object(le.jsx)(r.a.StrictMode,{children:Object(le.jsx)(Bn,{})}),document.getElementById("root")),Fn()}},[[192,1,2]]]);
//# sourceMappingURL=main.bb35ae40.chunk.js.map