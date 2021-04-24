import { useEffect, useRef, useState, useReducer } from 'react'
import usePeer from '../usePeer'
import { DataConnectionRef } from '.'
import Peer, { DataConnection } from 'peerjs'
import { PeerId } from '..'
import { EventList } from '../types'

function connect({
  roomId,
  peer
}: {
  roomId: PeerId
  peer: Peer
}): DataConnection {
  return peer.connect(roomId, { serialization: 'json' })
}

type UseConnectionArgs = { id: PeerId; roomId: PeerId }
type UseConnectionReturn = {
  connected: boolean
  conn: DataConnectionRef
  data: EventList
  clearData: () => void
}
function useConnection({ id, roomId }: UseConnectionArgs): UseConnectionReturn {
  const conn = useRef<DataConnection | null>(null)
  const { open, peer } = usePeer(id)
  const [data, setData] = useState<EventList>([])
  const [connected, setConnected] = useState<boolean>(false)
  const [attempts, countAttempt] = useReducer((a: number) => a + 1, 0)

  useEffect(() => {
    if (!peer || !open || connected) return

    conn.current = connect({ peer, roomId })

    const retry = () => {
      conn.current = null
      setConnected(false)
      countAttempt()
    }
    const timeout = setTimeout(retry, 1000)

    conn.current.on('open', () => {
      clearTimeout(timeout)
      setConnected(true)
    })

    conn.current.on('data', (data) => {
      setData((stream) => [...stream, ...data])
    })

    conn.current.on('close', () => {
      clearTimeout(timeout)
      retry()
    })

    conn.current.on('error', (error) => {
      console.error(error)
    })
  }, [attempts, open, connected, roomId, peer])

  const clearData = () => {
    setData([])
  }
  return { connected: open && connected, conn, data, clearData }
}

export default useConnection
