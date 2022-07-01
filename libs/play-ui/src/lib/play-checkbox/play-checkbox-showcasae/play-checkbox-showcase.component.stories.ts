import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PlayCheckboxShowcaseComponent } from './play-checkbox-showcase.component';
import { PlayCheckboxShowcaseModule } from './play-checkbox-showcase.module';

export default {
  title: 'PlayCheckboxShowcaseComponent',
  component: PlayCheckboxShowcaseComponent,
  decorators: [
    moduleMetadata({
      imports: [PlayCheckboxShowcaseModule],
    }),
  ],
  argTypes: {
    labelPosition: {
      options: ['before', 'after'],
      control: { type: 'inline-radio' },
    },
  },
} as Meta<PlayCheckboxShowcaseComponent>;

const Template: Story<PlayCheckboxShowcaseComponent> = (
  args: PlayCheckboxShowcaseComponent
) => ({
  props: args,
});

export const Showcase = Template.bind({});
Showcase.args = {
  label: 'I agree to the terms and conditions',
  labelPosition: 'after',
  checked: true,
  disabled: false,
};
