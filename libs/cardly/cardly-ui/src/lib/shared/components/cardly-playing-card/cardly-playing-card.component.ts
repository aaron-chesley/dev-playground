import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '@playground/cardly-util';

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
    return `/cards/${this.card.suit}/${this.card.rank}.png`;
  }

  getAlt() {
    return `${this.card.rank} of ${this.card.suit}`;
  }
}

// ♣ &clubs;
// ♦ &diams;
// ♥ &hearts;
// ♠ &spades;
