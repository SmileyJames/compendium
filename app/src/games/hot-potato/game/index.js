import { withSecret, withRandom } from "@compendium/peer-party";

const game = {
  passPotato: withRandom(withSecret(({ callerId, revealSecret, state, random, contextId }) => {
    if (!revealSecret(callerId, s => s.hotPotato)) {
      throw new Error("Must have potato to throw it");
    }
    const numPlayers = state.players.list.length;
    const playerIndex = Math.floor(random() * numPlayers);
    const player = state.players.list[playerIndex];
    if (player.callerId === contextId) {
      return { ...state, hotPotato: true }
    } else {
      return { ...state, hotPotato: false }
    }
  })),

  setBackgroundColour: ({ state, args }) => {
    return { ...state, backgroundColour: args.backgroundColour };
  },

  throwPotato: withRandom(withSecret(({ state, random, contextId }) => {
    const numPlayers = state.players.list.length;
    const playerIndex = Math.floor(random() * numPlayers);
    const player = state.players.list[playerIndex];
    if (player.callerId === contextId) {
      return { ...state, hotPotato: true }
    } else {
      return { ...state, hotPotato: false }
    }
  })),

  stopMusic: withSecret(({ state, revealSecret }) => {
    const hotPotatoPlayer = state.players.list.find(({ callerId  }) => (
      revealSecret(callerId, s => s.hotPotato)
    ));
    return { ...state, loser: hotPotatoPlayer.callerId };
  }),
}

export default game;
