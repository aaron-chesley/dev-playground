import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PlayRadioShowcaseModule } from './play-radio-showcase.module';
import { PlayRadioShowcaseComponent } from './play-radio-showcase.component';

export default {
  title: 'PlayRadioShowcaseComponent',
  component: PlayRadioShowcaseComponent,
  decorators: [
    moduleMetadata({
      imports: [PlayRadioShowcaseModule],
    }),
  ],
} as Meta<PlayRadioShowcaseComponent>;

const Template: Story<PlayRadioShowcaseComponent> = (
  args: PlayRadioShowcaseComponent
) => ({
  props: args,
});

export const Showcase = Template.bind({});
Showcase.args = {};
