import React from "react";
import HA from './cards/AH.svg'
import CA from './cards/AC.svg'
import DA from './cards/AD.svg'
import SA from './cards/AS.svg'
import H2 from './cards/2H.svg'
import C2 from './cards/2C.svg'
import D2 from './cards/2D.svg'
import S2 from './cards/2S.svg'
import H3 from './cards/3H.svg'
import C3 from './cards/3C.svg'
import D3 from './cards/3D.svg'
import S3 from './cards/3S.svg'
import H4 from './cards/4H.svg'
import C4 from './cards/4C.svg'
import D4 from './cards/4D.svg'
import S4 from './cards/4S.svg'
import H5 from './cards/5H.svg'
import C5 from './cards/5C.svg'
import D5 from './cards/5D.svg'
import S5 from './cards/5S.svg'
import H6 from './cards/6H.svg'
import C6 from './cards/6C.svg'
import D6 from './cards/6D.svg'
import S6 from './cards/6S.svg'
import H7 from './cards/7H.svg'
import C7 from './cards/7C.svg'
import D7 from './cards/7D.svg'
import S7 from './cards/7S.svg'
import H8 from './cards/8H.svg'
import C8 from './cards/8C.svg'
import D8 from './cards/8D.svg'
import S8 from './cards/8S.svg'
import H9 from './cards/9H.svg'
import C9 from './cards/9C.svg'
import D9 from './cards/9D.svg'
import S9 from './cards/9S.svg'
import H10 from './cards/10H.svg'
import C10 from './cards/10C.svg'
import D10 from './cards/10D.svg'
import S10 from './cards/10S.svg'
import HJ from './cards/JH.svg'
import CJ from './cards/JC.svg'
import DJ from './cards/JD.svg'
import SJ from './cards/JS.svg'
import HQ from './cards/QH.svg'
import CQ from './cards/QC.svg'
import DQ from './cards/QD.svg'
import SQ from './cards/QS.svg'
import HK from './cards/KH.svg'
import CK from './cards/KC.svg'
import DK from './cards/KD.svg'
import SK from './cards/KS.svg'
import JKR from './cards/JOKER.svg'
import { JOKER, ACE, KING, QUEEN, JACK } from '../game'
import Card from "./Card";

const getFaceImage = ({ suit, value }) => {
  if (value === JOKER) {
    return JKR
  } else if (value === ACE && suit === 'H') {
    return HA
  } else if (value === ACE && suit === 'D') {
    return DA
  } else if (value === ACE && suit === 'S') {
    return SA
  } else if (value === ACE && suit === 'C') {
    return CA
  } else if (value === 2 && suit === 'H') {
    return H2
  } else if (value === 2 && suit === 'D') {
    return D2
  } else if (value === 2 && suit === 'S') {
    return S2
  } else if (value === 2 && suit === 'C') {
    return C2
  } else if (value === 3 && suit === 'H') {
    return H3
  } else if (value === 3 && suit === 'D') {
    return D3
  } else if (value === 3 && suit === 'S') {
    return S3
  } else if (value === 3 && suit === 'C') {
    return C3
  } else if (value === 4 && suit === 'H') {
    return H4
  } else if (value === 4 && suit === 'D') {
    return D4
  } else if (value === 4 && suit === 'S') {
    return S4
  } else if (value === 4 && suit === 'C') {
    return C4
  } else if (value === 5 && suit === 'H') {
    return H5
  } else if (value === 5 && suit === 'D') {
    return D5
  } else if (value === 5 && suit === 'S') {
    return S5
  } else if (value === 5 && suit === 'C') {
    return C5
  } else if (value === 6 && suit === 'H') {
    return H6
  } else if (value === 6 && suit === 'D') {
    return D6
  } else if (value === 6 && suit === 'S') {
    return S6
  } else if (value === 6 && suit === 'C') {
    return C6
  } else if (value === 7 && suit === 'H') {
    return H7
  } else if (value === 7 && suit === 'D') {
    return D7
  } else if (value === 7 && suit === 'S') {
    return S7
  } else if (value === 7 && suit === 'C') {
    return C7
  } else if (value === 8 && suit === 'H') {
    return H8
  } else if (value === 8 && suit === 'D') {
    return D8
  } else if (value === 8 && suit === 'S') {
    return S8
  } else if (value === 8 && suit === 'C') {
    return C8
  } else if (value === 9 && suit === 'H') {
    return H9
  } else if (value === 9 && suit === 'D') {
    return D9
  } else if (value === 9 && suit === 'S') {
    return S9
  } else if (value === 9 && suit === 'C') {
    return C9
  } else if (value === 10 && suit === 'H') {
    return H10
  } else if (value === 10 && suit === 'D') {
    return D10
  } else if (value === 10 && suit === 'S') {
    return S10
  } else if (value === 10 && suit === 'C') {
    return C10
  } else if (value === JACK && suit === 'H') {
    return HJ
  } else if (value === JACK && suit === 'D') {
    return DJ
  } else if (value === JACK && suit === 'S') {
    return SJ
  } else if (value === JACK && suit === 'C') {
    return CJ
  } else if (value === QUEEN && suit === 'H') {
    return HQ
  } else if (value === QUEEN && suit === 'D') {
    return DQ
  } else if (value === QUEEN && suit === 'S') {
    return SQ
  } else if (value === QUEEN && suit === 'C') {
    return CQ
  } else if (value === KING && suit === 'H') {
    return HK
  } else if (value === KING && suit === 'D') {
    return DK
  } else if (value === KING && suit === 'S') {
    return SK
  } else if (value === KING && suit === 'C') {
    return CK
  }
}

