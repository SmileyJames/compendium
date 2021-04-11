const joinAsAPlayer = ({ state, connectionId, args }) => {
  if (state.players.list.length >= state.players.maxPlayers) {
    throw new Error("The number of players has reached it's maximum");
  }
  const player = { connectionId, name: args.name, emoji: args.emoji };
  const playerList = [...state.players.list, player];
  const players = { ...state.players, list: playerList };
  return { ...state, players };
}

const initPlayers = ({ state, args }) => {
  const players = {
    maxPlayers: args.maxPlayers,
    minPlayers: args.minPlayers,
    everyoneIsIn: false,
    list: []
  }
  return { ...state, players }
}

const everyoneIsIn = ({ state }) => {
  if (state.players.list.length > state.players.maxPlayers) {
    throw new Error("Too many players");
  }
  if (state.players.list.length < state.players.minPlayers) {
    throw new Error("Not enough players");
  }
  return {
    ...state,
    players: {
      ...state.players,
      everyoneIsIn: true
    }
  }
}

const game = {
  guestMoves: {
    joinAsAPlayer,
  },
  
  hostMoves: {
    initPlayers,
    everyoneIsIn,
  },
}

export default game;
