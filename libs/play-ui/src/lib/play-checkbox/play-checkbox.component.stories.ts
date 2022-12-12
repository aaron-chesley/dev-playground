import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PlayCheckboxComponent } from './play-checkbox.component';

export default {
  title: 'PlayCheckboxShowcase',
  component: PlayCheckboxComponent,
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
} as Meta<PlayCheckboxComponent>;

const Template: Story<PlayCheckboxComponent> = (
  args: PlayCheckboxComponent
) => ({
  props: args,
  template: `
    <div style="padding: 10px;">
      <play-checkbox [checked]="checked" [labelPosition]="labelPosition" [disabled]="disabled">I agree to the terms and conditions</play-checkbox>
    </div>
  `,
});

export const Showcase = Template.bind({});
Showcase.args = {
  labelPosition: 'after',
  checked: true,
  disabled: false,
};
