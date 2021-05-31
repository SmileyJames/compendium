import {
  useRef,
  useState,
  useEffect,
  useReducer,
  MutableRefObject,
  Dispatch,
  SetStateAction
} from 'react'
import { isString, isInteger } from 'lodash'
import usePeer from '../usePeer'
import { PeerId, Game } from '..'
import { LogSize, ConnectionList, Connection } from '../types'
import { PeerAcks, InputerSetter, Action, Inputer } from '.'

// TODO: refactor, event is now action, validMoves should be game probably..
const validateEvent = (event: Action, validMoves: string[]) =>
  event &&
  isString(event.move) &&
  validMoves.findIndex((m) => m === event.move) > -1

type ConnectionArgs = {
  setConnections: Dispatch<SetStateAction<ConnectionList>>
  conn: Connection
}

const appendConnection = ({ setConnections, conn }: ConnectionArgs) => {
  setConnections((conns: ConnectionList) => [...conns, conn])
}

const removeConnection = ({ setConnections, conn }: ConnectionArgs) => {
  setConnections((conns: ConnectionList) =>
    conns.filter((c: Connection) => c !== conn)
  )
}

type UpdateLogSizeMapArgs = {
  conn: Connection
  connectionLogSizeMap: MutableRefObject<PeerAcks>
  size: LogSize
}
const updateLogSizeMap = ({
  conn,
  connectionLogSizeMap,
  size = 0
}: UpdateLogSizeMapArgs) => {
  connectionLogSizeMap.current[conn.peer] = size
}

type UseConnectionsArgs = { game: Game; roomId: PeerId }
type UseConnectionsReturn = {
  connections: ConnectionList
  connectionIds: PeerId[]
  connectionLogSizeMap: MutableRefObject<PeerAcks>
  setOnGuestEvent: InputerSetter
}
function useConnections({
  game,
  roomId
}: UseConnectionsArgs): UseConnectionsReturn {
  const { peer } = usePeer(roomId)
  const [connections, setConnections] = useState<ConnectionList>([])
  const connectionLogSizeMap = useRef<PeerAcks>({})
  const [connectionIds, addConnectionId] = useReducer(
    (state: PeerId[], connId: PeerId) => [...state, connId],
    []
  )
  const [onGuestEvent, setOnGuestEvent] = useState<Inputer>(() => () => {})

  useEffect(() => {
    if (!peer || !onGuestEvent) return

    peer.on('connection', (conn) => {
      conn.on('open', () => {
        appendConnection({ setConnections, conn })
        addConnectionId(conn.peer)
      })

      conn.on('data', ({ index, ...event } = {}) => {
        if (isInteger(index)) {
          updateLogSizeMap({ conn, connectionLogSizeMap, size: index + 1 })
        }

        if (
          (isInteger(index) || index === null) &&
          validateEvent(event, Object.keys(game))
        ) {
          onGuestEvent({ ...event, connectionId: conn.peer })
        }
      })

      conn.on('close', () => {
        removeConnection({ setConnections, conn })
      })

      conn.on('error', (error) => {
        console.error(conn.peer, error)
      })
    })
  }, [peer, game, roomId, onGuestEvent])

  return { connections, connectionIds, connectionLogSizeMap, setOnGuestEvent }
}

export default useConnections
