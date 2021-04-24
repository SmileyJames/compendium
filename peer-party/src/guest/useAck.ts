import { useEffect } from 'react'
import { logSizeToIndex } from './funcs'
import { DataConnectionRef } from '.'
import { Index } from '..'

const ack = ({ conn, index }: { conn: DataConnectionRef; index: Index }) => {
  conn.current?.send({ index })
}

type UseAckArgs = {
  connected: boolean
  conn: DataConnectionRef
  logSize: number
}
function useAck({ connected, conn, logSize }: UseAckArgs): void {
  useEffect(() => {
    if (!conn.current || !connected) return
    const index = logSizeToIndex(logSize)
    ack({ conn, index })
  }, [connected, conn, logSize])
}

export default useAck
