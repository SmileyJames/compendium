import React from 'react';
import Chess from "games/chess";

export default {
  title: 'Games/Chess/Guest',
  component: Chess.Guest,
};

const Template = (args) => <Chess.Guest {...args} />;

export const MidGame = Template.bind({});
MidGame.args = {
  state: { board: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2'},
  moves: {},
  connectionId: "xxx",
};