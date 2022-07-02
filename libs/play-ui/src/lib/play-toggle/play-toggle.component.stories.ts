import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PlayToggleModule } from './play-toggle.module';
import { PlayToggleComponent } from './play-toggle.component';

export default {
  title: 'PlayToggleComponent',
  component: PlayToggleComponent,
  decorators: [
    moduleMetadata({
      imports: [PlayToggleModule],
    }),
  ],
  argTypes: {
    labelPosition: {
      options: ['before', 'after'],
      control: { type: 'inline-radio' },
    },
  },
} as Meta<PlayToggleComponent>;

const Template: Story<PlayToggleComponent> = (args: PlayToggleComponent) => ({
  props: args,
  template: `
    <play-toggle [checked]="checked" [labelPosition]="labelPosition">Toggle Me</play-toggle>
  `,
});

export const Showcase = Template.bind({});
Showcase.args = {
  labelPosition: 'after',
  checked: true,
};
