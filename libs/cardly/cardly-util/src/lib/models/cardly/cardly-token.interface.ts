import { CardlyUser } from './cardly-user.interface';

export interface CardlyToken {
  user: CardlyUser;
  iat: string;
  exp: string;
}
