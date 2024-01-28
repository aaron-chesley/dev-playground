import { Injectable } from '@angular/core';
import { CardlyUser } from '@playground/cardly-util';
import { ApiService } from '@playground/shared/shared-data';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CardlyAuthenticationService {
  private user: CardlyUser | null = null;

  async getUser(): Promise<CardlyUser> {
    if (this.user === null) {
      const name = window.prompt('Enter your name');
      const displayName = name ?? 'Anonymous';

      const res = await firstValueFrom(this.api.post<{ user: CardlyUser }>('generate-token', { displayName }));

      sessionStorage.setItem('user', JSON.stringify(res.user));

      this.user = res.user;
    }

    return this.user;
  }

  constructor(private api: ApiService) {
    const user = sessionStorage.getItem('user');

    if (user) {
      this.user = JSON.parse(user);
    }
  }
}
