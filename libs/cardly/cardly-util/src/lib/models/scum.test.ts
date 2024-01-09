import { CardlyUser } from './cardly';
import { ScumGamee } from './scum';

describe('ScumGame', () => {
  test('should play a turn and check for win condition', () => {
    const players = ['Player1', 'Player2', 'Player3', 'Player4'];
    const game = new ScumGamee(users);
  });
});

const users: CardlyUser[] = [
  {
    id: '1',
    displayName: 'Aaron',
    avatar: 'https://i.pravatar.cc/300',
  },
  {
    id: '2',
    displayName: 'Bethany',
    avatar: 'https://i.pravatar.cc/300',
  },
  {
    id: '3',
    displayName: 'Georgia',
    avatar: 'https://i.pravatar.cc/300',
  },
  {
    id: '4',
    displayName: 'Hazel',
    avatar: 'https://i.pravatar.cc/300',
  },
  {
    id: '5',
    displayName: 'Donovan',
    avatar: 'https://i.pravatar.cc/300',
  },
];
