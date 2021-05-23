import React, { useEffect } from "react";
import PlayingCard, { PlayingCardBack, FeltTable, Hand } from "components/playing-card";
import { Button } from "rebass/styled-components"

const DealControls = ({ moves }) => {
  return (
    <Button onClick={() => moves.deal()}>Deal</Button>
  )
}

const CardTable = ({ state }) => {
  return (
    <FeltTable>
      <PlayingCardBack colour="R"/>
      <Hand>
        {state.discard && state.discard.map(({ suit, value }) => (
          <PlayingCard suit={suit} value={value}/>  
        ))}
      </Hand>
    </FeltTable>
  );
}

const useStartGame = ({ moves, state }) => {
  useEffect(() => {
    if (state.deck == null) {
      moves.startGame()
    }
  }, [state, moves])
}

const Host = ({ state, moves }) => {
  useStartGame({ moves, state })

  if (state.deck?.length) {
    return (
      <DealControls moves={moves}/>
    )
  } 

  return (
    <CardTable state={state}/>
  )
}

export default Host;
