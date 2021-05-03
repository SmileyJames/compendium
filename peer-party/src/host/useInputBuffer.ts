import { useEffect, useState } from 'react'
import { InputerSetter, Inputer, ActionList, Action } from '.'

type UseInputBufferArgs = {
  setOnGuestEvent: InputerSetter
  setOnHostEvent: InputerSetter
  input: Inputer
}

function useInputBuffer({
  setOnGuestEvent,
  setOnHostEvent,
  input
}: UseInputBufferArgs) {
  const [inputBuffer, setInputBuffer] = useState<ActionList>([])

  useEffect(() => {
    const pushInput = (inputItem: Action) => {
      setInputBuffer((buffer: ActionList) => [...buffer, inputItem])
    }
    setOnGuestEvent(() => pushInput)
    setOnHostEvent(() => pushInput)
  }, [setOnGuestEvent, setOnHostEvent, setInputBuffer])

  useEffect(() => {
    if (!inputBuffer.length || !input) return
    setInputBuffer(([head, ...tail]) => {
      input(head)
      return tail
    })
  }, [inputBuffer, input, setInputBuffer])
}

export default useInputBuffer
