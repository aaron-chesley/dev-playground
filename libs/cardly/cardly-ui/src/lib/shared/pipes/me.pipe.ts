import { Pipe, PipeTransform } from '@angular/core';
import { CardlyUser, ScumPlayer } from '@playground/cardly-util';

@Pipe({
  name: 'me',
  pure: true,
  standalone: true,
})
export class MePipe implements PipeTransform {
  transform(user: CardlyUser, players: ScumPlayer[]): ScumPlayer {
    return players.find((p) => p.user.id === user.id);
  }
}
