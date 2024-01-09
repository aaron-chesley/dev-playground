import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScumGameState } from '@playground/cardly-util';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ScumGameBoardComponent } from './scum-game-board.component';
import {
  user,
  gameWithoutGameState,
  players,
} from './scum-game-board.component.stories.utils';

export default {
  title: 'ScumGameBoardComponent',
  component: ScumGameBoardComponent,
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
    }),
  ],
} as Meta<ScumGameBoardComponent>;

const Template: Story<ScumGameBoardComponent> = (
  args: ScumGameBoardComponent,
) => ({
  props: args,
  template: `
  <div style="height:100vh">
    <scum-game-board [game]="game" [user]="user" [stagedCards]="stagedCards"></scum-game-board>
  </div>`,
});

export const PreGameWaitingForPlayers = Template.bind({});
PreGameWaitingForPlayers.args = {
  user: { ...user },
  game: {
    ...gameWithoutGameState,
    state: ScumGameState.PREGAME,
    players: [...players.slice(0, 2)],
  },
  stagedCards: [],
};

export const PreGameReadyToStart = Template.bind({});
PreGameReadyToStart.args = {
  user: { ...user },
  game: {
    ...gameWithoutGameState,
    state: ScumGameState.PREGAME,
  },
  stagedCards: [],
};

export const InProgressRound1CleanBoard = Template.bind({});
InProgressRound1CleanBoard.args = {
  user: { ...user },
  game: {
    ...gameWithoutGameState,
    currentPlayerId: '1',
    state: ScumGameState.IN_PROGRESS,
  },
  stagedCards: [],
};

export const InProgressStagedCards = Template.bind({});
InProgressStagedCards.args = {
  user: { ...user },
  game: {
    ...gameWithoutGameState,
    currentPlayerId: '1',
    state: ScumGameState.IN_PROGRESS,
  },
  stagedCards: [players[0].cards[0], players[0].cards[1]],
};
