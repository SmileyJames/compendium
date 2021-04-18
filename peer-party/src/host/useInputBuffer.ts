import { useEffect, useState } from "react";
import { InputerSetter, Inputer, InputList, InputItem } from ".";


type UseInputBufferArgs = { setOnGuestEvent: InputerSetter, setOnHostEvent: InputerSetter, input: Inputer };

function useInputBuffer({ setOnGuestEvent, setOnHostEvent, input }: UseInputBufferArgs) {
    const [inputBuffer, setInputBuffer] = useState<InputList>([]);

    useEffect(() => {
      const pushInput = (inputItem: InputItem) => {
        setInputBuffer((buffer: InputList) => ([...buffer, inputItem]));
      };
      setOnGuestEvent(() => pushInput);
      setOnHostEvent(() => pushInput);
    }, [setOnGuestEvent, setOnHostEvent, setInputBuffer]);
    
    useEffect(() => {
      if (!inputBuffer.length || !input) return;
      setInputBuffer(([head, ...tail]) => {
        input(head)
        return tail;
      })
    }, [inputBuffer, input, setInputBuffer]);
}

export default useInputBuffer;