(this["webpackJsonp@compendium/app"]=this["webpackJsonp@compendium/app"]||[]).push([[5],{241:function(e,n,t){"use strict";var r=t(14),i=t(0),o=t(242),c=t.n(o),a=t(76),s=t.n(a),u=t(4),l=t(1),f=function(e){var n=e.children;return Object(l.jsx)(u.Flex,{flexDirection:"column",alignItems:"center",pt:"1",children:n})},d=function(e){var n=e.game,t=e.isMyTurn,r="";return n.in_stalemate()&&(r="Stalemate"),n.in_threefold_repetition()&&(r="Three-fold repetition"),n.insufficient_material()&&(r="Infufficient Material"),n.in_checkmate()&&(r=t?"Win":"Lose"),n.in_draw()&&(r="Draw"),Object(l.jsx)(u.Text,{fontSize:5,mt:2,mb:3,children:r})};n.a=function(e){var n,t=e.orientation,o=e.state,a=e.moves,u=Object(i.useState)([]),h=Object(r.a)(u,2),j=h[0],m=h[1],p=new s.a(o.board),v=p.game_over(),b=p.turn()[0]===t[0],x=j.reduce((function(e,n){return e[n.slice(-2)]={boxShadow:"yellow 0 0 1px 4px inset"},e}),{});return Object(l.jsxs)(f,{children:[v&&Object(l.jsx)(d,{isMyTurn:b,game:p}),Object(l.jsx)(c.a,{draggable:!v&&b,calcWidth:function(e){var n=e.screenWidth,t=e.screenHeight;return Math.min(.9*n,.9*t)},orientation:t,onDrop:function(e){var n=e.sourceSquare,r=e.targetSquare,i=e.piece;m([]);var o=i[0]===t[0];if(!v&&o&&b){var c=p.move({from:n,to:r,promotion:"q"});null!==c&&a.chessMove({chessMove:c})}},onDragOverSquare:function(){return m([])},position:null!==(n=o.board)&&void 0!==n?n:"start",onSquareClick:function(e){if(!v&&b){var n=j.find((function(n){return n.slice(-2)===e}));if(n)a.chessMove({chessMove:n}),m([]);else{var t=p.moves({square:e});m(t)}}},squareStyles:x})]})}},249:function(e,n,t){"use strict";t.r(n);var r=t(3),i=(t(0),t(241)),o=t(4),c=t(1);n.default=function(e){return e.connections.length<1?Object(c.jsx)(o.Flex,{justifyContent:"center",p:4,children:Object(c.jsxs)(o.Text,{fontSize:4,children:["Join: ",Object(c.jsx)("span",{children:e.roomId})]})}):Object(c.jsx)(i.a,Object(r.a)({orientation:"black"},e))}}}]);
//# sourceMappingURL=5.148ccf06.chunk.js.map