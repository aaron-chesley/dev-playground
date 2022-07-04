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
  template: `
  <play-radio-group>
    <play-radio>Radio 1</play-radio>
    <play-radio>Radio 2</play-radio>
    <play-radio>Radio 3</play-radio>
  </play-radio-group>
  `,
});

export const Showcase = Template.bind({});
Showcase.args = {};
