import { Injectable } from '@angular/core';
import { CardlyUser } from '@playground/cardly-util';

@Injectable({ providedIn: 'root' })
export class CardlyAuthenticationService {
  private user: CardlyUser | null = null;

  getUser(): CardlyUser {
    if (this.user === null) {
      const name = window.prompt('Enter your name');
      const user = {
        id: crypto.randomUUID(),
        displayName: name ?? 'Anonymous',
        avatar: 'https://i.pravatar.cc/300',
      };

      sessionStorage.setItem('user', JSON.stringify(user));

      this.user = user;
    }

    return this.user;
  }

  constructor() {
    const user = sessionStorage.getItem('user');

    if (user) {
      this.user = JSON.parse(user);
    }
  }
}
