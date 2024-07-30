import { customAlphabet } from 'nanoid';

export const randomGameId = (length: number = 10): string => {
  return customAlphabet('1234567890', length)();
};
