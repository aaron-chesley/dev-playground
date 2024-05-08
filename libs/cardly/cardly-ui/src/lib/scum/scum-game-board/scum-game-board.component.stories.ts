import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ScumGameBoardComponent } from './scum-game-board.component';

export default {
  title: 'ScumGameBoardComponent',
  component: ScumGameBoardComponent,
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
    }),
  ],
} as Meta<ScumGameBoardComponent>;

const Template: Story<ScumGameBoardComponent> = (args: ScumGameBoardComponent) => ({
  props: args,
  template: `
  <div style="height:100vh">
    <scum-game-board [game]="game" [user]="user" [stagedCards]="stagedCards"></scum-game-board>
  </div>`,
});

export const PreGameWaitingForPlayers = Template.bind({});
PreGameWaitingForPlayers.args = {};

export const PreGameReadyToStart = Template.bind({});
PreGameReadyToStart.args = {};

export const InProgressRound1CleanBoard = Template.bind({});
InProgressRound1CleanBoard.args = {};

export const InProgressStagedCards = Template.bind({});
InProgressStagedCards.args = {};
