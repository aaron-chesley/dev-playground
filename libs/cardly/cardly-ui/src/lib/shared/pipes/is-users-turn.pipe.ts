import { Pipe, PipeTransform } from '@angular/core';
import { CardlyUser } from '@playground/cardly-util';

@Pipe({
  name: 'isUsersTurn',
  pure: true,
  standalone: true,
})
export class IsUsersTurnPipe implements PipeTransform {
  transform(user: CardlyUser, userTurnId: string): boolean {
    return user.id === userTurnId;
  }
}
