import { useEffect, useState } from "react";

const useInputBuffer = ({ setOnGuestEvent, setOnHostEvent, input }) => {
    const [inputBuffer, setInputBuffer] = useState([]);

    useEffect(() => {
      const pushInput = (event) => (
        setInputBuffer((buffer => [...buffer, event])
      ))
      setOnGuestEvent(() => pushInput);
      setOnHostEvent(() => pushInput);
    }, [setOnGuestEvent, setOnHostEvent, setInputBuffer]);
    
    useEffect(() => {
      if (!inputBuffer.length || !input) return;
      setInputBuffer(([head, ...tail]) => {
        input(head)
        return tail;
      })
    }, [inputBuffer, input]);
}

export default useInputBuffer;