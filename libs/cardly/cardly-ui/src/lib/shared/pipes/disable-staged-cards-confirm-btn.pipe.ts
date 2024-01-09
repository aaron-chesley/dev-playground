import { Pipe, PipeTransform } from '@angular/core';
import { Card } from '@playground/cardly-util';

@Pipe({
  name: 'disableStagedCardsConfirmBtn',
  pure: true,
  standalone: true,
})
export class DisableStagedCardsConfirmBtnPipe implements PipeTransform {
  transform(stagedCards: Card[], currentCardStackSize: number): boolean {
    const disableConfirmBtn = true;
    const doNotDisableConfirmBtn = false;

    const isFirstTurnOfRound = currentCardStackSize === 0;

    if (
      (isFirstTurnOfRound && stagedCards.length > 0) ||
      (!isFirstTurnOfRound && stagedCards.length === currentCardStackSize)
    ) {
      return doNotDisableConfirmBtn;
    }

    return disableConfirmBtn;
  }
}
