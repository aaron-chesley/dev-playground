import { moduleMetadata, StoryFn, Meta } from '@storybook/angular';
import { PlayToggleComponent } from './play-toggle.component';

export default {
  title: 'PlayToggleShowcase',
  component: PlayToggleComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
  argTypes: {
    labelPosition: {
      options: ['before', 'after'],
      control: { type: 'inline-radio' },
    },
  },
} as Meta<PlayToggleComponent>;

const Template: StoryFn<PlayToggleComponent> = (args: PlayToggleComponent) => ({
  props: args,
  template: `
    <play-toggle [checked]="checked" [labelPosition]="labelPosition" [disabled]="disabled">Toggle Me</play-toggle>
  `,
});

export const Showcase = Template.bind({});
Showcase.args = {
  labelPosition: 'after',
  checked: true,
  disabled: false,
};
