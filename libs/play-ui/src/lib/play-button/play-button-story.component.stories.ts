import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PlayButtonModule } from './play-button';
import { PlayButtonStoryComponent } from './play-button-story.component';

export default {
  title: 'PlayButtonStoryComponent',
  component: PlayButtonStoryComponent,
  decorators: [
    moduleMetadata({
      imports: [PlayButtonModule],
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
