const joinAsAPlayer = ({ state, connectionId, args }) => {
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

const everyoneIsIn = ({ state }) => ({
  ...state,
  players: {
    ...state.players,
    everyoneIsIn: true
  }
})

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
