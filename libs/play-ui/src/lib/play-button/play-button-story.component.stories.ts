import { APP_INITIALIZER } from '@angular/core';
import {
  PlayIconModule,
  PlayIconRegistryService,
  home,
} from '@dev-playground/play-icon';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PlayButtonModule } from './play-button';
import { PlayButtonStoryComponent } from './play-button-story.component';

const initIconsFactory = (iconService: PlayIconRegistryService) => {
  return () => iconService.registerIcons([home]);
};

export default {
  title: 'PlayButtonStoryComponent',
  component: PlayButtonStoryComponent,
  decorators: [
    moduleMetadata({
      imports: [PlayButtonModule, PlayIconModule],
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: initIconsFactory,
          multi: true,
          deps: [PlayIconRegistryService],
        },
      ],
    }),
  ],
} as Meta<PlayButtonStoryComponent>;

const Template: Story<PlayButtonStoryComponent> = (
  args: PlayButtonStoryComponent
) => ({
  props: args,
  template: `<div style="display: flex; flex-direction: column">
    <div class="button-item">
      <label>Flat: </label>
      <button playButton appearance="flat" color="primary">Primary</button>
      <button playButton appearance="flat" color="accent">Accent</button>
      <button playButton appearance="flat" color="primary" disabled>Disabled</button>
    </div>
    <div class="button-item">
      <label>Outline: </label>
      <button playButton appearance="outline" color="primary">Primary</button>
      <button playButton appearance="outline" color="accent">Accent</button>
      <button playButton appearance="outline" color="primary" disabled>Disabled</button>
    </div>
    <div class="button-item">
      <label>FAB: </label>
      <button playButton appearance="fab" color="primary">
        <play-icon name="home" color="white"></play-icon>
      </button>
      <button playButton appearance="fab" color="accent">
        <play-icon name="home" color="white"></play-icon></button>
      <button playButton appearance="fab" color="primary" disabled>
        <play-icon name="home" color="white"></play-icon>
      </button>
    </div>
    <div class="button-item">
      <label>Icon: </label>
      <button playButton appearance="icon" color="primary">
        <play-icon name="home"></play-icon>
      </button>
      <button playButton appearance="icon" color="accent">
        <play-icon name="home"></play-icon></button>
      <button playButton appearance="icon" color="primary" disabled>
        <play-icon name="home"></play-icon>
      </button>
    </div>
  </div>`,
  styles: [
    `
    .button-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 15px;
    }

    .button-item label {
      width: 100px;
      margin-right: 20px;
    }

    .button-item button {
      margin-right: 20px;
    }
  `,
  ],
});

export const Primary = Template.bind({});
Primary.args = {};
