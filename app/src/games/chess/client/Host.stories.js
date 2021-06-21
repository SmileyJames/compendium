import React from 'react';
import Chess from "games/chess";

export default {
  title: 'Games/Chess/Host',
  component: Chess.Host,
};

const Template = (args) => <Chess.Host {...args} />;

export const MidGame = Template.bind({});
MidGame.args = {
  state: { board: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2'},
  moves: {},
  connections: ["freind"],
};

export const CheckMate = Template.bind({});
CheckMate.args = {
  state: { board: 'rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3' },
  moves: {},
  connections: ["freind"],
};

export const Draw = Template.bind({});
Draw.args = {
  state: { board: '4k3/4P3/4K3/8/8/8/8/8 b - - 0 78' },
  moves: {},
  connections: ["freind"],
};