import useAck from './useAck'
import useSync from './useSync'
import useMoves from './useMoves'
import useConnection from './useConnection'
import { useIdStore, useStateStore, useLogSizeStore } from './stores'
import { UsePartyGuestArgs, UsePartyGuestReturn } from '..'

function usePartyGuest({
  roomId,
  game
}: UsePartyGuestArgs): UsePartyGuestReturn {
  const { id } = useIdStore(roomId)
  const { cache, setState } = useStateStore(roomId)
  const { logSize, setLogSize } = useLogSizeStore(roomId)
  const { connected, conn, data, clearData } = useConnection({ id, roomId })
  useAck({ connected, conn, logSize })
  useSync({ data, clearData, game, roomId, setState, setLogSize })
  const { moves } = useMoves({
    connected,
    conn,
    id,
    setState,
    roomId,
    game,
    logSize
  })
  return { connectionId: id, connected, state: cache, moves }
}

export default usePartyGuest
