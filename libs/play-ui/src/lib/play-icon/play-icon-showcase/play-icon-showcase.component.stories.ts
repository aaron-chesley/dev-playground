import { CommonModule } from '@angular/common';
import { moduleMetadata, StoryFn, Meta } from '@storybook/angular';
import { PlayIconShowcaseComponent } from './play-icon-showcase.component';

export default {
  title: 'PlayIconShowcase',
  component: PlayIconShowcaseComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
  argTypes: {
    color: {
      control: { type: 'color' },
    },
  },
} as Meta<PlayIconShowcaseComponent>;

const Template: StoryFn<PlayIconShowcaseComponent> = (args: PlayIconShowcaseComponent) => ({
  component: PlayIconShowcaseComponent,
  props: args,
});

export const Showcase = Template.bind({});
Showcase.args = {
  size: 40,
  color: '#ed4646',
};
