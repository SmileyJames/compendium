import usePartyHost from './usePartyHost'
import { PeerId, Args, State, EventList, EventItem } from '..'

export type EventLogs = { [key: string]: EventList }
export type EventLogger = ({
  connectionId,
  event
}: {
  connectionId: PeerId
  event: EventItem
}) => void

export type InputItem = { connectionId: PeerId; move: string; args: Args }
export type InputList = InputItem[]
export type Inputer = (input: InputItem) => void
export type InputerSetter = (inputer: () => Inputer) => void

export type States = { [key: string]: State }

export type PeerAcks = { [key: string]: number }

export default usePartyHost
