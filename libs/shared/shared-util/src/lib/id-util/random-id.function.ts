import { nanoid } from 'nanoid';

export const randomId = (length: number = 9): string => {
  return nanoid(length);
};
