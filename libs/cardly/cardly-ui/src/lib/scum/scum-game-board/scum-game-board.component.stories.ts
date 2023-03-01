import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScumGameState, Suit } from '@playground/cardly-util';
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

const Template: Story<ScumGameBoardComponent> = (
  args: ScumGameBoardComponent
) => ({
  props: args,
  template: `
  <div style="height:100vh">
    <scum-game-board [game]="game" [user]="user" [stagedCards]="stagedCards"></scum-game-board>
  </div>`,
});

export const Primary = Template.bind({});
Primary.args = {
  game: {
    id: '8sd76f8ds6f',
    gameOwnerId: '1',
    subRoundWinnerId: '1',
    roundWinnerId: '1',
    presidentTraded: false,
    vicePresidentTraded: false,
    gameWinnerId: '1',
    pointsToWin: 8,
    state: ScumGameState.IN_PROGRESS,
    players: [
      {
        user: {
          id: '1',
          displayName: 'Aaron',
          avatar: 'https://i.pravatar.cc/300',
        },
        rank: 0,
        cards: [
          {
            show: true,
            suit: Suit.DIAMONDS,
            rank: 6,
          },
          {
            show: true,
            suit: Suit.CLUBS,
            rank: 6,
          },
          {
            show: true,
            suit: Suit.HEARTS,
            rank: 6,
          },
        ],
        score: 0,
        pass: false,
        playedAtleastOneCardInSubRound: false,
      },
      {
        user: {
          id: '2',
          displayName: 'Bethany',
          avatar: 'https://i.pravatar.cc/300',
        },
        rank: 0,
        cards: [
          {
            show: true,
            suit: Suit.DIAMONDS,
            rank: 6,
          },
          {
            show: true,
            suit: Suit.CLUBS,
            rank: 6,
          },
          {
            show: true,
            suit: Suit.HEARTS,
            rank: 6,
          },
        ],
        score: 0,
        pass: false,
        playedAtleastOneCardInSubRound: false,
      },
      {
        user: {
          id: '3',
          displayName: 'Georgia',
          avatar: 'https://i.pravatar.cc/300',
        },
        rank: 0,
        cards: [
          {
            show: true,
            suit: Suit.DIAMONDS,
            rank: 6,
          },
          {
            show: true,
            suit: Suit.CLUBS,
            rank: 6,
          },
          {
            show: true,
            suit: Suit.HEARTS,
            rank: 6,
          },
        ],
        score: 0,
        pass: false,
        playedAtleastOneCardInSubRound: false,
      },
      {
        user: {
          id: '4',
          displayName: 'Hazel',
          avatar: 'https://i.pravatar.cc/300',
        },
        rank: 0,
        cards: [
          {
            show: true,
            suit: Suit.DIAMONDS,
            rank: 6,
          },
          {
            show: true,
            suit: Suit.CLUBS,
            rank: 6,
          },
          {
            show: true,
            suit: Suit.HEARTS,
            rank: 6,
          },
        ],
        score: 0,
        pass: false,
        playedAtleastOneCardInSubRound: false,
      },
    ],
    playersFinishedOrder: [],
    discardPile: [
      {
        show: true,
        suit: Suit.DIAMONDS,
        rank: 8,
      },
      {
        show: true,
        suit: Suit.HEARTS,
        rank: 11,
      },
      {
        show: true,
        suit: Suit.SPADES,
        rank: 13,
      },
    ],
    lastPlayerToDiscardId: '1',
    currentPlayerId: '1',
    currentCardStackSize: 0,
  },

  user: {
    id: '1',
    displayName: 'Aaron',
    avatar: 'https://i.pravatar.cc/300',
  },

  stagedCards: [
    {
      show: true,
      suit: Suit.DIAMONDS,
      rank: 6,
    },
    {
      show: true,
      suit: Suit.CLUBS,
      rank: 6,
    },
    {
      show: true,
      suit: Suit.HEARTS,
      rank: 6,
    },
  ],
};
