import usePartyGuest from './usePartyGuest'
import { DataConnection } from 'peerjs'
import { State } from '..'
import { LogSize } from '../types'
import { MutableRefObject, Dispatch, SetStateAction } from 'react'

export type CacheAndState = { cache: State; state: State }

export type DataConnectionRef = MutableRefObject<DataConnection | null>
export type CacheAndStateSetter = Dispatch<SetStateAction<CacheAndState>>
export type LogSizeSetter = Dispatch<SetStateAction<LogSize>>

export default usePartyGuest
