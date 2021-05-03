import { withSecret, withRandom } from "@compendium/peer-party";

const game = {
  guestMoves: {
    passPotato: withRandom(withSecret(({ connectionId, revealSecret, state, random, contextId }) => {
      if (!revealSecret(connectionId, s => s.hotPotato)) {
        throw new Error("Must have potato to throw it");
      }
      const numPlayers = state.players.list.length;
      const playerIndex = Math.floor(random() * numPlayers);
      const player = state.players.list[playerIndex];
      if (player.connectionId === contextId) {
        return { ...state, hotPotato: true }
      } else {
        return { ...state, hotPotato: false }
      }
    })),
  },
  
  hostMoves: {
    setBackgroundColour: ({ state, args }) => {
      return { ...state, backgroundColour: args.backgroundColour };
    },
    throwPotato: withRandom(withSecret(({ state, random, contextId, revealSecret }) => {
      const numPlayers = state.players.list.length;
      const playerIndex = Math.floor(random() * numPlayers);
      const player = state.players.list[playerIndex];
      if (player.connectionId === contextId) {
        return { ...state, hotPotato: true }
      } else {
        return { ...state, hotPotato: false }
      }
    })),
    stopMusic: withSecret(({ state, revealSecret }) => {
      const hotPotatoPlayer = state.players.list.find(({ connectionId  }) => (
        revealSecret(connectionId, s => s.hotPotato)
      ));
      return { ...state, loser: hotPotatoPlayer.connectionId };
    }),
  },
}

export default game;
