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

    switch (this.card.rank.displayValue) {
      case '2':
        imgUrl += '2';
        break;
      case '3':
        imgUrl += '3';
        break;
      case '4':
        imgUrl += '4';
        break;
      case '5':
        imgUrl += '5';
        break;
      case '6':
        imgUrl += '6';
        break;
      case '7':
        imgUrl += '7';
        break;
      case '8':
        imgUrl += '8';
        break;
      case '9':
        imgUrl += '9';
        break;
      case '10':
        imgUrl += '10';
        break;
      case 'J':
        imgUrl += 'jack';
        break;
      case 'Q':
        imgUrl += 'queen';
        break;
      case 'K':
        imgUrl += 'king';
        break;
      case 'A':
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
