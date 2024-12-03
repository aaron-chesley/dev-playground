import { moduleMetadata, StoryFn, Meta } from '@storybook/angular';
import { PlayButtonShowcaseComponent } from './play-button-showcase.component';

export default {
  title: 'PlayButtonShowcase',
  component: PlayButtonShowcaseComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<PlayButtonShowcaseComponent>;

const Template: StoryFn<PlayButtonShowcaseComponent> = (args: PlayButtonShowcaseComponent) => ({
  props: args,
});

export const Showcase = Template.bind({});
Showcase.args = {};
