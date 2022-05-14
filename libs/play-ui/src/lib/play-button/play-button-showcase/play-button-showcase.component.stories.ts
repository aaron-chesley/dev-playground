import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PlayButtonShowcaseModule } from './play-button-showcase.module';
import { PlayButtonShowcaseComponent } from './play-button-showcase.component';

export default {
  title: 'PlayButtonShowcaseComponent',
  component: PlayButtonShowcaseComponent,
  decorators: [
    moduleMetadata({
      imports: [PlayButtonShowcaseModule],
    }),
  ],
} as Meta<PlayButtonShowcaseComponent>;

const Template: Story<PlayButtonShowcaseComponent> = (
  args: PlayButtonShowcaseComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
