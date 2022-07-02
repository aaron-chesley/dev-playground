import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PlayRadioModule } from './play-radio.module';
import { PlayRadioComponent } from './play-radio.component';

export default {
  title: 'PlayRadioComponent',
  component: PlayRadioComponent,
  decorators: [
    moduleMetadata({
      imports: [PlayRadioModule],
    }),
  ],
} as Meta<PlayRadioComponent>;

const Template: Story<PlayRadioComponent> = (args: PlayRadioComponent) => ({
  props: args,
});

export const Showcase = Template.bind({});
Showcase.args = {};
