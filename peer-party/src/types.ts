import { DataConnection } from 'peerjs'
import { Args, PeerId } from '.'

export type Connection = DataConnection
export type ConnectionList = DataConnection[]

export type Index = number | null
export type LogSize = number
export type Seed = string
export type Patch = any

export interface Ack {
  index: Index
}
export interface Emit {
  index: Index
  move: string
  args: Args
}
export interface EventItem {
  index: Index
  connectionId: PeerId
  move: string
  args?: any
  seed?: Seed
  patch?: Patch
}
export type EventList = EventItem[]

export type MoveHandlerArgs = { move: string; args: Args }
export type MoveHandler = (args: MoveHandlerArgs) => void
export type MoveHandlerSetter = () => MoveHandler
