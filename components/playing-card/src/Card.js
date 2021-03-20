import React, { Component } from 'react'
import { JOKER, ACE, KING, QUEEN, JACK } from './model'
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
import RED_BACK from './cards/RED_BACK.svg'
import BLUE_BACK from './cards/BLUE_BACK.svg'

class Card extends Component {
  getClassName() {
    let classNames = ['card', ...(this.props.classNames || [])]
    if (this.props.isSelected) classNames.push('selected')
    return classNames.join(' ')
  }

  getStyle() {
    return null
  }

  render() {
    return (
      <div className={this.getClassName()} style={this.getStyle()}>
        <img src={this.getSrc()} alt={this.getAlt()} />
        <div onClick={this.props.onClick} className="overlay"></div>
      </div>
    )
  }
}

class CardBack extends Card {
  getAlt() {
    return '🂠 Card Back'
  }

  getSrc() {
    if (this.props.colour === 'R') {
      return RED_BACK
    } else if (this.props.colour === 'B') {
      return BLUE_BACK
    }
  }
}

class CardFront extends Card {
  getStyle() {
    return {
      order: this.props.order,
    }
  }

  getSrc() {
    if (this.props.value === JOKER) {
      return JKR
    } else if (this.props.value === ACE && this.props.suit === 'H') {
      return HA
    } else if (this.props.value === ACE && this.props.suit === 'D') {
      return DA
    } else if (this.props.value === ACE && this.props.suit === 'S') {
      return SA
    } else if (this.props.value === ACE && this.props.suit === 'C') {
      return CA
    } else if (this.props.value === 2 && this.props.suit === 'H') {
      return H2
    } else if (this.props.value === 2 && this.props.suit === 'D') {
      return D2
    } else if (this.props.value === 2 && this.props.suit === 'S') {
      return S2
    } else if (this.props.value === 2 && this.props.suit === 'C') {
      return C2
    } else if (this.props.value === 3 && this.props.suit === 'H') {
      return H3
    } else if (this.props.value === 3 && this.props.suit === 'D') {
      return D3
    } else if (this.props.value === 3 && this.props.suit === 'S') {
      return S3
    } else if (this.props.value === 3 && this.props.suit === 'C') {
      return C3
    } else if (this.props.value === 4 && this.props.suit === 'H') {
      return H4
    } else if (this.props.value === 4 && this.props.suit === 'D') {
      return D4
    } else if (this.props.value === 4 && this.props.suit === 'S') {
      return S4
    } else if (this.props.value === 4 && this.props.suit === 'C') {
      return C4
    } else if (this.props.value === 5 && this.props.suit === 'H') {
      return H5
    } else if (this.props.value === 5 && this.props.suit === 'D') {
      return D5
    } else if (this.props.value === 5 && this.props.suit === 'S') {
      return S5
    } else if (this.props.value === 5 && this.props.suit === 'C') {
      return C5
    } else if (this.props.value === 6 && this.props.suit === 'H') {
      return H6
    } else if (this.props.value === 6 && this.props.suit === 'D') {
      return D6
    } else if (this.props.value === 6 && this.props.suit === 'S') {
      return S6
    } else if (this.props.value === 6 && this.props.suit === 'C') {
      return C6
    } else if (this.props.value === 7 && this.props.suit === 'H') {
      return H7
    } else if (this.props.value === 7 && this.props.suit === 'D') {
      return D7
    } else if (this.props.value === 7 && this.props.suit === 'S') {
      return S7
    } else if (this.props.value === 7 && this.props.suit === 'C') {
      return C7
    } else if (this.props.value === 8 && this.props.suit === 'H') {
      return H8
    } else if (this.props.value === 8 && this.props.suit === 'D') {
      return D8
    } else if (this.props.value === 8 && this.props.suit === 'S') {
      return S8
    } else if (this.props.value === 8 && this.props.suit === 'C') {
      return C8
    } else if (this.props.value === 9 && this.props.suit === 'H') {
      return H9
    } else if (this.props.value === 9 && this.props.suit === 'D') {
      return D9
    } else if (this.props.value === 9 && this.props.suit === 'S') {
      return S9
    } else if (this.props.value === 9 && this.props.suit === 'C') {
      return C9
    } else if (this.props.value === 10 && this.props.suit === 'H') {
      return H10
    } else if (this.props.value === 10 && this.props.suit === 'D') {
      return D10
    } else if (this.props.value === 10 && this.props.suit === 'S') {
      return S10
    } else if (this.props.value === 10 && this.props.suit === 'C') {
      return C10
    } else if (this.props.value === JACK && this.props.suit === 'H') {
      return HJ
    } else if (this.props.value === JACK && this.props.suit === 'D') {
      return DJ
    } else if (this.props.value === JACK && this.props.suit === 'S') {
      return SJ
    } else if (this.props.value === JACK && this.props.suit === 'C') {
      return CJ
    } else if (this.props.value === QUEEN && this.props.suit === 'H') {
      return HQ
    } else if (this.props.value === QUEEN && this.props.suit === 'D') {
      return DQ
    } else if (this.props.value === QUEEN && this.props.suit === 'S') {
      return SQ
    } else if (this.props.value === QUEEN && this.props.suit === 'C') {
      return CQ
    } else if (this.props.value === KING && this.props.suit === 'H') {
      return HK
    } else if (this.props.value === KING && this.props.suit === 'D') {
      return DK
    } else if (this.props.value === KING && this.props.suit === 'S') {
      return SK
    } else if (this.props.value === KING && this.props.suit === 'C') {
      return CK
    }
  }

