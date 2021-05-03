import usePartyHost from './usePartyHost'
import { PeerId, Args, State } from '..'
import { EventList, EventItem } from '../types'

export type EventLogs = { [key: string]: EventList }
export type EventLogger = ({
  connectionId,
  event
}: {
  connectionId: PeerId
  event: EventItem
}) => void

export type Action = { connectionId: PeerId; move: string; args: Args }
export type ActionList = Action[]
export type Inputer = (input: Action) => void
export type InputerSetter = (inputer: () => Inputer) => void

export type States = { [key: string]: State }

export type PeerAcks = { [key: string]: number }

export default usePartyHost
