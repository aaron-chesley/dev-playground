import { ScumGame } from './scum-game.class';

describe('ScumGame', () => {
  it('should create an instance', () => {
    const game = new ScumGame({ id: 'asdf', avatar: '', displayName: 'Test' });
    game.addUserToGame({ id: 'jkl;', avatar: '', displayName: 'Test' });
    game.addUserToGame({ id: 'qwert', avatar: '', displayName: 'Test' });
    game.addUserToGame({ id: 'uiop', avatar: '', displayName: 'Test' });
    game.startGame();
    debugger;
  });
});