const getAltText = ({ value, suit }) => {
  if (value === JOKER) {
    return '🃏 Joker'
  } else if (value === ACE && suit === 'H') {
    return '🂱 Ace of Hearts'
  } else if (value === ACE && suit === 'D') {
    return '🃁 Ace of Diamonds'
  } else if (value === ACE && suit === 'S') {
    return '🂡 Ace of Spaces'
  } else if (value === ACE && suit === 'C') {
    return '🃑 Ace of Clubs'
  } else if (value === 2 && suit === 'H') {
    return '🂲 Two of Hearts'
  } else if (value === 2 && suit === 'D') {
    return '🃂 Two of Diamonds'
  } else if (value === 2 && suit === 'S') {
    return '🂢 Two of Spades'
  } else if (value === 2 && suit === 'C') {
    return '🃒 Two of Clubs'
  } else if (value === 3 && suit === 'H') {
    return '🂳 Three of Hearts'
  } else if (value === 3 && suit === 'D') {
    return '🃃 Three of Diamonds'
  } else if (value === 3 && suit === 'S') {
    return '🂣 Three of Spades'
  } else if (value === 3 && suit === 'C') {
    return '🃓 Three of Clubs'
  } else if (value === 4 && suit === 'H') {
    return '🂴 Four of Hearts'
  } else if (value === 4 && suit === 'D') {
    return '🃄 Four of Diamonds'
  } else if (value === 4 && suit === 'S') {
    return '🂤 Four of Spades'
  } else if (value === 4 && suit === 'C') {
    return '🃔 Four of Clubs'
  } else if (value === 5 && suit === 'H') {
    return '🂵 Five of Hearts'
  } else if (value === 5 && suit === 'D') {
    return '🃅 Five of Diamonds'
  } else if (value === 5 && suit === 'S') {
    return '🂥 Five of Spades'
  } else if (value === 5 && suit === 'C') {
    return '🃕 Five of Clubs'
  } else if (value === 6 && suit === 'H') {
    return '🂶 Six of Hearts'
  } else if (value === 6 && suit === 'D') {
    return '🃆 Six of Diamomnds'
  } else if (value === 6 && suit === 'S') {
    return '🂦 Six of Spades'
  } else if (value === 6 && suit === 'C') {
    return '🃖 Six of Clubs'
  } else if (value === 7 && suit === 'H') {
    return '🂷 Seven of Hearts'
  } else if (value === 7 && suit === 'D') {
    return '🃇 Seven of Diamonds'
  } else if (value === 7 && suit === 'S') {
    return '🂧 Seven of Spades'
  } else if (value === 7 && suit === 'C') {
    return '🃗 Seven of Clubs'
  } else if (value === 8 && suit === 'H') {
    return '🂸 Eight of Hearts'
  } else if (value === 8 && suit === 'D') {
    return '🃈 Eight of Diamonds'
  } else if (value === 8 && suit === 'S') {
    return '🂨 Eight of Spades'
  } else if (value === 8 && suit === 'C') {
    return '🃘 Eight of Clubs'
  } else if (value === 9 && suit === 'H') {
    return '🂹 Nine of Hearts'
  } else if (value === 9 && suit === 'D') {
    return '🃉 Nine of Diamonds'
  } else if (value === 9 && suit === 'S') {
    return '🂩 Nine of Spades'
  } else if (value === 9 && suit === 'C') {
    return '🃙 Nine of Clubs'
  } else if (value === 10 && suit === 'H') {
    return '🂺 Ten of Hearts'
  } else if (value === 10 && suit === 'D') {
    return '🃊 Ten of Diamonds'
  } else if (value === 10 && suit === 'S') {
    return '🂪 Ten of Spades'
  } else if (value === 10 && suit === 'C') {
    return '🃚 Ten of Clubs'
  } else if (value === JACK && suit === 'H') {
    return '🂻 Jack of Hearts'
  } else if (value === JACK && suit === 'D') {
    return '🃋 Jack of Diamonds'
  } else if (value === JACK && suit === 'S') {
    return '🂫 Jack of Spades'
  } else if (value === JACK && suit === 'C') {
    return '🃛 Jack of Clubs'
  } else if (value === QUEEN && suit === 'H') {
    return '🂽 Queen of Hearts'
  } else if (value === QUEEN && suit === 'D') {
    return '🃍 Queen of Diamonds'
  } else if (value === QUEEN && suit === 'S') {
    return '🂭 Queen of Spades'
  } else if (value === QUEEN && suit === 'C') {
    return '🃝 Queen of Clubs'
  } else if (value === KING && suit === 'H') {
    return '🂾 King of Hearts'
  } else if (value === KING && suit === 'D') {
    return '🃞 King of Diamonds'
  } else if (value === KING && suit === 'S') {
    return '🂮 King of Spades'
  } else if (value === KING && suit === 'C') {
    return '🃞 King of Clubs'
  }
}

const CardFront = ({ value, suit, canBeSelected = false, isSelected = false, selectColor = null }) => {
  console.log("select", selectColor);
  const faceImage = getFaceImage({ value, suit });
  const altText = getAltText({ value, suit });
  return (
    <Card faceImage={faceImage} altText={altText} isSelected={isSelected} canBeSelected={canBeSelected} selectColor={selectColor}/>
  );
}

export default CardFront;
