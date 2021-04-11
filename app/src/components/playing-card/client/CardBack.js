import React from "react";
import RED_BACK from './cards/RED_BACK.svg'
import BLUE_BACK from './cards/BLUE_BACK.svg'
import Card from "./Card";

const getFaceImage = ({ colour }) => {
  if (colour === 'R') {
    return RED_BACK
  } else if (colour === 'B') {
    return BLUE_BACK
  }
}

const CardBack = ({ colour, isSelected = false, canBeSelected = false, selectColor = null }) => {
  const faceImage = getFaceImage({ colour });
  return (
    <Card faceImage={faceImage} altText='🂠 Card Back' isSelected={isSelected} canBeSelected={canBeSelected} selectColor={selectColor}/>
  );
}

export default CardBack;
