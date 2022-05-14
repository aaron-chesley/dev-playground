import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PlayCardComponent } from './play-card.component';

export default {
  title: 'PlayCardComponent',
  component: PlayCardComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<PlayCardComponent>;

const Template: Story<PlayCardComponent> = (args: PlayCardComponent) => ({
  component: PlayCardComponent,
  props: args,
  template: `<play-card>My Cool Card</play-card>`,
});

export const Primary = Template.bind({});
Primary.args = {};
