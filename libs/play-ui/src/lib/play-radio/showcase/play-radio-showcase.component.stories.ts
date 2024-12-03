import { moduleMetadata, StoryFn, Meta } from '@storybook/angular';
import { PlayRadioShowcaseComponent } from './play-radio-showcase.component';

export default {
  title: 'PlayRadioShowcase',
  component: PlayRadioShowcaseComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<PlayRadioShowcaseComponent>;

const Template: StoryFn<PlayRadioShowcaseComponent> = (args: PlayRadioShowcaseComponent) => ({
  props: args,
});

export const Showcase = Template.bind({});
Showcase.args = {};
