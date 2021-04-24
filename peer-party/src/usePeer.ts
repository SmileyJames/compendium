import {
  useEffect,
  useState,
  useReducer,
  Dispatch,
  SetStateAction
} from 'react'
import Peer from 'peerjs'
import { ConnectionStatus, PeerId } from '.'

type PeerSetter = Dispatch<SetStateAction<Peer | null>>
const destructPeer = ({
  peer,
  setPeer
}: {
  peer: Peer
  setPeer: PeerSetter
}) => {
  peer && peer.destroy()
  setPeer(null)
}

const opts = { host: 'signalling.compendium.games', secure: true }

function usePeer(id: PeerId): { open: ConnectionStatus; peer: Peer | null } {
  const [peer, setPeer] = useState<Peer | null>(null)
  const [open, setOpen] = useState(false)
  const [attempts, countAttempt] = useReducer((a: number) => a + 1, 0)

  useEffect(() => {
    if (open) return

    const peer = new Peer(id, opts)
    setPeer(peer)

    const retry = () => {
      setOpen(false)
      destructPeer({ peer, setPeer })
      countAttempt()
    }

    let timeout = setTimeout(retry, 1000)

    peer.on('open', () => {
      clearTimeout(timeout)
      setOpen(true)
    })

    const onConnectionClosed = () => {
      clearTimeout(timeout)
      timeout = setTimeout(retry, 1000)
    }
    peer.on('close', onConnectionClosed)
    peer.on('disconnected', onConnectionClosed)
    peer.on('error', onConnectionClosed)

    return () => {
      destructPeer({ peer, setPeer })
      clearTimeout(timeout)
    }
  }, [attempts, id])

  return { open, peer }
}

export default usePeer
