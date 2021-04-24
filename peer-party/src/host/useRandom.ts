import { useMemo } from 'react'
import seedrandom from 'seedrandom'
import { PeerId, RandomNumberGenerator, Secret } from '..'

function useRandom({
  secret,
  roomId
}: {
  secret: Secret
  roomId: PeerId
}): RandomNumberGenerator {
  const random = useMemo<RandomNumberGenerator>(
    () => seedrandom(secret || roomId),
    [secret, roomId]
  )
  return random
}

export default useRandom
