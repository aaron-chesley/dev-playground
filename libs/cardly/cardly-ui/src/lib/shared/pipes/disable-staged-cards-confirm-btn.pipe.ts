import { Pipe, PipeTransform } from '@angular/core';
import { Card } from '@playground/cardly-util';

@Pipe({
  name: 'disableStagedCardsConfirmBtn',
  pure: true,
  standalone: true,
})
export class DisableStagedCardsConfirmBtnPipe implements PipeTransform {
  transform(stagedCards: Card[], currentCardStackSize: number): boolean {
    const noCardsStaged = stagedCards.length === 0;
    const stagedCardsEqualCurrentCardStackSize =
      stagedCards.length === currentCardStackSize;
    if (noCardsStaged || !stagedCardsEqualCurrentCardStackSize) {
      return true;
    }

    return false;
  }
}