  getAlt() {
    if (this.props.value === JOKER) {
      return '🃏 Joker'
    } else if (this.props.value === ACE && this.props.suit === 'H') {
      return '🂱 Ace of Hearts'
    } else if (this.props.value === ACE && this.props.suit === 'D') {
      return '🃁 Ace of Diamonds'
    } else if (this.props.value === ACE && this.props.suit === 'S') {
      return '🂡 Ace of Spaces'
    } else if (this.props.value === ACE && this.props.suit === 'C') {
      return '🃑 Ace of Clubs'
    } else if (this.props.value === 2 && this.props.suit === 'H') {
      return '🂲 Two of Hearts'
    } else if (this.props.value === 2 && this.props.suit === 'D') {
      return '🃂 Two of Diamonds'
    } else if (this.props.value === 2 && this.props.suit === 'S') {
      return '🂢 Two of Spades'
    } else if (this.props.value === 2 && this.props.suit === 'C') {
      return '🃒 Two of Clubs'
    } else if (this.props.value === 3 && this.props.suit === 'H') {
      return '🂳 Three of Hearts'
    } else if (this.props.value === 3 && this.props.suit === 'D') {
      return '🃃 Three of Diamonds'
    } else if (this.props.value === 3 && this.props.suit === 'S') {
      return '🂣 Three of Spades'
    } else if (this.props.value === 3 && this.props.suit === 'C') {
      return '🃓 Three of Clubs'
    } else if (this.props.value === 4 && this.props.suit === 'H') {
      return '🂴 Four of Hearts'
    } else if (this.props.value === 4 && this.props.suit === 'D') {
      return '🃄 Four of Diamonds'
    } else if (this.props.value === 4 && this.props.suit === 'S') {
      return '🂤 Four of Spades'
    } else if (this.props.value === 4 && this.props.suit === 'C') {
      return '🃔 Four of Clubs'
    } else if (this.props.value === 5 && this.props.suit === 'H') {
      return '🂵 Five of Hearts'
    } else if (this.props.value === 5 && this.props.suit === 'D') {
      return '🃅 Five of Diamonds'
    } else if (this.props.value === 5 && this.props.suit === 'S') {
      return '🂥 Five of Spades'
    } else if (this.props.value === 5 && this.props.suit === 'C') {
      return '🃕 Five of Clubs'
    } else if (this.props.value === 6 && this.props.suit === 'H') {
      return '🂶 Six of Hearts'
    } else if (this.props.value === 6 && this.props.suit === 'D') {
      return '🃆 Six of Diamomnds'
    } else if (this.props.value === 6 && this.props.suit === 'S') {
      return '🂦 Six of Spades'
    } else if (this.props.value === 6 && this.props.suit === 'C') {
      return '🃖 Six of Clubs'
    } else if (this.props.value === 7 && this.props.suit === 'H') {
      return '🂷 Seven of Hearts'
    } else if (this.props.value === 7 && this.props.suit === 'D') {
      return '🃇 Seven of Diamonds'
    } else if (this.props.value === 7 && this.props.suit === 'S') {
      return '🂧 Seven of Spades'
    } else if (this.props.value === 7 && this.props.suit === 'C') {
      return '🃗 Seven of Clubs'
    } else if (this.props.value === 8 && this.props.suit === 'H') {
      return '🂸 Eight of Hearts'
    } else if (this.props.value === 8 && this.props.suit === 'D') {
      return '🃈 Eight of Diamonds'
    } else if (this.props.value === 8 && this.props.suit === 'S') {
      return '🂨 Eight of Spades'
    } else if (this.props.value === 8 && this.props.suit === 'C') {
      return '🃘 Eight of Clubs'
    } else if (this.props.value === 9 && this.props.suit === 'H') {
      return '🂹 Nine of Hearts'
    } else if (this.props.value === 9 && this.props.suit === 'D') {
      return '🃉 Nine of Diamonds'
    } else if (this.props.value === 9 && this.props.suit === 'S') {
      return '🂩 Nine of Spades'
    } else if (this.props.value === 9 && this.props.suit === 'C') {
      return '🃙 Nine of Clubs'
    } else if (this.props.value === 10 && this.props.suit === 'H') {
      return '🂺 Ten of Hearts'
    } else if (this.props.value === 10 && this.props.suit === 'D') {
      return '🃊 Ten of Diamonds'
    } else if (this.props.value === 10 && this.props.suit === 'S') {
      return '🂪 Ten of Spades'
    } else if (this.props.value === 10 && this.props.suit === 'C') {
      return '🃚 Ten of Clubs'
    } else if (this.props.value === JACK && this.props.suit === 'H') {
      return '🂻 Jack of Hearts'
    } else if (this.props.value === JACK && this.props.suit === 'D') {
      return '🃋 Jack of Diamonds'
    } else if (this.props.value === JACK && this.props.suit === 'S') {
      return '🂫 Jack of Spades'
    } else if (this.props.value === JACK && this.props.suit === 'C') {
      return '🃛 Jack of Clubs'
    } else if (this.props.value === QUEEN && this.props.suit === 'H') {
      return '🂽 Queen of Hearts'
    } else if (this.props.value === QUEEN && this.props.suit === 'D') {
      return '🃍 Queen of Diamonds'
    } else if (this.props.value === QUEEN && this.props.suit === 'S') {
      return '🂭 Queen of Spades'
    } else if (this.props.value === QUEEN && this.props.suit === 'C') {
      return '🃝 Queen of Clubs'
    } else if (this.props.value === KING && this.props.suit === 'H') {
      return '🂾 King of Hearts'
    } else if (this.props.value === KING && this.props.suit === 'D') {
      return '🃞 King of Diamonds'
    } else if (this.props.value === KING && this.props.suit === 'S') {
      return '🂮 King of Spades'
    } else if (this.props.value === KING && this.props.suit === 'C') {
      return '🃞 King of Clubs'
    }
  }
}

export { CardFront, CardBack }
