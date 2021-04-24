import usePartyGuest from './usePartyGuest'
import { DataConnection } from 'peerjs'
import { PeerId, Game, State, LogSize } from '..'
import { MutableRefObject, Dispatch, SetStateAction } from 'react'

export type UsePartyGuestArgs = { roomId: PeerId; game: Game }

export type CacheAndState = { cache: State; state: State }

export type DataConnectionRef = MutableRefObject<DataConnection | null>
export type CacheAndStateSetter = Dispatch<SetStateAction<CacheAndState>>
export type LogSizeSetter = Dispatch<SetStateAction<LogSize>>

export default usePartyGuest
