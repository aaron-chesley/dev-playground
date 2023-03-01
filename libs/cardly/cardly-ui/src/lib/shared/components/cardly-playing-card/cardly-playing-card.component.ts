import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Card, Rank } from '@playground/cardly-util';

@Component({
  selector: 'cardly-playing-card',
  templateUrl: './cardly-playing-card.component.html',
  styleUrls: ['./cardly-playing-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class CardlyPlayingCardComponent {
  @Input() card: Card;
  @Output() clicked = new EventEmitter();

  getImg() {
    let imgUrl = `/cards/${this.card.suit}/`;

    switch (this.card.rank) {
      case Rank.TWO:
        imgUrl += '2';
        break;
      case Rank.THREE:
        imgUrl += '3';
        break;
      case Rank.FOUR:
        imgUrl += '4';
        break;
      case Rank.FIVE:
        imgUrl += '5';
        break;
      case Rank.SIX:
        imgUrl += '6';
        break;
      case Rank.SEVEN:
        imgUrl += '7';
        break;
      case Rank.EIGHT:
        imgUrl += '8';
        break;
      case Rank.NINE:
        imgUrl += '9';
        break;
      case Rank.TEN:
        imgUrl += '10';
        break;
      case Rank.JACK:
        imgUrl += 'jack';
        break;
      case Rank.QUEEN:
        imgUrl += 'queen';
        break;
      case Rank.KING:
        imgUrl += 'king';
        break;
      case Rank.ACE:
        imgUrl += 'ace';
        break;
      default:
        break;
    }

    imgUrl += '.png';

    return imgUrl;
  }

  getAlt() {
    return this.card.rank + ' of ' + this.card.suit;
  }
}

// ♣ &clubs;
// ♦ &diams;
// ♥ &hearts;
// ♠ &spades;
