import { Pipe, PipeTransform } from '@angular/core';
import { Card, ScumPlayer, ScumRank } from '@playground/cardly-util';

@Pipe({
  name: 'disableCardSwapConfirmBtn',
  pure: true,
  standalone: true,
})
export class DisableCardSwapConfirmBtnPipe implements PipeTransform {
  transform(player: ScumPlayer, stagedCards: Card[]): boolean {
    if (player.rank === ScumRank.PRESIDENT) {
      return stagedCards.length !== 2;
    } else if (player.rank === ScumRank.VICE_PRESIDENT) {
      return stagedCards.length !== 1;
    } else {
      return true;
    }
  }
}
